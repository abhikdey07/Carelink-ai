import API from "../api/axios";

export interface DonationItem {

  item_name: string;

  quantity: number;

  confidence: number;

  condition: string;

}

export interface DonationPayload {

  donor_id: number;

  latitude: number;

  longitude: number;

  items: DonationItem[];

}

export const submitDonation = async (
  data: DonationPayload
) => {

  const response = await API.post(
    "/donations/",
    data
  );

  return response.data;

};