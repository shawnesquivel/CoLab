import React, { useState, useEffect } from "react";
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
import CreateProjectModal from "./CreateProjectModal";

// Endpoints
const GETUSER_URL = "/api/getuser";
const CREATEPROJECT_URL = "/api/createproject";
const GETPROJECT_URL = "api/getproject";

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
    // test axios
    // const response = await axios.get("https://yesno.wtf/api");

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
  // todo: remove this code, gets the project modal ID
  useEffect(() => {
    // console.log("Project ID:", projectModal._id);
    // getProject(projectModal._id);
    // console.log(projectModal);
  }, [projectModal]);

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
      console.log("Inside the getProject");

      try {
        const payload = JSON.stringify({
          token: localStorage.getItem("token"),
          projectID: projectID,
        });
        console.log("Payload to be sent", payload);
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

    if (backendData?.currentProjects?.[0]) {
      backendData.currentProjects.forEach((project) => {
        getProject(project).catch(console.error);
      });
    }
  }, [backendData?.currentProjects?.[0]]);

  // Entering keywords, hashtags, etc.
  const handleKeyDown = async (e) => {
    // console.log(e.target.className);
    if (e.key !== "Enter") return;
    const value = e.target.value;
    if (!value.trim()) return;
    if (e.target.className === "keywords-input") {
      setKeywords([...keywords, value]);
      console.log(keywords);
    }
    if (e.target.className === "hashtags-input") {
      setHashtags([...hashtags, value]);
      console.log(hashtags);
    }
    if (e.target.className === "tags-input") {
      setTags([...tags, value]);
      console.log(tags);
    }
    if (e.target.className === "phrases-input") {
      setPhrases([...phrases, value]);
      console.log(phrases);
    }
    e.target.value = "";
  };
  // Removing keywords, hashtags, etc.
  const removeKeyword = (deleteIndex) => {
    setKeywords(keywords.filter((keyword, index) => index !== deleteIndex));
  };

  return (
    <section>
      {notifications ? (
        <>
          <Notifications className="notification-btn" />
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
      <h1 className="header-dark">Active Collabs</h1>
      {backendData ? (
        <>
          <div className="dashboard-header">
            <div>
              <h2>
                Welcome back, {backendData.firstName} {backendData.lastName}!
              </h2>

              {backendData.currentProjects[0] ? (
                <>
                  <h4>Here are your active projects.</h4>
                  <p>✨ means we are waiting for your action.</p>
                </>
              ) : (
                <h4>
                  You don't have any active projects. Go to the Collab Invites
                  to get started!
                </h4>
              )}
            </div>
            {/* Create Project (ONLY FOR BRAND REPS) */}
            {auth.roles.includes(3000) ? (
              <>
                <div style={{ BUTTON_WRAPPER_STYLES }}>
                  <button
                    onClick={() => {
                      setShowCreateProjectModal(true);
                    }}
                    className="create-project-btn"
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

          <section className="project-container">
            {currentProjects?.map((project, i) => (
              <div
                key={project._id}
                className={
                  (project.waitingForInfluencer && auth.roles.includes(2000)) ||
                  (!project.waitingForInfluencer && auth.roles.includes(3000))
                    ? "project-card project-highlight"
                    : "project-card"
                }
              >
                <div className="project-card-header">
                  <h4 className="project-details-header">
                    {project.title}{" "}
                    {project.waitingForInfluencer &&
                    auth.roles.includes(2000) ? (
                      <>✨</>
                    ) : (
                      ""
                    )}
                  </h4>
                  <h6>{project.description}</h6>
                  <button
                    onClick={() => {
                      setProjectModal(project);
                      setShowModal(true);
                      console.log(
                        "Showing the project details",
                        project,
                        projectModal,
                        showModal
                      );
                    }}
                    className="project-details-btn"
                  >
                    <FontAwesomeIcon icon={faExpand} />
                  </button>
                </div>
                <p className="project-details-company">{project.company}</p>
                {auth.roles.includes(2000) ? (
                  <>
                    <p>Brand: {project.company}</p>
                    <p>
                      Contact:
                      {project.brandRepAssigned.firstName}{" "}
                      {project.brandRepAssigned.lastName}
                    </p>
                    <p>
                      {project.status === "Reviewing Contract"
                        ? "Please review contract."
                        : ""}
                      {project.status === "In Progress"
                        ? "Project in Progress."
                        : ""}
                      {project.status === "Brand Reviewing"
                        ? "Submitted. Waiting for approval."
                        : ""}
                      {project.status === "Ready To Post"
                        ? "Your deliverables are ready to be posted."
                        : ""}
                    </p>
                  </>
                ) : (
                  <p>Status: {project.status.toLowerCase()}.</p>
                )}
                <p>${project.paymentPrice}</p>
                <p>{project.paymentProduct ? "🎁 Gifted" : ""}</p>
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
          {/* to-do: remove this old code. it was moved inside the proejct modal*/}
          {projectForm ? (
            <>
              {/* <h1>Create Project</h1>
              <form action="submit">
                <h2 className="create-project-header">Contract Details</h2>
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
                  placeholder="E.g., Fall Summer Promo"
                />
                <label htmlFor="influencer">
                  {" "}
                  <FontAwesomeIcon className="icon-left" icon={faUser} />
                  Influencer Assigned
                </label>
                <input
                  onChange={(e) => {
                    setInfluencerAssigned(e.target.value);
                  }}
                  type="text"
                  id="influencer"
                  autoComplete="off"
                  value={influencerAssigned}
                  required
                  placeholder="For testing: shawnchemicalengineer or shayhayashico"
                />
                <label htmlFor="instagramdeliverable">
                  <FontAwesomeIcon className="icon-left" icon={faInstagram} />
                  Instagram Deliverable
                </label>
                <input
                  type="text"
                  onChange={(e) => {
                    setInstagramDeliverable(e.target.value);
                  }}
                  placeholder="For example: 1 instagram story featuring the product"
                  value={instagramDeliverable}
                />
                <label htmlFor="tiktokdeliverable">
                  <FontAwesomeIcon className="icon-left" icon={faTiktok} />
                  Tik Tok Deliverable
                </label>
                <input
                  type="text"
                  onChange={(e) => {
                    setTiktokDeliverable(e.target.value);
                  }}
                  placeholder="For example: A 15-20sec tik tok"
                  value={tiktokDeliverable}
                />
                <label htmlFor="youtubedeliverable">
                  <FontAwesomeIcon className="icon-left" icon={faYoutube} />
                  YouTube Deliverable
                </label>
                <input
                  type="text"
                  onChange={(e) => {
                    setYoutubeDeliverable(e.target.value);
                  }}
                  placeholder="Minimum 30 sec product mention during video"
                  value={youtubeDeliverable}
                />
                <label htmlFor="reviewdeadline">
                  <FontAwesomeIcon className="icon-left" icon={faCalendar} />
                  Deadline to Submit for First Review
                </label>
                <input
                  onChange={(e) => {
                    setReviewDeadline(e.target.value);
                  }}
                  type="date"
                  id="reviewdeadline"
                  autoComplete="off"
                  value={reviewDeadline}
                  required
                />
                <label htmlFor="deadline">
                  <FontAwesomeIcon className="icon-left" icon={faCalendar} />
                  Deadline to Post the Final Deliverable(s)
                </label>
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
                <label htmlFor="time">
                  <FontAwesomeIcon className="icon-left" icon={faClock} />
                  Deadline Time
                </label>
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

                <label htmlFor="numberofrevisions">
                  Revisions Required (3 max)
                </label>
                <p className="note__italic">
                  Enter a number from 0-2. More revisions decreases the
                  likelihood of an influencers to accept the contract.
                </p>
                <input type="text" placeholder="Enter a number " />
                <h2 className="create-project-header">Contract Guidelines</h2>
                <label htmlFor="keywords">
                  Please add some keywords that describe your project
                  <br />
                  <span className="note__italic">
                    E.g., sustainability, fashion, fitness, lifestyle
                  </span>
                </label>
                <p></p>
                <div className="keywords-container">
                  {keywords.map((keyword, index) => (
                    <div className="keywords-item" key={index}>
                      <span className="keywords-text">{keyword}</span>
                      <span
                        onClick={() => removeKeyword(index)}
                        className="keywords-delete"
                      >
                        &times;
                      </span>
                    </div>
                  ))}
                  <input
                    onKeyDown={handleKeyDown}
                    type="text"
                    className="keywords-input"
                    placeholder="Add a keyword"
                  />
                </div>
                <label htmlFor="hashtags">
                  Are there any required hashtags?
                  <br />
                  <span className="note__italic">
                    E.g., #glossier, #ad, #bossbabe, #studentlife
                  </span>
                </label>
                <p></p>
                <div className="keywords-container">
                  {hashtags.map((hashtag, index) => (
                    <div className="keywords-item" key={index}>
                      <span className="keywords-text">{hashtag}</span>
                      <span
                        onClick={() => removeKeyword(index)}
                        className="keywords-delete"
                      >
                        &times;
                      </span>
                    </div>
                  ))}
                  <input
                    onKeyDown={handleKeyDown}
                    type="text"
                    className="hashtags-input"
                    placeholder="Add a hashtag"
                  />
                </div>
                <label htmlFor="tags">
                  Are there any required tags?
                  <br />
                  <span className="note__italic">
                    E.g., @glossier, @saje, @nike
                  </span>
                </label>
                <p></p>
                <div className="keywords-container">
                  {tags.map((tag, index) => (
                    <div className="keywords-item" key={index}>
                      <span className="keywords-text">{tag}</span>
                      <span
                        onClick={() => removeKeyword(index)}
                        className="keywords-delete"
                      >
                        &times;
                      </span>
                    </div>
                  ))}
                  <input
                    onKeyDown={handleKeyDown}
                    type="text"
                    className="tags-input"
                    placeholder="Add a tag"
                  />
                </div>
                <label htmlFor="phrases">
                  Are there any recommended phrases?
                  <br />
                  <span className="note__italic">
                    E.g., I love how natural it looks. It's a part of my
                    everyday makeup look.
                  </span>
                </label>
                <p></p>
                <div className="keywords-container">
                  {phrases.map((phrase, index) => (
                    <div className="keywords-item" key={index}>
                      <span className="keywords-text">{phrase}</span>
                      <span
                        onClick={() => removeKeyword(index)}
                        className="keywords-delete"
                      >
                        &times;
                      </span>
                    </div>
                  ))}
                  <input
                    onKeyDown={handleKeyDown}
                    type="text"
                    className="phrases-input"
                    placeholder="Add a phrase"
                  />
                </div>
                <label htmlFor="linkinbio">Link in Bio</label>
                <span className="note__italic"></span>
                <input
                  type="url"
                  id="linkinbio"
                  name="linkinbio"
                  placeholder="https://glossier.com/products/cloud-paint"
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
              </button> */}
            </>
          ) : (
            <>
              {/* <button
              onClick={() => {
                toggleProjectForm(!projectForm);
              }}
            >
              <FontAwesomeIcon icon={faClipboardList} />
              {projectBtnText}
            </button> */}
            </>
          )}
        </>
      ) : (
        <>
          <p>Since you are an influencer, you cannot create projects.</p>
        </>
      )}
      {/* to do: remove in-line form */}
      <div style={BUTTON_WRAPPER_STYLES}>
        {/* <button
          onClick={() => {
            setShowModal(true);
          }}
        >
          Test Button: Expand Project
        </button> */}
        {showModal ? (
          <ProjectModal
            isOpen={showModal}
            onClose={() => {
              setShowModal(false);
            }}
            project={projectModal}
            role={auth.roles}
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
