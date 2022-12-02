import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "../api/axios";
// import Notifications from "./Notifications";
import {
  faArrowRightFromBracket,
  faBell,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useAuth from "../hooks/useAuth";
import AuthContext from "../context/AuthProvider";
import ProjectModal from "./ProjectModal";
import NewCollabs from "./NewCollabs";
import ActiveProjects from "./ActiveProjects";
import CreateProjectModal from "./CreateProjectModal";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import "../styles/dashboard.scss";
import colabFolder from "../assets/colab-logo.png";
import colabTextTransparent from "../assets/colab-text-transparent.png";
import useWindowSize from "../hooks/useWindowSize";
import useFetchUser from "../hooks/useFetchUser";
import useFetchActiveProjects from "../hooks/useFetchActiveProjects";
// Endpoints
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

const Dashboard = () => {
  // New Way: One Line of Code 😁
  const user = useFetchUser();
  // const currentProjects = useFetchActiveProjects();
  useEffect(() => {
    console.log("user:", user);
  }, [user]);

  const testProjects = useRef([]);

  const { auth } = useAuth(AuthContext);
  const navigate = useNavigate(); // to use the navigate hook

  const [currentProjects, setCurrentProjects] = useState([]);
  // Form
  const [notifications, toggleNotifications] = useState(false);
  const [notificationBtnText, setNotificationBtnText] = useState("");
  const [projectForm, toggleProjectForm] = useState(false);
  const [projectBtnText, setProjectBtnText] = useState("Create Project");

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

      // if a project was found
      if (response.data.project) {
        console.log("Response:", response.data.project);
        setCurrentProjects((currentProjects) => [
          ...currentProjects,
          response.data.project,
        ]);
      }

      // testProjects.current.push(response.data.project);
      // console.log("Test Projects", testProjects);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    refreshDashboard();
    // Dependency => if the backend data has any projects in it
  }, [user]);

  // const expandProject = (project) => {
  //   setProjectModal(project);
  //   setShowModal(true);
  // };

  const refreshDashboard = () => {
    console.log("refreshing the dashboard");
    // If the backend data is loaded, fetch each project into currentProjects array
    if (user?.currentProjects?.[0]) {
      user.currentProjects.forEach((project) => {
        getProject(project).catch(console.error);
      });
    }
  };

  const testProjectTwo = useFetchActiveProjects(user);

  return (
    <>
      <section className="dashboard">
        <div className="dashboard-container-left">
          <Link to="/register" className="header-left links__link">
            <div className="logo-container">
              <img
                src={colabFolder}
                alt="logo folder"
                className="logo-container__logo logo-container__logo--co"
              />
              <img
                src={colabTextTransparent}
                alt="logo text"
                className="logo-container__logo logo-container__logo--colab"
              />
            </div>
          </Link>
          <nav className="dashboard-links">
            <ul className="dashboard-links__ul">
              <li className="dashboard-links__li">
                <button
                  className={
                    showActiveProjects
                      ? "dashboard-links__link dashboard-links__link--active"
                      : "dashboard-links__link "
                  }
                  onClick={() => {
                    setShowNewCollabs(false);
                    setShowActiveProjects(true);
                  }}
                >
                  Dashboard
                </button>
              </li>
              <li className="dashboard-links__li">
                <button
                  className={
                    showNewCollabs
                      ? "dashboard-links__link dashboard-links__link--active"
                      : "dashboard-links__link "
                  }
                  onClick={() => {
                    setShowActiveProjects(false);
                    setShowNewCollabs(true);
                  }}
                >
                  New Collabs
                </button>
              </li>
              <li className="dashboard-links__li">
                <button className="dashboard-links__link">Invites</button>
              </li>
              <li className="dashboard-links__li dashboard-links__li--last">
                <button className="dashboard-links__link">Settings</button>
              </li>
            </ul>
          </nav>
        </div>

        <div className="dashboard-container-right">
          {user ? (
            <header className="dashboard-header dashboard-header--light ">
              <div className="dashboard-header-left">
                {user.hasUpdatedProfile ? (
                  <h3 className="dashboard-header-left__greeting">
                    Welcome back, {user.firstName}. 👋
                  </h3>
                ) : (
                  <>
                    <h2 className="header-left__greeting">
                      Welcome, {user.firstName}. 👋
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
                <FontAwesomeIcon icon={faBell} className="icon-medium" />
                <Link to="/login" className="link link--dark">
                  <FontAwesomeIcon
                    icon={faArrowRightFromBracket}
                    className="icon-medium"
                  />
                </Link>
                {user.avatar ? (
                  <Link
                    to="/updateprofile"
                    className="register__text register__text--subtle text--underline"
                  >
                    <img
                      className="dashboard-header-right__avatar"
                      src={user.avatar}
                      alt="profile"
                    />
                  </Link>
                ) : (
                  ""
                )}
              </div>
            </header>
          ) : (
            ""
          )}

          {user ? (
            <>
              {/* Create Project (ONLY FOR BRAND REPS) */}
              {auth.roles.includes(3000) &&
              showActiveProjects &&
              !showNewCollabs ? (
                <>
                  {showCreateProjectModal ? (
                    <CreateProjectModal
                      isOpen={showCreateProjectModal}
                      onClose={() => {
                        setShowCreateProjectModal(false);
                        navigate("/dashboard");
                      }}
                      project={projectModal}
                      role={auth.roles}
                      brand={user.firstName}
                      OVERLAY_STYLES={OVERLAY_STYLES}
                    >
                      Create Project
                    </CreateProjectModal>
                  ) : (
                    ""
                  )}
                </>
              ) : (
                ""
              )}
              {/* Contains all the active project cards */}
              {showActiveProjects ? (
                <>
                  {auth.roles.includes(3000) &&
                  showActiveProjects &&
                  !showNewCollabs ? (
                    <>
                      <div className="dashboard-header dashboard-header--justify-right">
                        <button
                          onClick={() => {
                            setShowCreateProjectModal(true);
                          }}
                          className="form__btn-dotted form__btn-dotted--medium"
                        >
                          <FontAwesomeIcon
                            icon={faPlus}
                            className="icon-left"
                          />
                          Create a New Project
                        </button>{" "}
                      </div>{" "}
                    </>
                  ) : (
                    ""
                  )}
                  <ActiveProjects
                    currentProjects={currentProjects}
                    // currentProjects={testProjects.current}
                    // expandProject={expandProject}
                  />
                </>
              ) : (
                ""
              )}

              {/* Contains all the new projects */}
              {showNewCollabs
                ? // <NewCollabs
                  //   currentProjects={currentProjects}
                  //   expandProject={expandProject}
                  // />
                  ""
                : ""}
            </>
          ) : (
            <h3>Backend is loading...</h3>
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
              user={user}
              // refreshDashboard={refreshDashboard}
            >
              Project Modal
            </ProjectModal>
          ) : (
            ""
            // <p>showModal is set to false.</p>
          )}
        </div>
      </section>
    </>
  );
};

export default Dashboard;
