import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import {
  faInstagram,
  faTiktok,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";

const moment = require("moment");

const ProjectModalPageOneInProgress = ({
  reviewDeadline,
  deadline,
  tiktokTask,
  youtubeTask,
  instagramTask,
  status,
  handleSubmit,
}) => {
  // Page One - 2 - In Progress - Task Dropdowns
  const [showSubmitDraft, setShowSubmitDraft] = useState(false);
  const [showReviseDraft, setShowReviseDraft] = useState(false);

  const [instagramBtnTxt, setInstagramBtnTxt] = useState("Upload");
  const [tiktokBtnTxt, setTiktokBtnTxt] = useState("Upload");
  const [youtubeBtnTxt, setYoutubeBtnTxt] = useState("Upload");
  const [showUploadSuccess, setShowUploadSuccess] = useState(false);
  return (
    <>
      <div className="deadline-text-large">
        <h1 className="project-modal-title">Deadlines</h1>
        <p className="deadline-text-large">
          <span className=" bold-text">Draft Deadline Date:</span>
          <br />
          {moment(reviewDeadline).format("MMMM Do YYYY, h:mm:ss a")}
        </p>

        <p className="deadline-text-large">
          <span className="bold-text">Upload to Social Media Date:</span>
          <br />
          {moment(deadline).format("MMMM Do YYYY, h:mm:ss a")}
        </p>
      </div>
      {!showUploadSuccess && status !== "brand reviewing" ? (
        <div className="project-modal-container">
          <h1 className="project-modal-title">Tasks</h1>
          <div className="project-modal-guidelines-card">
            <div className="project-modal-tasks-card-header">
              <FontAwesomeIcon
                icon={faCircleExclamation}
                className="icon-highlight flex-item-one"
              />
              <div className="flex-item-two">
                <h4>Next Step: Submit Draft</h4>
                <p className="deadline-text">
                  By {moment(reviewDeadline).format("MMMM Do YYYY, h:mm:ss a")}
                </p>
              </div>
              <button
                type="button"
                className="project-modal-guidelines-btn flex-item-three"
                onClick={() => {
                  setShowSubmitDraft(!showSubmitDraft);
                }}
              >
                {showSubmitDraft ? (
                  <>
                    <FontAwesomeIcon icon={faAngleUp} />
                  </>
                ) : (
                  <>
                    <FontAwesomeIcon icon={faAngleDown} />
                  </>
                )}
              </button>
            </div>
            {showSubmitDraft ? (
              <div className="project-modal-tasks-expand-container">
                <div className="project-task">
                  <p className="project-card-text">
                    <FontAwesomeIcon icon={faInstagram} className="icon-left" />
                    {instagramTask} on Instagram
                  </p>
                  <button
                    type="button"
                    className={
                      instagramBtnTxt === "Submitted"
                        ? "project-task-upload-btn submit-btn"
                        : "project-task-upload-btn"
                    }
                    onClick={() => {
                      setInstagramBtnTxt("Submitted");
                    }}
                  >
                    {instagramBtnTxt}
                  </button>
                </div>
                <div className="project-task">
                  <p className="project-card-text">
                    <FontAwesomeIcon icon={faTiktok} className="icon-left" />
                    {tiktokTask} on Tik Tok
                  </p>
                  <button
                    type="button"
                    className={
                      tiktokBtnTxt === "Submitted"
                        ? "project-task-upload-btn submit-btn"
                        : "project-task-upload-btn"
                    }
                    onClick={() => {
                      setTiktokBtnTxt("Submitted");
                    }}
                  >
                    {tiktokBtnTxt}
                  </button>
                </div>
                <div className="project-task">
                  <p className="project-card-text">
                    <FontAwesomeIcon icon={faYoutube} className="icon-left" />
                    {youtubeTask} on YouTube
                  </p>
                  <button
                    type="button"
                    className={
                      youtubeBtnTxt === "Submitted"
                        ? "project-task-upload-btn submit-btn"
                        : "project-task-upload-btn"
                    }
                    onClick={() => {
                      setYoutubeBtnTxt("Submitted");
                    }}
                  >
                    {youtubeBtnTxt}
                  </button>
                </div>
                <button
                  className="btn-small submit-btn project-task-upload-btn"
                  style={{ margin: "0 auto", marginTop: "1rem" }}
                  onClick={(e) => {
                    handleSubmit("influencer submit draft", e);
                    setShowSubmitDraft(false);
                    setShowUploadSuccess(true);
                  }}
                >
                  Submit Draft
                </button>
              </div>
            ) : (
              " "
            )}
          </div>
        </div>
      ) : (
        ""
      )}

      {showUploadSuccess ? (
        <>
          <p>
            Successfully submitted draft. Please wait for the brand to review.
          </p>
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default ProjectModalPageOneInProgress;
