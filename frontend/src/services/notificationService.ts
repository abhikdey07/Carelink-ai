import API from "../api/axios";

export const getNotifications = async (
  ngoId: number
) => {

  const response = await API.get(
    `/notifications/${ngoId}`
  );

  return response.data;

};

export const markAsRead = async (
  notificationId: number
) => {

  const response = await API.put(
    `/notifications/read/${notificationId}`
  );

  return response.data;

};