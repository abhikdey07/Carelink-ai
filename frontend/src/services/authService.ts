import API from "../api/axios";

export interface RegisterData {
  full_name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  role: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export const registerUser = async (data: RegisterData) => {
  const response = await API.post("/auth/register", data);
  return response.data;
};

export const loginUser = async (data: LoginData) => {
  const response = await API.post("/auth/login", data);
  return response.data;
};