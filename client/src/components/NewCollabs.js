import projectCard from "../assets/project-card.png";
import React, { useState, useEffect } from "react";
import axios from "../api/axios";
import {
  faInstagram,
  faTiktok,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../styles/chippycheckbox.scss";
const moment = require("moment");

// to do: make current projects the entire Projects database.
const NewCollabs = ({ currentProjects, expandProject }) => {
  const [displayProjects, setDisplayProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [textQuery, setTextQuery] = useState({});
  const [socialQuery, setSocialQuery] = useState({});

  // Retrieves all projects with "no influencer assigned"
  const getallNewProjects = async () => {
    console.log("Getting projects");
    try {
      const allProjectsRes = await axios.get("/api/searchprojects", {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      console.log(allProjectsRes);
      setDisplayProjects(allProjectsRes.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getallNewProjects();
  }, []);

  // on page load, only show projects without an influencer
  // wrong: only shows user's projects with no influencer
  // useEffect(() => {
  //   const noInfluencerProjects = currentProjects.filter(
  //     (project) => !project.influencerAssigned
  //   );

  //   setDisplayProjects(noInfluencerProjects);
  // }, [currentProjects]);

  // Search by Property Value

  // Search by Contains Keys
  const filterProjectByQuery = (query, queryType) => {
    setTextQuery(query);
  };

  // Filter by Search Query
  useEffect(() => {
    console.log(textQuery);

    const filtered = displayProjects.filter((project) => {
      if (
        project?.company?.toLowerCase().includes(textQuery) ||
        project?.title?.toLowerCase().includes(textQuery) ||
        project?.keywords?.includes(textQuery) ||
        project?.description?.toLowerCase().includes(textQuery)
      )
        return true;
    });

    setFilteredProjects(filtered);

    console.log("filteredProjects", filtered);
  }, [textQuery]);

  // Filter by Platform
  const [instagramChecked, setInstagramChecked] = useState("");
  const [tiktokChecked, setTiktokChecked] = useState("");
  const [youtubeChecked, setYouTubeChecked] = useState("");
  useEffect(() => {
    const socialQuery = [];

    if (instagramChecked) {
      socialQuery.push("instagramTask");
    }
    if (tiktokChecked) {
      socialQuery.push("tiktokTask");
    }
    if (youtubeChecked) {
      socialQuery.push("youtubeTask");
    }

    let projectsToFilter;
    console.log("filteredProjects", filteredProjects);

    if (filteredProjects?.length === 0 || filteredProjects === undefined) {
      console.log("no objects in filter");
      projectsToFilter = displayProjects;
    }

    const filtered = projectsToFilter?.filter((project) => {
      console.log("adding a second filter", socialQuery);

      for (let socialTask of socialQuery) {
        console.log(socialTask);
        if (project[socialTask]) {
          console.log(project[socialTask]);
          return true;
        }
      }
    });
    setFilteredProjects(filtered);
    console.log(filtered);
  }, [instagramChecked, youtubeChecked, tiktokChecked]);

  return (
    <section className="new-collabs">
      <div className="new-collabs__header">
        <form action="form">
          <label htmlFor="search" className="form__label"></label>
          <input
            type="text"
            className="form__input form__input--full"
            onChange={(e) => {
              filterProjectByQuery(e.target.value, "text");
            }}
            placeholder="Search keywords, brands, etc"
          />
          <div className="label-col-container__row">
            <ul className="chippy">
              <li className="chippy__li">
                <input
                  type="checkbox"
                  id="instagram"
                  value="instagram"
                  name="instagramChecked"
                  checked={instagramChecked}
                  onChange={(e) => {
                    setInstagramChecked(!instagramChecked);
                  }}
                  className="chippy__input"
                />
                <label htmlFor="instagram" className="chippy__label">
                  <FontAwesomeIcon className="icon-left" icon={faInstagram} />
                  Instagram
                </label>
              </li>
              <li className="chippy__li">
                <input
                  type="checkbox"
                  id="tiktok"
                  value="tiktok"
                  name="tiktokChecked"
                  checked={tiktokChecked}
                  onChange={(e) => {
                    setTiktokChecked(!tiktokChecked);
                  }}
                  className="chippy__input"
                />
                <label htmlFor="tiktok" className="chippy__label">
                  <FontAwesomeIcon className="icon-left" icon={faTiktok} />
                  Tik Tok
                </label>
              </li>
              <li className="chippy__li">
                <input
                  type="checkbox"
                  id="youtube"
                  value="youtube"
                  name="youtubeChecked"
                  checked={youtubeChecked}
                  onChange={(e) => {
                    setYouTubeChecked(!youtubeChecked);
                  }}
                  className="chippy__input"
                />
                <label htmlFor="youtube" className="chippy__label">
                  <FontAwesomeIcon className="icon-left" icon={faYoutube} />
                  YouTube
                </label>
              </li>
            </ul>
          </div>
        </form>
      </div>
      <section className="project-container">
        {filteredProjects?.length === 0 || filteredProjects === undefined ? (
          <>
            {displayProjects?.map((project, i) => (
              <button
                onClick={() => {
                  expandProject(project);
                }}
                className="dashboard__btn"
                key={project._id}
              >
                <div className="img-container">
                  <img
                    src={projectCard}
                    alt="project example"
                    className="project-container__img"
                  />

                  <p className="img-container__text">
                    {project.paymentProduct ? "🎁 Gifted" : ""}
                  </p>
                </div>
                <div className="project-container__text-container">
                  <h4 className="project-container__text project-container__text--company">
                    {project.company}
                  </h4>
                  <h5 className="project-container__text project-container__text--title">
                    {" "}
                    {project.title.length > 20
                      ? project.title.slice(0, 20).concat("...")
                      : project.title}
                  </h5>
                  <h6 className="project-container__text project-container__text--date">
                    Due Date: {moment(project.deadline).format("MMMM Do YYYY")}
                  </h6>

                  <div className="">
                    {project.instagramTask ? (
                      <FontAwesomeIcon
                        className="icon-left"
                        icon={faInstagram}
                      />
                    ) : (
                      ""
                    )}
                    {project.tiktokTask ? (
                      <FontAwesomeIcon className="icon-left" icon={faTiktok} />
                    ) : (
                      ""
                    )}
                    {project.youtubeTask ? (
                      <FontAwesomeIcon className="icon-left" icon={faYoutube} />
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </button>
            ))}
          </>
        ) : (
          <>
            {filteredProjects?.map((project, i) => (
              <button
                onClick={() => {
                  expandProject(project);
                }}
                className="dashboard__btn"
              >
                <div className="img-container">
                  <img
                    src={projectCard}
                    alt="project example"
                    className="project-container__img"
                  />

                  <p className="img-container__text">
                    {project.paymentProduct ? "🎁 Gifted" : ""}
                  </p>
                </div>
                <div className="project-container__text-container">
                  <h4 className="project-container__text project-container__text--company">
                    {project.company}
                  </h4>
                  <h5 className="project-container__text project-container__text--title">
                    {" "}
                    {project.title.length > 20
                      ? project.title.slice(0, 20).concat("...")
                      : project.title}
                  </h5>
                  <h6 className="project-container__text project-container__text--date">
                    Due Date: {moment(project.deadline).format("MMMM Do YYYY")}
                  </h6>

                  <div className="">
                    {project.instagramTask ? (
                      <FontAwesomeIcon
                        className="icon-left"
                        icon={faInstagram}
                      />
                    ) : (
                      ""
                    )}
                    {project.tiktokTask ? (
                      <FontAwesomeIcon className="icon-left" icon={faTiktok} />
                    ) : (
                      ""
                    )}
                    {project.youtubeTask ? (
                      <FontAwesomeIcon className="icon-left" icon={faYoutube} />
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </button>
            ))}
          </>
        )}
      </section>
    </section>
  );
};

export default NewCollabs;
