// /src/pages/Companies/page.tsx
import React, { useEffect, useState } from "react";
import { Company, getCompanies, createCompany } from "../../services/company";
import Layout from "../../components/Layout/Layout";
import CompanyList from "../../components/Companies/CompanyList";

const CompaniesPage: React.FC = () => {
    const [companies, setCompanies] = useState<Company[]>([]);
    const [error, setError] = useState<string | null>(null);

    // For creating a new company
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [isActive, setIsActive] = useState(true);

    useEffect(() => {
        fetchAllCompanies();
    }, []);

    const fetchAllCompanies = async () => {
        try {
            const data = await getCompanies();
            setCompanies(data);
        } catch (err: any) {
            setError(err.message);
        }
    };

    const handleCreateCompany = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        try {
            await createCompany({ name, description, isActive });
            setName("");
            setDescription("");
            setIsActive(true);
            fetchAllCompanies(); // Refresh list
        } catch (err: any) {
            setError(err.message);
        }
    };

    return (
        <Layout>
            <h1 className="text-2xl font-bold mb-4">Companies</h1>
            {error && <p className="text-red-500">{error}</p>}

            {/* Create New Company Form */}
            <form onSubmit={handleCreateCompany} className="mb-6 space-y-4 max-w-md bg-white p-4 rounded shadow">
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
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                >
                    Create Company
                </button>
            </form>

            {/* List of Companies */}
            {companies.length === 0 ? (
                <p>No companies found.</p>
            ) : (
                <CompanyList companies={companies} />
            )}
        </Layout>
    );
};

export default CompaniesPage;
