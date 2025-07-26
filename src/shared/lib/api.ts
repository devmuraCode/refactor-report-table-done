import axios from "axios";

const api = axios.create({
  baseURL: "http://apialfa.apoint.uz/v1",
});

export const login = async (username: string, password: string) => {
  const response = await api.post("/hr/user/sign-in?include=token", {
    username,
    password,
  });
  return response.data;
};

export default api;
