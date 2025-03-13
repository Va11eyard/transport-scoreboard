// /src/components/Companies/CompanyForm.tsx
import React, { useState } from "react";

interface CompanyFormProps {
    initialData: {
        name: string;
        description: string;
        isActive: boolean;
    };
    onSubmit: (data: {
        name: string;
        description: string;
        isActive: boolean;
    }) => void;
}

const CompanyForm: React.FC<CompanyFormProps> = ({ initialData, onSubmit }) => {
    const [name, setName] = useState(initialData.name);
    const [description, setDescription] = useState(initialData.description);
    const [isActive, setIsActive] = useState(initialData.isActive);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({ name, description, isActive });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded bg-white max-w-md mx-auto">
            <div>
                <label className="block text-sm font-medium">Name</label>
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
            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition">
                Save
            </button>
        </form>
    );
};

export default CompanyForm;
