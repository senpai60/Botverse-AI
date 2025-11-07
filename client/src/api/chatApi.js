import axios from "axios";

const SERVER_URI = import.meta.env.VITE_SERVER_URI;

export const chatApi = axios.create({
  baseURL: `${SERVER_URI}/chats`,
  withCredentials: true,
});
