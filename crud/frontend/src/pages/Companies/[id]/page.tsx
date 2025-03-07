// /src/pages/Companies/[id]/page.tsx
import React from "react";
import CompanyPage from "../../../components/Companies/CompanyPage";
import Layout from "../../../components/Layout/Layout";

const CompanyDetailPage: React.FC = () => {
    return (
        <Layout>
            <CompanyPage />
        </Layout>
    );
};

export default CompanyDetailPage;
