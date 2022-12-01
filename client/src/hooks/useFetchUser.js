import axios from "../api/axios";
import { useEffect, useState } from "react";

const GETUSER_URL = "/api/getuser";

const useFetchUser = () => {
  const [user, setUser] = useState("");

  const fetchUser = async () => {
    try {
      const payload = JSON.stringify({
        token: localStorage.getItem("token"),
      });

      if (!payload) return;

      const response = await axios.post(GETUSER_URL, payload, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      console.log("fetchUser: updating user", response);

      setUser(response.data.userProfile);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUser().catch(console.error);
  }, []);

  console.log(user);
  return user;
};

export default useFetchUser;
