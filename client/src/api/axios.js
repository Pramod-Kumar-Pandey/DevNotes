import axios from "axios";

const api = axios.create({
    baseURL: "https://devnotes-server-r8ud.onrender.com/api",
    withCredentials: true
});

export default api;
