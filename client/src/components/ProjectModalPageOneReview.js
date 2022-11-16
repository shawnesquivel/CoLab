import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import {
  faInstagram,
  faTiktok,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";

import "../styles/createprojectmodal.scss";
import "../styles/dashboard.scss";

const ProjectModalPageOneReview = ({
  description,
  instagramTask,
  youtubeTask,
  tiktokTask,
  instagramSubmission,
  youtubeSubmission,
  tiktokSubmission,
}) => {
  return (
    <>
      <h4 className="form__text form__text--subheader">Campaign Description</h4>
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
      <h4 className="form__text form__text--subheader">Required Steps</h4>
      <div className="project-modal-card">
        <FontAwesomeIcon icon={faCircleExclamation} />
        <div>
          <h2 className="form__text form__text--subheader">Products</h2>
          <p className="form__text">Review the products to be sent</p>
        </div>
      </div>
      <div className="project-modal-card">
        <FontAwesomeIcon icon={faCircleExclamation} />
        <div>
          <h2 className="form__text form__text--subheader">Read Contracts</h2>
          {instagramTask ? (
            <p className="form__text">
              <FontAwesomeIcon icon={faInstagram} className="icon-left" />
              {instagramTask}
            </p>
          ) : (
            " "
          )}

          {tiktokTask ? (
            <p className="form__text">
              <FontAwesomeIcon icon={faTiktok} className="icon-left" />
              {tiktokTask}
            </p>
          ) : (
            ""
          )}
          {youtubeTask ? (
            <p className="form__text">
              <FontAwesomeIcon icon={faYoutube} className="icon-left" />
              {youtubeTask}
            </p>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="project-modal-card">
        <FontAwesomeIcon icon={faCircleExclamation} />
        <div>
          <h2 className="form__text form__text--subheader">
            Read Content Guideline
          </h2>
          <p className="form__text">
            Include the required hashtags, tags, and phrases.
          </p>
        </div>
      </div>
    </>
  );
};

export default ProjectModalPageOneReview;
