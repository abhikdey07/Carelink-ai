import API from "../api/axios";

export interface NGORegisterData {
  organization_name: string;
  registration_number: string;
  email: string;
  phone: string;
  address: string;
  password: string;

  latitude: number;
  longitude: number;
}

export interface NGOLoginData {
  email: string;
  password: string;
}

export const registerNGO = async (
  data: NGORegisterData
) => {
  const response = await API.post(
    "/auth/ngo/register",
    data
  );

  return response.data;
};

export const loginNGO = async (
  data: NGOLoginData
) => {
  const response = await API.post(
    "/auth/ngo/login",
    data
  );

  return response.data;
};