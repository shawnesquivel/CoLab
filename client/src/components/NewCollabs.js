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
  //   Queries
  const [socialQuery, setSocialQuery] = useState("");
  const [keywordQuery, setKeywordQuery] = useState("");

  // on page load, only show projects without an influencer
  useEffect(() => {
    const noInfluencerProjects = currentProjects.filter(
      (project) => !project.influencerAssigned
    );

    setDisplayProjects(noInfluencerProjects);
  }, [currentProjects]);

  const filterProjectByQuery = (query, queryType) => {
    setSocialQuery(query);

    // social query
    if (queryType === "social") {
      // property name on object in schema
      query += "Task";
      // if the socialTask exists, return that project
      //   setDisplayProjects(
      //     displayProjects.filter((project) => project[query] ? project : project[``])
      //   );
    }
  };

  //   Get all the projects in the database that don't have
  //

  useEffect(() => {
    console.log("triggering use effect");
    getallNewProjects();
  }, []);

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

  return (
    <section className="new-collabs">
      <div>
        <form action="">
          <h4>Filter New Projects</h4>
          <label htmlFor="social">Which social is this for?</label>
          <select
            name="social"
            id="social"
            onChange={(e) => {
              filterProjectByQuery(e.target.value, "social");
            }}
            value={socialQuery}
            className="create-project-form__input create-project-form__input--select "
          >
            <option value="none" className="create-project-form__social">
              Select an option below
            </option>
            <option value="instagram" className="create-project-form__social">
              Instagram
            </option>
            <option value="tiktok" className="create-project-form__social">
              Tik Tok
            </option>
            <option value="youtube" className="create-project-form__social">
              Youtube
            </option>
          </select>
        </form>
      </div>
      <p>These are the projects which have no influencers assigned yet.</p>
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
  );
};

export default NewCollabs;
