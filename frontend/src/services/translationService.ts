import axios from "axios";

const API_URL = "http://127.0.0.1:8000";

export const translateDashboard = async (
  texts: string[],
  language: string
) => {

  const response = await axios.post(
    `${API_URL}/translate-dashboard/`,
    {
      texts: texts,
      language: language,
    }
  );

  return response.data;

};