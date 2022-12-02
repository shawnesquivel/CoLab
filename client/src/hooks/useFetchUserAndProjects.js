import axios from "../api/axios";
import { useEffect, useState } from "react";

const GETUSER_URL = "/api/getuser";
const GETPROJECT_URL = "api/getproject";

const useFetchUserAndProjects = () => {
  const [user, setUser] = useState();
  const [currentProjects, setCurrentProjects] = useState([]);

  const getProject = async (projectID) => {
    try {
      const payload = JSON.stringify({
        token: localStorage.getItem("token"),
        projectID: projectID,
      });
      const response = await axios.post(GETPROJECT_URL, payload, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      // console.log("Axios Response", response.data.project);
      // if a project was found
      setCurrentProjects((currentProjects) => [
        ...currentProjects,
        response.data.project,
      ]);
    } catch (err) {
      console.log(err);
    }
  };

  const getUser = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) return;

      const payload = JSON.stringify({
        token,
      });

      const userResponse = await axios.post(GETUSER_URL, payload, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      const userResponseData = userResponse.data.userProfile;

      return [userResponseData, null];
    } catch (error) {
      console.log("Error getting the user", error);
      return [null, error];
    }
  };

  useEffect(() => {
    const fetchUserAndProjects = async () => {
      try {
        // Get the user
        const [userData, userErr] = await getUser();
        if (userErr) return;
        console.log("Running Async Fetch User", userData);

        // Get the Projects
        if (userData) {
          setUser(userData);
          getAllProjects(userData);
        }
      } catch (err) {
        console.log(err);
      }
    };

    const getAllProjects = (userData) => {
      console.log("refreshing the dashboard");
      // If the backend data is loaded, fetch each project into currentProjects array
      userData?.currentProjects.forEach((projectID) => {
        getProject(projectID).catch(console.error);
      });
    };

    fetchUserAndProjects().catch(console.error);
  }, []);

  return { user, currentProjects };
};

export default useFetchUserAndProjects;
