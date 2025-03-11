import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Users, Video, Briefcase } from "lucide-react";

const Sidebar: React.FC = () => {
    const location = useLocation();

    const navItems = [
        { path: "/", icon: Home, label: "Dashboard" },
        { path: "/users", icon: Users, label: "Users" },
        { path: "/videos", icon: Video, label: "Videos" },
        { path: "/companies", icon: Briefcase, label: "Companies" },
    ];

    return (
        <div className="bg-gray-800 text-white w-64 space-y-6 py-7 px-2 fixed inset-y-0 left-0 z-10">
            <nav className="space-y-2">
                {navItems.map((item) => (
                    <Link key={item.path} to={item.path} className="flex items-center py-2 px-4 rounded hover:bg-gray-700 transition">
                        <item.icon className="mr-3" size={20} />
                        {item.label}
                    </Link>
                ))}
            </nav>
        </div>
    );
};

export default Sidebar;
