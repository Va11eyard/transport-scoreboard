import React, { useState } from "react";
import { resetPasswordRequest } from "../../services/auth";

const ResetPasswordRequest: React.FC = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setError("");
    try {
      const response = await resetPasswordRequest(email);
      setMessage(response.message);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-center text-3xl font-extrabold text-gray-900 mb-6">Reset Password</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <input
                id="email-address"
                name="email"
                type="email"
                required
                placeholder="Email address"
                className="block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            {error && <div className="text-red-500 text-sm">{error}</div>}
            {message && <div className="text-green-500 text-sm">{message}</div>}
            <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 rounded-md text-white bg-primary hover:bg-primary-hover transition"
            >
              Send Reset Password Email
            </button>
          </form>
        </div>
      </div>
  );
};

export default ResetPasswordRequest;
