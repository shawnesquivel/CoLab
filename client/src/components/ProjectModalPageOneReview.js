import React from "react";

import "../styles/createprojectmodal.scss";
import "../styles/dashboard.scss";
const moment = require("moment");

const ProjectModalPageOneReview = ({
  description,
  reviewDeadline,
  deadline,
}) => {
  return (
    <>
      <div className="project-modal-page__group">
        <h4 className="project-modal-page__label">Description</h4>
        {description ? (
          <>
            <p className="form__text">{description}</p>
          </>
        ) : (
          <p className="form__text form__text--description">
            Skillshare is an online learning community with thousands of online
            classes and members across 150 countries, who come together to find
            inspiration and take the next step in their creative journey.
          </p>
        )}
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
    </>
  );
};

export default ProjectModalPageOneReview;
