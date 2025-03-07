// /src/components/Companies/CompanyList.tsx
import React from "react";
import { Link } from "react-router-dom";
import { Company } from "../../services/company";

interface CompanyListProps {
    companies: Company[];
}

const CompanyList: React.FC<CompanyListProps> = ({ companies }) => {
    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Companies</h1>
            <Link to="/companies/new" className="inline-block bg-blue-500 text-white px-4 py-2 rounded mb-4">
                Create New Company
            </Link>
            <ul>
                {companies.map((company) => (
                    <li key={company.id} className="border p-4 mb-2 rounded hover:shadow-md">
                        <Link to={`/companies/${company.id}`} className="text-xl font-semibold">
                            {company.name}
                        </Link>
                        <p className="mt-1 text-gray-600">{company.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CompanyList;
