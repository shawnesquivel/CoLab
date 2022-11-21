import React from "react";
import {
  faInstagram,
  faTiktok,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ProjectModalPageTwo = ({ instagramTask, tiktokTask, youtubeTask }) => {
  return (
    <>
      {instagramTask ? (
        <>
          <div className="project-modal-page__group">
            <h4 className="project-modal-page__label">
              <FontAwesomeIcon icon={faInstagram} className="icon-left" />
              Instagram
            </h4>
            <p className="project-modal-page__value">{instagramTask}</p>
          </div>
        </>
      ) : (
        ""
      )}
      {tiktokTask ? (
        <>
          <div className="project-modal-page__group">
            <h4 className="project-modal-page__label">
              <FontAwesomeIcon icon={faTiktok} className="icon-left" />
              Tik Tok
            </h4>
            <p className="project-modal-page__value">{tiktokTask}</p>
          </div>
        </>
      ) : (
        ""
      )}
      {youtubeTask ? (
        <>
          <div className="project-modal-page__group">
            <h4 className="project-modal-page__label">
              <FontAwesomeIcon icon={faYoutube} className="icon-left" />
              Youtube
            </h4>
            <p className="project-modal-page__value">{youtubeTask}</p>
          </div>
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default ProjectModalPageTwo;
