import React, { useState } from "react";
import Notifications from "./Notifications";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Dashboard = () => {
  const [notifications, toggleNotifications] = useState(false);
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
    </section>
  );
};

export default Dashboard;
