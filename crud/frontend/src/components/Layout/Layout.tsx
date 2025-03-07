// /src/components/Layout/Layout.tsx
import React from "react";

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-8">
                {children}
            </div>
        </div>
    );
};

export default Layout;
