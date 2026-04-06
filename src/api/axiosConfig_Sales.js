// src/api/axiosConfig.js
import axios from "axios";

const axiosInstance_sales = axios.create({
  baseURL: "http://localhost:49163/",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Ensures cookies are sent with requests
});

export default axiosInstance_sales;
