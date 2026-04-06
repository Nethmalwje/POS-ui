// src/api/axiosConfig_Inventory.js
import axios from "axios";

const axiosInstance_inventory = axios.create({
  baseURL: "http://localhost:49162/",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Ensures cookies are sent with requests
});

export { axiosInstance_inventory };
