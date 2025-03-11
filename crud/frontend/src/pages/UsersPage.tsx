// /src/pages/UsersPage.tsx
import React, { useState, useEffect } from "react";
import UserList from "../components/Users/UserList";
import UserCard from "../components/Users/UserCard";
import UserForm from "../components/Users/UserForm";
import { getUsers, createUser, updateUser, deleteUser } from "../services/users";
import Layout from "../components/Layout/Layout";

interface User {
  id: number;
  email: string;
  is_active: boolean;
  role: string;
}

const UsersPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const fetchedUsers = await getUsers();
      setUsers(fetchedUsers);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleSelectUser = (user: User) => {
    setSelectedUser(user);
  };

  const handleCreateUser = async (userData: Omit<User, "id"> & { password?: string }) => {
    try {
      await createUser(userData);
      fetchUsers();
      setIsFormOpen(false);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleUpdateUser = async (userId: number, userData: Partial<User>) => {
    try {
      await updateUser(userId, userData);
      fetchUsers();
      setIsFormOpen(false);
      setSelectedUser(null);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleDeleteUser = async (userId: number) => {
    try {
      await deleteUser(userId);
      fetchUsers();
      setSelectedUser(null);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
      <Layout>
        <h1 className="text-2xl font-bold mb-4">Users</h1>
        {error && <p className="text-red-500">{error}</p>}
        <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
            onClick={() => {
              setIsFormOpen(true);
              setSelectedUser(null);
            }}
        >
          Add New User
        </button>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="md:w-2/3">
            <UserList users={users} onSelectUser={handleSelectUser} />
          </div>
          <div className="md:w-1/3">
            {selectedUser && (
                <UserCard user={selectedUser} onEdit={() => setIsFormOpen(true)} onDelete={() => handleDeleteUser(selectedUser.id)} />
            )}
          </div>
        </div>
        {isFormOpen && (
            <UserForm
                user={selectedUser || undefined}
                onSubmit={(userData) => {
                  if (selectedUser) {
                    handleUpdateUser(selectedUser.id, userData);
                  } else {
                    handleCreateUser(userData as Omit<User, "id"> & { password?: string });
                  }
                }}
                onCancel={() => {
                  setIsFormOpen(false);
                  setSelectedUser(null);
                }}
            />
        )}
      </Layout>
  );
};

export default UsersPage;
