"use client";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import UsersPage from "./pages/UsersPage";
import VideosPage from "./pages/VideosPage";
import DashboardPage from "./pages/DashboardPage";
import Header from "./components/Layout/Header";
import Sidebar from "./components/Layout/Sidebar";
import ResetPasswordRequest from "./components/Auth/ResetPasswordRequest";
import ResetPassword from "./components/Auth/ResetPassword";
import Layout from "./components/Layout/Layout";
// New imports for Companies
import CompaniesPage from "./pages/Companies/page";
import CompanyDetailPage from "./pages/Companies/[id]/page";

const App: React.FC = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsAuthenticated(!!token);
    }, []);

    return (
        <Router>
            <div className="min-h-screen bg-gray-50">
                {!isAuthenticated ? (
                    <Routes>
                        <Route
                            path="/login"
                            element={
                                <Layout>
                                    <LoginPage setIsAuthenticated={setIsAuthenticated} />
                                </Layout>
                            }
                        />
                        <Route
                            path="/register"
                            element={
                                <Layout>
                                    <RegisterPage />
                                </Layout>
                            }
                        />
                        <Route
                            path="/reset-password-request"
                            element={
                                <Layout>
                                    <ResetPasswordRequest />
                                </Layout>
                            }
                        />
                        <Route
                            path="/reset-password"
                            element={
                                <Layout>
                                    <ResetPassword />
                                </Layout>
                            }
                        />
                        <Route path="*" element={<Navigate to="/login" replace />} />
                    </Routes>
                ) : (
                    <div className="flex h-screen overflow-hidden">
                        <Sidebar />
                        <div className="flex-1 ml-64 flex flex-col overflow-hidden">
                            <Header setIsAuthenticated={setIsAuthenticated} />
                            <main className="flex-1 overflow-auto">
                                <Layout>
                                    <Routes>
                                        <Route path="/" element={<DashboardPage />} />
                                        <Route path="/users" element={<UsersPage />} />
                                        <Route path="/videos" element={<VideosPage />} />

                                        {/* New routes for Companies */}
                                        <Route path="/companies" element={<CompaniesPage />} />
                                        <Route path="/companies/:id" element={<CompanyDetailPage />} />

                                        <Route path="*" element={<Navigate to="/" replace />} />
                                    </Routes>
                                </Layout>
                            </main>
                        </div>
                    </div>
                )}
            </div>
        </Router>
    );
};

export default App;
