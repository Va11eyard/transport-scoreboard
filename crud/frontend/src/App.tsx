// App.tsx
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
                    // For public pages, you may still use the Layout for unified padding and background
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
                    <div className="flex flex-col lg:flex-row h-screen overflow-hidden">
                        <Sidebar />
                        <div className="flex-1 flex flex-col overflow-hidden">
                            <Header setIsAuthenticated={setIsAuthenticated} />
                            <main className="flex-1 overflow-auto">
                                {/* Wrap authenticated pages with the Layout for unified styling */}
                                <Layout>
                                    <Routes>
                                        <Route path="/" element={<DashboardPage />} />
                                        <Route path="/users" element={<UsersPage />} />
                                        <Route path="/videos" element={<VideosPage />} />
                                        <Route path="/companies/*" element={<></>} />
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
