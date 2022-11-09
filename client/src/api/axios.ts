import axios from "axios";

const baseURL: string =
  process.env.NODE_ENV === "production"
    ? "https://gmail_clone_api_1f12"
    : "http://localhost:5000";

export default axios.create({
  baseURL,
  withCredentials: true,
});
