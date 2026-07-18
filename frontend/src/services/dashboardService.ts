import API from "../api/axios";

export interface RecentDonation {
  id: number;
  date: string;
  status: string;
  items: number;

  volunteer_name?: string | null;
  volunteer_phone?: string | null;
}

export interface DashboardStats {
  total_donations: number;
  total_items: number;
  pending_donations: number;
  last_donation: string;
  recent_donations: RecentDonation[];
}

export const getDashboardStats = async (userId: number) => {
  const response = await API.get<DashboardStats>(
    `/dashboard/stats/${userId}`
  );

  return response.data;
};