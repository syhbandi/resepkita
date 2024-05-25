import axios from "axios";

const api = axios.create({
  baseURL: "https://www.themealdb.com/api/json/v1/1", // Ganti dengan base URL Anda
});

export default api;
