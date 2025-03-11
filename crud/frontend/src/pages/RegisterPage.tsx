// /src/pages/RegisterPage.tsx
import React from "react";
import Register from "../components/Auth/Register";
import Layout from "../components/Layout/Layout";

const RegisterPage: React.FC = () => {
    return (
        <Layout>
            <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
                <Register />
            </div>
        </Layout>
    );
};

export default RegisterPage;
