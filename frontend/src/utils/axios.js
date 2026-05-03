import axios from "axios";

const instance = axios.create({
  baseURL: "https://recipesimply.fly.dev/api",
  withCredentials: true,
});

export default instance;
