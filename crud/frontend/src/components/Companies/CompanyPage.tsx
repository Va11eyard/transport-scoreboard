// /src/components/Companies/CompanyPage.tsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Company } from "../../services/company";
import CompanyForm from "./CompanyForm";
import CompanyAddressForm from "./CompanyAddressForm";

const CompanyPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [company, setCompany] = useState<Company | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [showCompanyForm, setShowCompanyForm] = useState(false);
    const [editingAddressId, setEditingAddressId] = useState<number | null>(null);
    const [showAddressForm, setShowAddressForm] = useState(false);

    useEffect(() => {
        if (id) {
            fetchCompany(Number(id));
        }
    }, [id]);

    const fetchCompany = async (companyId: number) => {
        try {
            const res = await fetch(`/api/companies/${companyId}`);
            if (!res.ok) throw new Error("Failed to fetch company details");
            const data = await res.json();
            setCompany(data);
        } catch (err: any) {
            setError(err.message);
        }
    };

    const handleCompanyUpdate = async (updatedData: {
        name: string;
        description: string;
        isActive: boolean;
        video?: { name: string; activeFromDate: string; activeToDate: string };
    }) => {
        if (!company) return;
        try {
            const res = await fetch(`/api/companies/${company.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedData),
            });
            if (!res.ok) throw new Error("Failed to update company");
            const data = await res.json();
            setCompany(data);
            setShowCompanyForm(false);
        } catch (err: any) {
            setError(err.message);
        }
    };

    const handleAddressUpdate = async (
        addressId: number,
        updatedData: {
            address: string;
            latitude: number;
            longitude: number;
            isActive: boolean;
            video?: { name: string; activeFromDate: string; activeToDate: string };
        }
    ) => {
        if (!company) return;
        try {
            const res = await fetch(`/api/companies/${company.id}/addresses/${addressId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedData),
            });
            if (!res.ok) throw new Error("Failed to update address");
            const data = await res.json();
            setCompany((prev) => {
                if (!prev) return prev;
                const updatedAddresses = prev.addresses.map((addr) =>
                    addr.id === addressId ? data : addr
                );
                return { ...prev, addresses: updatedAddresses };
            });
            setEditingAddressId(null);
            setShowAddressForm(false);
        } catch (err: any) {
            setError(err.message);
        }
    };

    const handleAddressCreate = async (updatedData: {
        address: string;
        latitude: number;
        longitude: number;
        isActive: boolean;
        video?: { name: string; activeFromDate: string; activeToDate: string };
    }) => {
        if (!company) return;
        try {
            const res = await fetch(`/api/companies/${company.id}/addresses`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedData),
            });
            if (!res.ok) throw new Error("Failed to create address");
            const data = await res.json();
            setCompany((prev) => {
                if (!prev) return prev;
                return { ...prev, addresses: [...prev.addresses, data] };
            });
            setShowAddressForm(false);
        } catch (err: any) {
            setError(err.message);
        }
    };

    return (
        <div className="container mx-auto p-4">
            {error && <p className="text-red-500">{error}</p>}
            {company ? (
                <>
                    <div className="mb-6">
                        <h1 className="text-3xl font-bold">{company.name}</h1>
                        <p className="mt-2 text-gray-700">{company.description}</p>
                        <p className="mt-1">Status: {company.isActive ? "Active" : "Inactive"}</p>
                    </div>
                    <div className="mb-6">
                        <h2 className="text-2xl font-semibold mb-2">Company Video</h2>
                        {company.videos.length > 0 ? (
                            <video controls className="w-full">
                                <source src={company.videos[0].url} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        ) : (
                            <p>No company video uploaded.</p>
                        )}
                    </div>
                    <button
                        onClick={() => setShowCompanyForm(!showCompanyForm)}
                        className="bg-blue-500 text-white px-4 py-2 rounded mb-6"
                    >
                        {showCompanyForm ? "Cancel" : "Edit Company Info"}
                    </button>
                    {showCompanyForm && (
                        <CompanyForm
                            initialData={{
                                name: company.name,
                                description: company.description,
                                isActive: company.isActive,
                                video: company.videos[0]
                                    ? {
                                        name: company.videos[0].name,
                                        activeFromDate: company.videos[0].activeFromDate,
                                        activeToDate: company.videos[0].activeToDate,
                                    }
                                    : undefined,
                            }}
                            onSubmit={handleCompanyUpdate}
                        />
                    )}

                    <div className="mt-8">
                        <h2 className="text-2xl font-semibold mb-4">Addresses</h2>
                        {company.addresses.map((addr) => (
                            <div key={addr.id} className="border p-4 rounded mb-4">
                                <p className="font-bold">{addr.address}</p>
                                <p>
                                    Lat: {addr.latitude}, Lon: {addr.longitude}
                                </p>
                                <p>Status: {addr.isActive ? "Active" : "Inactive"}</p>
                                <div className="mt-2">
                                    <h3 className="font-semibold">Address Video</h3>
                                    {addr.videos.length > 0 ? (
                                        <video controls className="w-full mt-2">
                                            <source src={addr.videos[0].url} type="video/mp4" />
                                            Your browser does not support the video tag.
                                        </video>
                                    ) : (
                                        <p>No video for this address.</p>
                                    )}
                                </div>
                                <button
                                    onClick={() => {
                                        setEditingAddressId(addr.id);
                                        setShowAddressForm(true);
                                    }}
                                    className="bg-green-500 text-white px-4 py-2 rounded mt-2"
                                >
                                    Edit Address
                                </button>
                                {editingAddressId === addr.id && showAddressForm && (
                                    <CompanyAddressForm
                                        initialData={{
                                            address: addr.address,
                                            latitude: addr.latitude,
                                            longitude: addr.longitude,
                                            isActive: addr.isActive,
                                            video: addr.videos[0]
                                                ? {
                                                    name: addr.videos[0].name,
                                                    activeFromDate: addr.videos[0].activeFromDate,
                                                    activeToDate: addr.videos[0].activeToDate,
                                                }
                                                : undefined,
                                        }}
                                        onSubmit={(data) => handleAddressUpdate(addr.id, data)}
                                    />
                                )}
                            </div>
                        ))}
                        <button
                            onClick={() => {
                                setEditingAddressId(null);
                                setShowAddressForm(true);
                            }}
                            className="bg-blue-500 text-white px-4 py-2 rounded"
                        >
                            Add New Address
                        </button>
                        {editingAddressId === null && showAddressForm && (
                            <CompanyAddressForm onSubmit={handleAddressCreate} />
                        )}
                    </div>
                </>
            ) : (
                <p>Loading company details...</p>
            )}
        </div>
    );
};

export default CompanyPage;
