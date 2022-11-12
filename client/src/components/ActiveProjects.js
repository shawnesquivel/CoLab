import projectCard from "../assets/project-card.png";
import React, { useState, useEffect } from "react";
const moment = require("moment");

const NewCollabs = ({ currentProjects, expandProject }) => {
  const [inProgressProjects, setInProgressProjects] = useState([]);

  useEffect(() => {
    const filteredProjects = currentProjects.filter(
      (project) => project.status !== "project complete"
    );

    setInProgressProjects(filteredProjects);
  }, [currentProjects]);

  return (
    <section className="project-container">
      {inProgressProjects?.map((project, i) => (
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
              {moment(project.deadline).format("MMMM Do YYYY")}
            </h6>

            <p className="project-container__text project-container__text--status">
              {project.status.toLowerCase() === "reviewing contract"
                ? "📄 Influencer reviewing contract."
                : ""}
              {project.status.toLowerCase() ===
              "in progress/waiting for submission"
                ? "⚒ Project accepted. Work in progress."
                : ""}
              {project.status.toLowerCase() === "brand reviewing"
                ? "📝 Influencer submitted draft. Waiting for brand to review."
                : ""}
              {project.status.toLowerCase() === "ready to publish"
                ? "✅ Waiting for influencer to post."
                : ""}
            </p>
          </div>
        </button>
        // </div>
      ))}
    </section>
  );
};

export default NewCollabs;
