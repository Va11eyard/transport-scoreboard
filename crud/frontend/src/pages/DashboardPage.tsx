// /src/pages/DashboardPage.tsx
import React from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout/Layout";

const DashboardPage: React.FC = () => {
    return (
        <Layout>
            <h1 className="text-3xl font-bold text-center mb-6">Welcome to Transport Scoreboard</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <Link
                    to="/users"
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-6 rounded-lg text-center transition"
                >
                    Manage Users
                </Link>
                <Link
                    to="/videos"
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-6 rounded-lg text-center transition"
                >
                    Manage Videos
                </Link>
                <Link
                    to="/companies"
                    className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-4 px-6 rounded-lg text-center transition"
                >
                    Manage Companies
                </Link>
            </div>
        </Layout>
    );
};

export default DashboardPage;
