// /src/pages/Companies/[id]/page.tsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../../../components/Layout/Layout";
import CompanyPage from "../../../components/Companies/CompanyPage";
import { Company, getCompany } from "../../../services/company";
import { getAddressesByCompany } from "../../../services/companyAddress";
import { CompanyAddress } from "../../../services/companyAddress";

const CompanyDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [company, setCompany] = useState<Company | null>(null);
    const [addresses, setAddresses] = useState<CompanyAddress[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) return;
        fetchData(parseInt(id, 10));
    }, [id]);

    const fetchData = async (companyId: number) => {
        try {
            // 1) Fetch company
            const comp = await getCompany(companyId);
            setCompany(comp);

            // 2) Fetch addresses by company
            const addr = await getAddressesByCompany(companyId);
            setAddresses(addr);
        } catch (err: any) {
            setError(err.message);
        }
    };

    if (error) {
        return (
            <Layout>
                <p className="text-red-500">{error}</p>
            </Layout>
        );
    }
    if (!company) {
        return (
            <Layout>
                <p>Loading company details...</p>
            </Layout>
        );
    }

    return (
        <Layout>
            <CompanyPage
                company={company}
                addresses={addresses}
                onAddressesChange={setAddresses} // allow child to update addresses
            />
        </Layout>
    );
};

export default CompanyDetailPage;
