// /src/components/Companies/CompanyForm.tsx
import React, { useState } from "react";

interface CompanyFormProps {
    initialData?: {
        name: string;
        description: string;
        isActive: boolean;
        video?: { name: string; activeFromDate: string; activeToDate: string };
    };
    onSubmit: (data: {
        name: string;
        description: string;
        isActive: boolean;
        video?: { name: string; activeFromDate: string; activeToDate: string };
    }) => Promise<void>;
}

const CompanyForm: React.FC<CompanyFormProps> = ({ initialData, onSubmit }) => {
    const [name, setName] = useState(initialData?.name || "");
    const [description, setDescription] = useState(initialData?.description || "");
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
        await onSubmit({ name, description, isActive, video });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded bg-white">
            <div>
                <label className="block text-sm font-medium">Company Name</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="mt-1 block w-full border rounded p-2"
                />
            </div>
            <div>
                <label className="block text-sm font-medium">Description</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    className="mt-1 block w-full border rounded p-2"
                ></textarea>
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
                <h3 className="text-lg font-semibold">Company Video (Optional)</h3>
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
                Save Company
            </button>
        </form>
    );
};

export default CompanyForm;
