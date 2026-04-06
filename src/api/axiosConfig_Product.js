// src/api/axiosConfig.js
import axios from "axios";

const axiosInstance_product = axios.create({
  baseURL: "http://localhost:49160/",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Ensures cookies are sent with requests
});

export default axiosInstance_product;
