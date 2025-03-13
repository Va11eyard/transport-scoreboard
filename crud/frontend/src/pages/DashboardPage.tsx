import React from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import { UsersIcon, VideoCameraIcon, BuildingOfficeIcon } from '@heroicons/react/24/outline';

const DashboardPage: React.FC = () => {
    return (
        <Layout>
            <h1 className="text-3xl font-bold text-center mb-6">Welcome to Transport Scoreboard</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <Link
                    to="/users"
                    className="bg-blue-50 text-blue-600 shadow-sm hover:bg-blue-100 hover:shadow-md rounded-lg p-6 flex flex-col items-center justify-center transition-all"
                >
                    <UsersIcon className="h-12 w-12 mb-3" />
                    <span className="text-xl font-medium">Manage Users</span>
                </Link>
                <Link
                    to="/videos"
                    className="bg-green-50 text-green-600 shadow-sm hover:bg-green-100 hover:shadow-md rounded-lg p-6 flex flex-col items-center justify-center transition-all"
                >
                    <VideoCameraIcon className="h-12 w-12 mb-3" />
                    <span className="text-xl font-medium">Manage Videos</span>
                </Link>
                <Link
                    to="/companies"
                    className="bg-purple-50 text-purple-600 shadow-sm hover:bg-purple-100 hover:shadow-md rounded-lg p-6 flex flex-col items-center justify-center transition-all"
                >
                    <BuildingOfficeIcon className="h-12 w-12 mb-3" />
                    <span className="text-xl font-medium">Manage Companies</span>
                </Link>
            </div>
        </Layout>
    );
};

export default DashboardPage;