import React, { useState, useEffect } from "react";
import axios from "../api/axios";
import Notifications from "./Notifications";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useAuth from "../hooks/useAuth";
import ProjectForm from "./ProjectForm";

const GETUSER_URL = "/api/getuser";

const Dashboard = () => {
  // Use authContext to get the current logged in user ? ?
  const { auth } = useAuth();

  // STATE
  const [backendData, setBackendData] = useState({
    status: "still fetching data",
  });

  const [notifications, toggleNotifications] = useState(false);
  const [notificationButtonText, setNotificationButtonText] =
    useState("Show Project");
  const [projectForm, toggleProjectForm] = useState(false);

  const fetchUser = async () => {
    const user = auth?.user;
    // test axios
    // const response = await axios.get("https://yesno.wtf/api");

    const payload = JSON.stringify({
      token: localStorage.getItem("token"),
    });

    console.log(payload);
    const response = await axios.post(GETUSER_URL, payload, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    console.log(response.data.userProfile);
    setBackendData(response.data.userProfile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <section>
      {notifications ? (
        <>
          <Notifications />
          <button
            onClick={() => {
              toggleNotifications(!notifications);
            }}
          >
            <FontAwesomeIcon icon={faBell} /> Hide
          </button>
        </>
      ) : (
        <button
          onClick={() => {
            toggleNotifications(!notifications);
          }}
        >
          <FontAwesomeIcon icon={faBell} /> Show
        </button>
      )}
      <br />
      <h1>Dashboard</h1>
      <p>This is where the projects will be visible</p>
      <h3>Backend Status: {backendData.status}</h3>
      {projectForm ? (
        <>
          <form action="submit">
            <h1>Create Project</h1>
            <label htmlFor="">Project Name</label>
            <input type="text" />
            <label htmlFor="">Task</label>
            <input type="text" />
            <label htmlFor="">Deadline</label>
            <input type="text" />
            <button onClick={handleSubmit}>Create Project</button>
          </form>
          <button
            onClick={() => {
              toggleProjectForm(!projectForm);
            }}
          >
            <FontAwesomeIcon icon={faBell} /> Hide
          </button>
        </>
      ) : (
        <button
          onClick={() => {
            toggleProjectForm(!projectForm);
          }}
        >
          <FontAwesomeIcon icon={faBell} /> Show
        </button>
      )}
    </section>
  );
};

export default Dashboard;
