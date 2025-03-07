// /src/components/Companies/CompanyAddressForm.tsx
import React, { useState } from "react";

interface CompanyAddressFormProps {
    initialData?: {
        address: string;
        latitude: number;
        longitude: number;
        isActive: boolean;
        video?: { name: string; activeFromDate: string; activeToDate: string };
    };
    onSubmit: (data: {
        address: string;
        latitude: number;
        longitude: number;
        isActive: boolean;
        video?: { name: string; activeFromDate: string; activeToDate: string };
    }) => Promise<void>;
}

const CompanyAddressForm: React.FC<CompanyAddressFormProps> = ({ initialData, onSubmit }) => {
    const [address, setAddress] = useState(initialData?.address || "");
    const [latitude, setLatitude] = useState(initialData?.latitude || 0);
    const [longitude, setLongitude] = useState(initialData?.longitude || 0);
    const [isActive, setIsActive] = useState(initialData?.isActive || false);
    const [videoName, setVideoName] = useState(initialData?.video?.name || "");
    const [activeFromDate, setActiveFromDate] = useState(initialData?.video?.activeFromDate || "");
    const [activeToDate, setActiveToDate] = useState(initialData?.video?.activeToDate || "");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const video =
            videoName && activeFromDate && activeToDate
                ? { name: videoName, activeFromDate, activeToDate }
                : undefined;
        await onSubmit({ address, latitude, longitude, isActive, video });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded bg-white">
            <div>
                <label className="block text-sm font-medium">Address</label>
                <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                    className="mt-1 block w-full border rounded p-2"
                />
            </div>
            <div className="flex space-x-4">
                <div className="flex-1">
                    <label className="block text-sm font-medium">Latitude</label>
                    <input
                        type="number"
                        value={latitude}
                        onChange={(e) => setLatitude(parseFloat(e.target.value))}
                        required
                        className="mt-1 block w-full border rounded p-2"
                    />
                </div>
                <div className="flex-1">
                    <label className="block text-sm font-medium">Longitude</label>
                    <input
                        type="number"
                        value={longitude}
                        onChange={(e) => setLongitude(parseFloat(e.target.value))}
                        required
                        className="mt-1 block w-full border rounded p-2"
                    />
                </div>
            </div>
            <div>
                <label className="inline-flex items-center">
                    <input
                        type="checkbox"
                        checked={isActive}
                        onChange={(e) => setIsActive(e.target.checked)}
                        className="mr-2"
                    />
                    Active
                </label>
            </div>
            <div>
                <h3 className="text-lg font-semibold">Address Video (Optional)</h3>
                <div>
                    <label className="block text-sm font-medium">Video Name</label>
                    <input
                        type="text"
                        value={videoName}
                        onChange={(e) => setVideoName(e.target.value)}
                        className="mt-1 block w-full border rounded p-2"
                    />
                </div>
                <div className="flex space-x-4">
                    <div className="flex-1">
                        <label className="block text-sm font-medium">Active From</label>
                        <input
                            type="date"
                            value={activeFromDate}
                            onChange={(e) => setActiveFromDate(e.target.value)}
                            className="mt-1 block w-full border rounded p-2"
                        />
                    </div>
                    <div className="flex-1">
                        <label className="block text-sm font-medium">Active To</label>
                        <input
                            type="date"
                            value={activeToDate}
                            onChange={(e) => setActiveToDate(e.target.value)}
                            className="mt-1 block w-full border rounded p-2"
                        />
                    </div>
                </div>
            </div>
            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
                Save Address
            </button>
        </form>
    );
};

export default CompanyAddressForm;
