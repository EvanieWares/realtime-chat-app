import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const login = async (username: string, password: string) => {
  const response = await api.post("/auth/login", { username, password });
  return response.data;
};

export const register = async (username: string, password: string) => {
  const response = await api.post("/auth/register", { username, password });
  return response.data;
};

export const fetchMessages = async (token: string) => {
  const response = await api.get("/chat/messages", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const postMessage = async (user: string, message: string, token: string) => {
  const response = await api.post("/chat/messages", { user, message }, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
