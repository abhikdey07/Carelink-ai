import API from "../api/axios";

export const schedulePickup = async (
  matchId: number,
  pickupDate: string,
  pickupTime: string
) => {

  const res = await API.post(

    `/pickup/${matchId}`,

    null,

    {
      params: {

        pickup_date: pickupDate,

        pickup_time: pickupTime,

      },

    }

  );

  return res.data;

};

export const getPickup = async (
  matchId: number
) => {

  const res = await API.get(
    `/pickup/${matchId}`
  );

  return res.data;

};