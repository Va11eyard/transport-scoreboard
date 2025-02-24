import api from "./api";

interface User {
  id: number;
  email: string;
  is_active: boolean;
  role: string;
}

interface PageResponse<T> {
  content: T[];
  pageable: any;
  totalElements: number;
  totalPages: number;
}

export const getUsers = async (): Promise<User[]> => {
  const response = await api.get<PageResponse<User>>("/api/users"); // Updated path
  return response.data.content;
};

export const createUser = async (userData: any) => {
  const response = await api.post("/api/users", userData); // Updated path
  return response.data;
};

export const updateUser = async (userId: number, userData: any) => {
  const response = await api.put(`/api/users/${userId}`, userData); // Updated path
  return response.data;
};

export const deleteUser = async (userId: number) => {
  const response = await api.delete(`/api/users/${userId}`); // Updated path
  return response.data;
};