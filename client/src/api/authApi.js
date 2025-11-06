import axios from "axios";

const SERVER_URI = import.meta.env.VITE_SERVER_URI;

export const authApi = axios.create({
  baseURL: `${SERVER_URI}/users`,
  withCredentials: true,
});
