// /src/pages/LoginPage.tsx
import React from "react";
import Login from "../components/Auth/Login";
import Layout from "../components/Layout/Layout";

interface LoginPageProps {
    setIsAuthenticated: (isAuthenticated: boolean) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ setIsAuthenticated }) => {
    return (
        <Layout>
            <div className="max-w-md mx-auto">
                <Login setIsAuthenticated={setIsAuthenticated} />
            </div>
        </Layout>
    );
};

export default LoginPage;
