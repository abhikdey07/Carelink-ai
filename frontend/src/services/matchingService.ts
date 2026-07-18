import API from "../api/axios";

export const getMatches = async (
  donationId: number
) => {

  const res = await API.get(
    `/transparency/${donationId}`
  );

  return res.data;

};

export const getMatchDetails = async (
  matchId: number
) => {

  const res = await API.get(
    `/transparency/match/${matchId}`
  );

  return res.data;

};

export const runMatching = async (
  donationId: number
) => {

  const res = await API.post(
    `/matching/${donationId}`
  );

  return res.data;

};

export const getNotifications = async (
  ngoId: number
) => {

  const res = await API.get(
    `/notifications/${ngoId}`
  );

  return res.data;

};

export const markNotificationRead = async (
  notificationId: number
) => {

  const res = await API.put(
    `/notifications/read/${notificationId}`
  );

  return res.data;

};
export const acceptMatch = async (
  matchId: number
) => {

  const res = await API.put(
    `/matching/accept/${matchId}`
  );

  return res.data;

};

export const rejectMatch = async (
  matchId: number
) => {

  const res = await API.put(
    `/matching/reject/${matchId}`
  );

  return res.data;

};