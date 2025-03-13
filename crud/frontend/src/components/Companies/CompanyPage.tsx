// /src/components/Companies/CompanyPage.tsx
import React, { useState } from "react";
import { Company, updateCompany, uploadCompanyVideo } from "../../services/company";
import { CompanyAddress, createAddress, updateAddress, uploadAddressVideo } from "../../services/companyAddress";
import CompanyForm from "./CompanyForm";
import CompanyAddressForm from "./CompanyAddressForm";

interface CompanyPageProps {
    company: Company;
    addresses: CompanyAddress[];
    onAddressesChange: (addr: CompanyAddress[]) => void;
}

const CompanyPage: React.FC<CompanyPageProps> = ({ company: initialCompany, addresses: initialAddresses, onAddressesChange }) => {
    const [company, setCompany] = useState<Company>(initialCompany);
    const [error, setError] = useState<string | null>(null);

    const [showCompanyForm, setShowCompanyForm] = useState(false);
    const [showAddressForm, setShowAddressForm] = useState(false);
    const [editingAddress, setEditingAddress] = useState<CompanyAddress | null>(null);

    // 1) Handle Company Update
    const handleUpdateCompany = async (data: {
        name: string;
        description: string;
        isActive: boolean;
    }) => {
        try {
            const updated = await updateCompany(company.id, data);
            setCompany(updated);
            setShowCompanyForm(false);
        } catch (err: any) {
            setError(err.message);
        }
    };

    // 2) Handle Company Video Upload
    const handleUploadCompanyVideo = async (file: File) => {
        try {
            await uploadCompanyVideo(company.id, file);
            // Optionally refetch or update local state
            setError(null);
        } catch (err: any) {
            setError(err.message);
        }
    };

    // 3) Create or Update Address
    const handleCreateAddress = async (data: {
        companyId: number;
        address: string;
        latitude: number;
        longitude: number;
        isActive: boolean;
    }) => {
        try {
            const newAddress = await createAddress(data);
            onAddressesChange([...initialAddresses, newAddress]);
            setShowAddressForm(false);
        } catch (err: any) {
            setError(err.message);
        }
    };

    const handleUpdateAddress = async (addrId: number, data: {
        address: string;
        latitude: number;
        longitude: number;
        isActive: boolean;
    }) => {
        try {
            const updated = await updateAddress(addrId, data);
            // Replace old address with updated one
            const newList = initialAddresses.map((a) => (a.id === updated.id ? updated : a));
            onAddressesChange(newList);
            setEditingAddress(null);
            setShowAddressForm(false);
        } catch (err: any) {
            setError(err.message);
        }
    };

    // 4) Upload Address Video
    const handleUploadAddressVideo = async (addrId: number, file: File) => {
        try {
            await uploadAddressVideo(addrId, file);
            // Optionally refetch addresses or update local state
            setError(null);
        } catch (err: any) {
            setError(err.message);
        }
    };

    return (
        <div className="container mx-auto p-4">
            {error && <p className="text-red-500">{error}</p>}
            <div className="mb-6">
                <h1 className="text-3xl font-bold">{company.name}</h1>
                <p className="mt-2 text-gray-700">{company.description}</p>
                <p className="mt-1">Status: {company.isActive ? "Active" : "Inactive"}</p>
            </div>

            {/* Company Video Upload */}
            <div className="mb-4">
                <h2 className="text-xl font-semibold">Company Video</h2>
                <input
                    type="file"
                    accept="video/*"
                    onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                            handleUploadCompanyVideo(e.target.files[0]);
                        }
                    }}
                />
            </div>

            {/* Edit Company Info */}
            <button
                onClick={() => setShowCompanyForm(!showCompanyForm)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition mb-6"
            >
                {showCompanyForm ? "Cancel" : "Edit Company Info"}
            </button>
            {showCompanyForm && (
                <CompanyForm
                    initialData={{
                        name: company.name,
                        description: company.description,
                        isActive: company.isActive,
                    }}
                    onSubmit={handleUpdateCompany}
                />
            )}

            {/* Addresses */}
            <div className="mt-8">
                <h2 className="text-2xl font-semibold mb-4">Addresses</h2>
                {initialAddresses.length > 0 ? (
                    initialAddresses.map((addr) => (
                        <div key={addr.id} className="border p-4 rounded mb-4">
                            <p className="font-bold">{addr.address}</p>
                            <p>Lat: {addr.latitude}, Lon: {addr.longitude}</p>
                            <p>Status: {addr.isActive ? "Active" : "Inactive"}</p>

                            {/* Address Video Upload */}
                            <input
                                type="file"
                                accept="video/*"
                                onChange={(e) => {
                                    if (e.target.files && e.target.files[0]) {
                                        handleUploadAddressVideo(addr.id, e.target.files[0]);
                                    }
                                }}
                            />

                            <button
                                onClick={() => {
                                    setEditingAddress(addr);
                                    setShowAddressForm(true);
                                }}
                                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition mt-2"
                            >
                                Edit Address
                            </button>
                        </div>
                    ))
                ) : (
                    <p>No addresses found.</p>
                )}

                {/* Create New Address */}
                <button
                    onClick={() => {
                        setEditingAddress(null);
                        setShowAddressForm(true);
                    }}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                >
                    Add New Address
                </button>

                {showAddressForm && (
                    <CompanyAddressForm
                        initialData={
                            editingAddress
                                ? {
                                    companyId: company.id,
                                    address: editingAddress.address,
                                    latitude: editingAddress.latitude,
                                    longitude: editingAddress.longitude,
                                    isActive: editingAddress.isActive,
                                }
                                : {
                                    companyId: company.id,
                                    address: "",
                                    latitude: 0,
                                    longitude: 0,
                                    isActive: true,
                                }
                        }
                        onSubmit={(data) => {
                            if (editingAddress) {
                                // Update existing address
                                handleUpdateAddress(editingAddress.id, {
                                    address: data.address,
                                    latitude: data.latitude,
                                    longitude: data.longitude,
                                    isActive: data.isActive,
                                });
                            } else {
                                // Create new address
                                handleCreateAddress(data);
                            }
                        }}
                        onCancel={() => {
                            setShowAddressForm(false);
                            setEditingAddress(null);
                        }}
                    />
                )}
            </div>
        </div>
    );
};

export default CompanyPage;
