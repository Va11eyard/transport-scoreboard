import React from 'react';

interface User {
    id: number;
    email: string;
    is_active: boolean;
    role: string;
}

interface UserCardProps {
    user: User;
    onEdit: () => void;
    onDelete: () => void;
}

const UserCard: React.FC<UserCardProps> = ({ user, onEdit, onDelete }) => {
    return (
        <div className="bg-white shadow rounded-lg p-4">
            <h3 className="text-lg font-medium text-gray-900">User Details</h3>
            <p className="mt-2 text-gray-700">
                <strong>Email:</strong> {user.email || "—"}
            </p>
            <p className="mt-1 text-gray-700">
                <strong>Status:</strong> {user.is_active ? 'Active' : 'Inactive'}
            </p>
            <p className="mt-1 text-gray-700">
                <strong>Role:</strong> {user.role || "—"}
            </p>
            <div className="mt-4 flex justify-end space-x-2">
                <button
                    onClick={onEdit}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                >
                    Edit
                </button>
                <button
                    onClick={onDelete}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default UserCard;
