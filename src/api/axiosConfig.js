// src/api/axiosConfig.js
import axios from "axios";
import { PORT } from "../helpers/port";

const axiosInstance = axios.create({
  baseURL: `http://localhost:${PORT}/api/v1`,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Ensures cookies are sent with requests
});

export default axiosInstance;
