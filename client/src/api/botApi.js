import axios from "axios";

const SERVER_URI =  import.meta.env.VITE_SERVER_URI

export const botApi = axios.create({
    baseURL: `${SERVER_URI}/bot`,
    withCredentials:true
})