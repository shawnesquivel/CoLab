import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "../api/axios";
import Notifications from "./Notifications";
import {
  faBell,
  faClipboardList,
  faAngleUp,
  faUser,
  faClock,
  faPlus,
  faExpand,
  faExclamationCircle,
} from "@fortawesome/free-solid-svg-icons";
import { faCalendar } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useAuth from "../hooks/useAuth";
import AuthContext from "../context/AuthProvider";
import ProjectModal from "./ProjectModal";
import NewCollabs from "./NewCollabs";
import ActiveProjects from "./ActiveProjects";
import CreateProjectModal from "./CreateProjectModal";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import "../styles/dashboard.scss";
import colab from "../assets/colab-text.png";
import colabFolder from "../assets/colab-logo.png";
import colabTextTransparent from "../assets/colab-text-transparent.png";
import headshot from "../assets/headshot.png";
import projectCard from "../assets/project-card.png";
const moment = require("moment");

// Endpoints
const GETUSER_URL = "/api/getuser";
const CREATEPROJECT_URL = "/api/createproject";
const GETPROJECT_URL = "api/getproject";

const BUTTON_WRAPPER_STYLES = {
  position: "relative",
  zIndex: 1,
};

const OVERLAY_STYLES = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, .7)",
  zIndex: 100,
};

// const OTHER_CONTENT_STYLES = {
//   position: "relative",
//   zIndex: 2,
//   backgroundColor: "red",
//   padding: "10px",
// };

const Dashboard = () => {
  // Use authContext to get the current logged in user ? ?
  const { auth } = useAuth(AuthContext);
  const navigate = useNavigate(); // to use the navigate hook

  // useEffect(() => {
  //   console.log(auth.roles);
  // }, []);

  // STATE
  const [backendData, setBackendData] = useState("");
  const [currentProjects, setCurrentProjects] = useState([]);
  // Form
  const [notifications, toggleNotifications] = useState(false);
  const [notificationBtnText, setNotificationBtnText] = useState("");
  const [projectForm, toggleProjectForm] = useState(false);
  const [projectBtnText, setProjectBtnText] = useState("Create Project");

  // Project Details
  const [influencerAssigned, setInfluencerAssigned] = useState("");
  const [title, setTitle] = useState("");
  const [deadline, setDeadline] = useState("");
  const [reviewDeadline, setReviewDeadline] = useState("");
  const [deadlineTime, setDeadlineTime] = useState("");
  const [instagramDeliverable, setInstagramDeliverable] =
    useState("Post a story");
  const [tiktokDeliverable, setTiktokDeliverable] =
    useState("10-20sec Tik Tok");
  const [youtubeDeliverable, setYoutubeDeliverable] =
    useState("15-30 sec ad read");
  const [numberOfRevisions, setNumberOfRevisions] =
    useState("15-30 sec ad read");

  // Project Guidelines
  const [keywords, setKeywords] = useState(["lifestyle"]);
  const [hashtags, setHashtags] = useState([]);
  const [tags, setTags] = useState([]);
  const [phrases, setPhrases] = useState([]);

  // Open Modals
  const [showModal, setShowModal] = useState(false);
  const [projectModal, setProjectModal] = useState({});
  const [showCreateProjectModal, setShowCreateProjectModal] = useState(false);
  const [showActiveProjects, setShowActiveProjects] = useState(true);
  const [showNewCollabs, setShowNewCollabs] = useState(false);

  // Disable Body Scroll when Modal is open
  showModal ? disableBodyScroll(document) : enableBodyScroll(document);

  // Toggle Button Text
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
  // On Page Load, Get User from Backend
  useEffect(() => {
    fetchUser().catch(console.error);
  }, []);
  const fetchUser = async () => {
    const user = auth?.user;
    const payload = JSON.stringify({
      token: localStorage.getItem("token"),
    });
    const response = await axios.post(GETUSER_URL, payload, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    setBackendData(response.data.userProfile);
  };

  // Create a Project
  const submitProject = async (e) => {
    e.preventDefault();
    const user = auth?.username;
    console.log("Creating a Project, Here is your Auth", auth);
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

  useEffect(() => {
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

        // console.log("Response:", response);
        setCurrentProjects((currentProjects) => [
          ...currentProjects,
          response.data.project,
        ]);
      } catch (err) {
        console.log(err);
      }
    };

    // If the backend data is loaded, fetch each project into currentProjects array
    if (backendData?.currentProjects?.[0]) {
      backendData.currentProjects.forEach((project) => {
        getProject(project).catch(console.error);
      });
    }
  }, [backendData?.currentProjects?.[0]]);

  const expandProject = (project) => {
    setProjectModal(project);
    setShowModal(true);
  };

  return (
    <section className="dashboard">
      <div className="dashboard-container-left">
        <div className="logo-container">
          <img
            src={colabFolder}
            alt="logo folder"
            className="logo-container__logo"
          />
          <img
            src={colabTextTransparent}
            alt="logo text"
            className="logo-container__logo"
          />
        </div>
        <nav className="dashboard-links">
          <Link
            to="/dashboard"
            className="dashboard-links__link dashboard-links__link--active"
          >
            Dashboard
          </Link>
          <button
            onClick={() => {
              setShowNewCollabs(false);
              setShowActiveProjects(true);
            }}
          >
            Dashboard
          </button>
          <button
            onClick={() => {
              setShowActiveProjects(false);
              setShowNewCollabs(true);
            }}
          >
            New Collabs
          </button>

          <Link to="/invites" className="dashboard-links__link">
            Invites
          </Link>
          <Link
            to="/settings"
            className="dashboard-links__link dashboard-links__link--last"
          >
            Settings
          </Link>
        </nav>
      </div>

      <div className="dashboard-container-right">
        {backendData ? (
          <header className="header">
            <div className="dashboard-header-left">
              {backendData.hasUpdatedProfile ? (
                <h3 className="dashboard-header-left__greeting">
                  Welcome back, {backendData.firstName}. 👋
                </h3>
              ) : (
                <>
                  <h2 className="header-left__greeting">
                    Welcome, {backendData.firstName}. 👋
                  </h2>

                  <p className="register__text register__text--subtle">
                    <Link
                      to="/updateprofile"
                      className="register__text register__text--subtle text--underline"
                    >
                      Please update your profile!
                    </Link>
                  </p>
                </>
              )}
            </div>

            <div className="dashboard-header-right">
              <FontAwesomeIcon icon={faBell} />
              <img
                className="dashboard-header-right__avatar"
                src={backendData.avatar}
                alt="profile"
              />
            </div>
          </header>
        ) : (
          ""
        )}

        {backendData ? (
          <>
            {/* Create Project (ONLY FOR BRAND REPS) */}
            <div className="">
              {auth.roles.includes(3000) ? (
                <>
                  <div
                    style={{ BUTTON_WRAPPER_STYLES }}
                    className="dashboard-create"
                  >
                    <button
                      onClick={() => {
                        setShowCreateProjectModal(true);
                      }}
                      className="dashboard-create__btn"
                    >
                      <FontAwesomeIcon icon={faPlus} className="icon-left" />
                      Create a New Project
                    </button>
                    {showCreateProjectModal ? (
                      <CreateProjectModal
                        isOpen={showCreateProjectModal}
                        onClose={() => {
                          setShowCreateProjectModal(false);
                        }}
                        project={projectModal}
                        role={auth.roles}
                        brand={backendData.firstName}
                        OVERLAY_STYLES={OVERLAY_STYLES}
                      >
                        Create Project
                      </CreateProjectModal>
                    ) : (
                      ""
                      // <p>showModal is set to false.</p>
                    )}
                  </div>
                </>
              ) : (
                ""
              )}
            </div>
            {/* Contains all the active project cards */}
            {showActiveProjects ? (
              <ActiveProjects
                currentProjects={currentProjects}
                expandProject={expandProject}
              />
            ) : (
              ""
            )}

            {/* Contains all the new projects */}
            {showNewCollabs ? (
              <NewCollabs
                currentProjects={currentProjects}
                expandProject={expandProject}
              />
            ) : (
              ""
            )}
          </>
        ) : (
          <h3>Backend is loading</h3>
        )}
      </div>

      {/* Notification Button */}
      {/* {notifications ? (
        <>
          <Notifications className="notification-btn" />
          <button
            onClick={() => {
              toggleNotifications(!notifications);
            }}
            className="notification-btn"
          >
            <FontAwesomeIcon icon={faBell} /> {notificationBtnText}
          </button>
        </>
      ) : (
        <button
          onClick={() => {
            toggleNotifications(!notifications);
          }}
          className="notification-btn"
        >
          <FontAwesomeIcon icon={faBell} /> {notificationBtnText}
        </button>
      )} */}

      <br />
      {/* Expand Create Project Form */}

      {/* Expand Project */}
      <div style={BUTTON_WRAPPER_STYLES}>
        {showModal ? (
          <ProjectModal
            isOpen={showModal}
            onClose={() => {
              setShowModal(false);
            }}
            showModal={setShowModal}
            project={projectModal}
            role={auth.roles}
            OVERLAY_STYLES={OVERLAY_STYLES}
          >
            Project Modal
          </ProjectModal>
        ) : (
          ""
          // <p>showModal is set to false.</p>
        )}
      </div>
    </section>
  );
};

export default Dashboard;
