import API from "../api/axios";

// ===============================
// DELIVERY LIST
// ===============================

export const getDeliveryList = async () => {
  const res = await API.get("/delivery/list");
  return res.data;
};

// ===============================
// DELIVERY DETAILS
// ===============================

export const getDeliveryStatus = async (
  matchId: number
) => {
  const res = await API.get(
    `/delivery/${matchId}`
  );

  return res.data;
};

// ===============================
// ASSIGN DELIVERY PARTNER
// ===============================

export const assignDeliveryPartner = async (
  matchId: number,
  volunteerName: string,
  volunteerPhone: string
) => {

  const res = await API.put(

    `/delivery/assign/${matchId}`,

    null,

    {
      params: {

        volunteer_name: volunteerName,

        volunteer_phone: volunteerPhone,

      },

    }

  );

  return res.data;

};

// ===============================
// OUT FOR PICKUP
// ===============================

export const outForPickup = async (
  matchId: number
) => {

  const res = await API.put(
    `/delivery/out-for-pickup/${matchId}`
  );

  return res.data;

};

// ===============================
// COLLECTED
// ===============================

export const markCollected = async (
  matchId: number
) => {

  const res = await API.put(
    `/delivery/collected/${matchId}`
  );

  return res.data;

};

// ===============================
// IN TRANSIT
// ===============================

export const markInTransit = async (
  matchId: number
) => {

  const res = await API.put(
    `/delivery/transit/${matchId}`
  );

  return res.data;

};

// ===============================
// DELIVERED
// ===============================

export const markDelivered = async (
  matchId: number
) => {

  const res = await API.put(
    `/delivery/delivered/${matchId}`
  );

  return res.data;

};

// ===============================
// ACKNOWLEDGED
// ===============================

export const acknowledgeDelivery = async (
  matchId: number
) => {

  const res = await API.put(
    `/delivery/acknowledged/${matchId}`
  );

  return res.data;

};