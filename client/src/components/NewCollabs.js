import projectCard from "../assets/project-card.png";
import React, { useState, useEffect } from "react";
import axios from "../api/axios";
import {
  faInstagram,
  faTiktok,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
          <h4 className="form__text form__text--subheader">New Collabs</h4>
          <p className="form__instructions">
            Use the filters to refine your search.
          </p>
          <div className="label-row-container  label-row-container--left">
            <div className="label-row-container__col">
              <label htmlFor="search" className="form__label">
                Search
              </label>
              <input
                type="text"
                className="form__input "
                onChange={(e) => {
                  filterProjectByQuery(e.target.value, "text");
                }}
              />
            </div>
            <div className="label-col-container">
              <p className="form__label">Platform</p>
              <div className="label-col-container__row">
                <label
                  htmlFor="instagramChecked"
                  className="form__label--checkbox"
                >
                  <input
                    className="form__checkbox"
                    name="instagramChecked"
                    type="checkbox"
                    checked={instagramChecked}
                    onChange={(e) => {
                      setInstagramChecked(!instagramChecked);
                    }}
                  />
                  {/* <FontAwesomeIcon className="icon-left" icon={faInstagram} /> */}
                  Instagram
                </label>
              </div>
              <div className="label-col-container__row">
                <label
                  htmlFor="tiktokChecked"
                  className="form__label--checkbox"
                >
                  <input
                    className="form__checkbox"
                    name="tiktokChecked"
                    type="checkbox"
                    checked={tiktokChecked}
                    onChange={(e) => {
                      setTiktokChecked(!tiktokChecked);
                    }}
                  />
                  {/* <FontAwesomeIcon className="icon-left" icon={faTiktok} /> */}
                  Tik Tok
                </label>
              </div>
              <div className="label-col-container__row">
                <label
                  htmlFor="youtubeChecked"
                  className="form__label--checkbox"
                >
                  <input
                    className="form__checkbox"
                    name="youtubeChecked"
                    type="checkbox"
                    checked={youtubeChecked}
                    onChange={(e) => {
                      setYouTubeChecked(!youtubeChecked);
                    }}
                  />
                  {/* <FontAwesomeIcon className="icon-left" icon={faYoutube} /> */}
                  YouTube
                </label>
              </div>
            </div>
          </div>
        </form>
      </div>
      <section className="project-container">
        {displayProjects?.map((project, i) => (
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
                  <FontAwesomeIcon className="icon-left" icon={faInstagram} />
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
      </section>
      <section className="project-container">
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
                  <FontAwesomeIcon className="icon-left" icon={faInstagram} />
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
      </section>
    </section>
  );
};

export default NewCollabs;
