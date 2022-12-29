import {
  faInstagram,
  faTiktok,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const Tasks = ({
  instagramTask,
  instagramSubmission,
  tiktokTask,
  tiktokSubmission,
  youtubeTask,
  youtubeSubmission,
}) => {
  return (
    <>
      <div className="flex-col flex-col--gap">
        {instagramTask ? (
          <>
            <p className="mb-1">
              <FontAwesomeIcon icon={faInstagram} className="icon-left" />
              Instagram: {instagramTask}
            </p>
            {instagramSubmission ? (
              <img
                src={instagramSubmission}
                alt="instagram submission"
                className="project-modal__submission"
              />
            ) : (
              ""
            )}
          </>
        ) : (
          ""
        )}
        {tiktokTask ? (
          <>
            <p className="mb-1">
              <FontAwesomeIcon icon={faTiktok} className="icon-left" />
              TikTok: {tiktokTask}
            </p>
            {tiktokSubmission ? (
              <img
                src={tiktokSubmission}
                alt="tiktok submission"
                className="project-modal__submission"
              />
            ) : (
              ""
            )}
          </>
        ) : (
          ""
        )}
        {youtubeTask ? (
          <>
            <p className="mb-1">
              <FontAwesomeIcon icon={faYoutube} className="icon-left" />
              TikTok: {youtubeTask}
            </p>
            {youtubeSubmission ? (
              <img
                src={youtubeSubmission}
                alt="youtube submission"
                className="project-modal__submission"
              />
            ) : (
              ""
            )}
          </>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default Tasks;
