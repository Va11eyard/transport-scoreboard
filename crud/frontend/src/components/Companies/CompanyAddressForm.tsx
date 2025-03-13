// /src/components/Companies/CompanyAddressForm.tsx
import React, { useState } from "react";

interface AddressFormData {
    companyId: number;
    address: string;
    latitude: number;
    longitude: number;
    isActive: boolean;
}

interface CompanyAddressFormProps {
    initialData: AddressFormData;
    onSubmit: (data: AddressFormData) => void;
    onCancel?: () => void;
}

const CompanyAddressForm: React.FC<CompanyAddressFormProps> = ({ initialData, onSubmit, onCancel }) => {
    const [formData, setFormData] = useState<AddressFormData>(initialData);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({
            ...formData,
            latitude: Number(formData.latitude),
            longitude: Number(formData.longitude),
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded bg-white max-w-md mx-auto">
            <div>
                <label className="block text-sm font-medium">Address</label>
                <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full border rounded p-2"
                />
            </div>
            <div className="flex space-x-4">
                <div className="flex-1">
                    <label className="block text-sm font-medium">Latitude</label>
                    <input
                        type="number"
                        name="latitude"
                        value={formData.latitude}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full border rounded p-2"
                    />
                </div>
                <div className="flex-1">
                    <label className="block text-sm font-medium">Longitude</label>
                    <input
                        type="number"
                        name="longitude"
                        value={formData.longitude}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full border rounded p-2"
                    />
                </div>
            </div>
            <div>
                <label className="inline-flex items-center">
                    <input
                        type="checkbox"
                        name="isActive"
                        checked={formData.isActive}
                        onChange={handleChange}
                        className="mr-2"
                    />
                    Active
                </label>
            </div>
            <div className="flex space-x-2">
                <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition">
                    Save Address
                </button>
                {onCancel && (
                    <button type="button" onClick={onCancel} className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400 transition">
                        Cancel
                    </button>
                )}
            </div>
        </form>
    );
};

export default CompanyAddressForm;
