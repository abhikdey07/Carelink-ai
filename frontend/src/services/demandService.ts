import API from "../api/axios";

export const createDemand = async (
  ngoId: number,
  data: any
) => {
  const res = await API.post(
    `/demand/${ngoId}`,
    data
  );

  return res.data;
};

export const getDemands = async (
  ngoId: number
) => {
  const res = await API.get(
    `/demand/${ngoId}`
  );

  return res.data;
};

export const getDemand = async (
  demandId: number
) => {
  const res = await API.get(
    `/demand/single/${demandId}`
  );

  return res.data;
};

export const updateDemand = async (
  demandId: number,
  data: any
) => {
  const res = await API.put(
    `/demand/${demandId}`,
    data
  );

  return res.data;
};

export const deleteDemand = async (
  demandId: number
) => {
  const res = await API.delete(
    `/demand/${demandId}`
  );

  return res.data;
};