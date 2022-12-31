import axios from "axios";

export default axios.create({
  // Local
  baseURL: "http://localhost:5000",
  // Live
  // baseURL: "http://colab-api.onrender.com",
});
