// /src/components/Companies/CompanyList.tsx
import React from "react";
import { Link } from "react-router-dom";
import { Company } from "../../services/company";

interface CompanyListProps {
    companies: Company[];
}

const CompanyList: React.FC<CompanyListProps> = ({ companies }) => {
    return (
        <ul className="space-y-4">
            {companies.map((company) => (
                <li key={company.id} className="border p-4 rounded hover:shadow-md">
                    <Link to={`/companies/${company.id}`} className="text-xl font-semibold text-blue-600 hover:underline">
                        {company.name}
                    </Link>
                    <p className="mt-1 text-gray-600">{company.description}</p>
                </li>
            ))}
        </ul>
    );
};

export default CompanyList;
