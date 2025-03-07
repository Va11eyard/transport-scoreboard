// DashboardPage.tsx
import React from "react";
import { Link } from "react-router-dom";

const DashboardPage: React.FC = () => {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6 text-center">Welcome to Transport Scoreboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                {/* Add link to Companies list */}
                <Link
                    to="/companies"
                    className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-4 px-6 rounded-lg text-center transition"
                >
                    Manage Companies
                </Link>
            </div>
        </div>
    );
};

export default DashboardPage;
