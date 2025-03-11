"use client";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../../services/auth";

interface LoginProps {
  setIsAuthenticated: (isAuthenticated: boolean) => void;
}

const Login: React.FC<LoginProps> = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await login(email, password);
      setIsAuthenticated(true);
      navigate("/");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="rounded-md shadow-sm">
              <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full px-3 py-2 border rounded-md placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
              />
              <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="mt-2 block w-full px-3 py-2 border rounded-md placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {error && <div className="text-red-500 text-sm">{error}</div>}
            <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 rounded-md text-white bg-blue-800 hover:bg-primary-hover transition"
            >
              Sign in
            </button>
          </form>
          <div className="text-sm text-center mt-4">
            <Link to="/register" className="font-medium text-primary hover:text-primary-hover">
              Don't have an account? Register
            </Link>
          </div>
        </div>
      </div>
  );
};

export default Login;
