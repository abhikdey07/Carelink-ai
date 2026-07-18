import API from "../api/axios";

export const getDonorNotifications = async (
  donorId: number
) => {

  const res = await API.get(
    `/donor-notifications/${donorId}`
  );

  return res.data;

};

export const markDonorNotificationRead = async (
  notificationId: number
) => {

  const res = await API.put(
    `/donor-notifications/read/${notificationId}`
  );

  return res.data;

};

export const markDonorNotificationReadByMatch = async (
  matchId: number
) => {

  const res = await API.put(
    `/donor-notifications/read-by-match/${matchId}`
  );

  return res.data;

};