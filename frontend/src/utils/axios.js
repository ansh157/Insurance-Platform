import axios from "axios";

const instance = axios.create({
  baseURL: "https://insurance-platform-nyod.onrender.com/api",
  withCredentials: true,
});

export default instance;