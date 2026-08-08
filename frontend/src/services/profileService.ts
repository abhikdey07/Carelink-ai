import axios from "axios";

const API_URL = "http://127.0.0.1:8000";

export const getProfile = async (userId: number) => {
  const response = await axios.get(
    `${API_URL}/profile/${userId}`
  );

  return response.data;
};

export const updateProfile = async (
  userId: number,
  data: {
    full_name?: string;
    organization_name?: string;
    registration_number?: string;
    phone?: string;
    address?: string;
  }
) => {
  const response = await axios.put(
    `${API_URL}/profile/${userId}`,
    data
  );

  return response.data;
};