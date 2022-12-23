import React from "react";

import "../styles/createprojectmodal.scss";
import "../styles/dashboard.scss";
const moment = require("moment");

// Once a project has been accepted, an influencer can click the "Overview" tab in the Project Modal to get a summary of the project deadlines.

const ProjectModalPageOneReview = ({
  description,
  reviewDeadline,
  deadline,
}) => {
  return (
    <>
      <div className="page">
        <div className="project-modal-page__group">
          <h4 className="project-modal-page__label">Description</h4>
          <p>{description}</p>
        </div>
        <div className="project-modal-page__group">
          <h4 className="project-modal-page__label">Review Deadline</h4>
          <p className="project-modal-page__value">
            {moment(reviewDeadline).format("MMMM Do YYYY, h:mm A")}
          </p>
        </div>
        <div className="project-modal-page__group">
          <h4 className="project-modal-page__label">Publish Deadline</h4>
          <p className="project-modal-page__value">
            {moment(deadline).format("MMMM Do YYYY, h:mm A")}
          </p>
        </div>
      </div>
    </>
  );
};

export default ProjectModalPageOneReview;
