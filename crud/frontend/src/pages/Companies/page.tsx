import React, { useEffect, useState } from "react";
import CompanyList from "../../components/Companies/CompanyList";
import { Company, getCompanies } from "../../services/company";
import Layout from "../../components/Layout/Layout";

const CompaniesPage: React.FC = () => {
    const [companies, setCompanies] = useState<Company[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const data = await getCompanies();
                setCompanies(data);
            } catch (err: any) {
                setError(err.message);
            }
        };
        fetchCompanies();
    }, []);

    return (
        <Layout>
            {error && <p className="text-red-500">{error}</p>}
            <CompanyList companies={companies} />
        </Layout>
    );
};

export default CompaniesPage;
