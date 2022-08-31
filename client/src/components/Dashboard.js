import React, { useState, useEffect } from "react";
import axios from "../api/axios";
import Notifications from "./Notifications";
import {
  faBell,
  faClipboardList,
  faAngleUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useAuth from "../hooks/useAuth";
import AuthContext from "../context/AuthProvider";
import ProjectModal from "./ProjectModal";

const GETUSER_URL = "/api/getuser";
const CREATEPROJECT_URL = "/api/createproject";

const BUTTON_WRAPPER_STYLES = {
  position: "relative",
  zIndex: 1,
};

const OTHER_CONTENT_STYLES = {
  position: "relative",
  zIndex: 2,
  backgroundColor: "red",
  padding: "10px",
};

const Dashboard = () => {
  // Use authContext to get the current logged in user ? ?
  const { auth } = useAuth(AuthContext);
  useEffect(() => {
    console.log(auth.roles);
  }, []);

  // STATE
  const [backendData, setBackendData] = useState("");
  // Form
  const [notifications, toggleNotifications] = useState(false);
  const [notificationBtnText, setNotificationBtnText] = useState("");
  const [projectForm, toggleProjectForm] = useState(false);
  const [projectBtnText, setProjectBtnText] = useState("Create Project");

  // Create Project Form
  const [influencerAssigned, setInfluencerAssigned] = useState("");
  const [title, setTitle] = useState("");
  const [deadline, setDeadline] = useState("");
  const [deadlineTime, setDeadlineTime] = useState("");

  // Open Modal
  const [showModal, setShowModal] = useState(false);

  // Buttons
  useEffect(() => {
    if (notifications) {
      setNotificationBtnText(" Hide");
    } else {
      setNotificationBtnText("");
    }
  }, [notifications]);
  useEffect(() => {
    if (projectForm) {
      setProjectBtnText(" Hide");
    } else {
      setProjectBtnText(" Create Project");
    }
  }, [projectForm]);
  // Get the User on Page Load
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

  useEffect(() => {
    fetchUser().catch(console.error);
  }, []);
  // Create a Project
  const submitProject = async (e) => {
    e.preventDefault();
    const user = auth?.username;
    console.log("logging the auth", auth);
    try {
      const payload = JSON.stringify({
        token: localStorage.getItem("token"),
        title,
        influencerAssigned,
        brandRepAssigned: auth.user,
        deadline: new Date(),
      });
      console.log("logging the form submission", payload);
      console.log("logging the date object", typeof deadline);

      const response = await axios.post(CREATEPROJECT_URL, payload, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      console.log("Response Data", response);
    } catch (err) {
      console.log(err);
    }
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
            <FontAwesomeIcon icon={faBell} /> {notificationBtnText}
          </button>
        </>
      ) : (
        <button
          onClick={() => {
            toggleNotifications(!notifications);
          }}
        >
          <FontAwesomeIcon icon={faBell} /> {notificationBtnText}
        </button>
      )}
      <br />
      <h1>Dashboard</h1>
      {backendData ? (
        <>
          <h3>Welcome, {backendData.firstName}.</h3>
          <h3>Here are your active projects.</h3>
          <section className="project-container">
            {backendData?.currentProjects?.map((project, i) => (
              <div
                key={i}
                className={
                  project.waitingForInfluencer
                    ? "project-card project-highlight"
                    : "project-card"
                }
              >
                <h4>Project Details</h4>
                <p>Title: {project.title}</p>
                <p>Project Status: {project.status}</p>
                <br />
                <h4>Payment</h4>
                <p>Payment Method: {project.paymentMethod}</p>
                <p>Payment: ${project.paymentPrice}</p>
                <p>Payment Product: ${project.paymentProduct}</p>
              </div>
            ))}
          </section>
        </>
      ) : (
        <h3>Backend is loading</h3>
      )}
      <br />
      {auth.roles.includes(3000) || auth.roles.includes(1000) ? (
        <>
          <p>
            Since you are a brand or admin, you are authorized to create
            projects.{" "}
          </p>
          {projectForm ? (
            <>
              <form action="submit">
                <h1>Create Project</h1>
                <label htmlFor="title">Project Title</label>
                <input
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                  type="text"
                  id="title"
                  autoComplete="off"
                  value={title}
                  required
                />

                <label htmlFor="influencer">Influencer Assigned</label>
                <input
                  onChange={(e) => {
                    setInfluencerAssigned(e.target.value);
                  }}
                  type="text"
                  id="influencer"
                  autoComplete="off"
                  value={influencerAssigned}
                  required
                />

                <label htmlFor="">Task</label>
                <input type="text" />

                <label htmlFor="deadline">Deadline Date</label>
                <input
                  onChange={(e) => {
                    setDeadline(e.target.value);
                  }}
                  type="date"
                  id="deadline"
                  autoComplete="off"
                  value={deadline}
                  required
                />
                <label htmlFor="time">Deadline Time</label>
                <input
                  onChange={(e) => {
                    setDeadlineTime(e.target.value);
                  }}
                  type="time"
                  id="time"
                  autoComplete="off"
                  value={deadlineTime}
                  required
                />
                <button onClick={submitProject}>Create Project</button>
              </form>
              <button
                onClick={() => {
                  toggleProjectForm(!projectForm);
                }}
              >
                <FontAwesomeIcon icon={faAngleUp} />
                {projectBtnText}
              </button>
            </>
          ) : (
            <button
              onClick={() => {
                toggleProjectForm(!projectForm);
              }}
            >
              <FontAwesomeIcon icon={faClipboardList} />
              {projectBtnText}
            </button>
          )}
        </>
      ) : (
        <>
          <p>Since you are an influencer, you cannot create projects.</p>
          <div style={BUTTON_WRAPPER_STYLES}>
            <button
              onClick={() => {
                setShowModal(true);
              }}
            >
              Expand Project
            </button>
            {showModal ? (
              <ProjectModal
                isOpen={showModal}
                onClose={() => {
                  setShowModal(false);
                }}
              >
                Project Details
              </ProjectModal>
            ) : (
              ""
            )}
          </div>
          <div style={OTHER_CONTENT_STYLES}>Test Z Index of 2</div>
        </>
      )}
    </section>
  );
};

export default Dashboard;
