import React, { useState } from "react";
import {
  faInstagram,
  faTiktok,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import {
  faCheck,
  faTimes,
  faPencil,
  faSquareMinus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../styles/projectmodal.scss";
import "../styles/createprojectmodal.scss";

const ProjectModalPageOneBrandReview = ({
  tiktokTask,
  instagramTask,
  youtubeTask,
  tiktokSubmission,
  instagramSubmission,
  youtubeSubmission,
  handleSubmit,
  onClose,
}) => {
  // 3 - Brand Accept/Reject Submission

  const [showRejectProjectComment, setShowRejectProjectComment] =
    useState(false);
  const [rejectProjectcomment, setRejectProjectComment] = useState(
    "The YouTube video at 3min 40sec is missing the brand logo."
  );
  // Brand Reviews Project
  const [reviewSuccess, setReviewSuccess] = useState(false);
  const [reviewSuccessMsg, setReviewSuccessMsg] = useState(false);

  return (
    <>
      <p className="form__text form__text--subheader">
        Please review the submission(s)
      </p>
      {instagramTask ? (
        <>
          <p>
            <FontAwesomeIcon icon={faInstagram} className="icon-left" />
            Instagram: {instagramTask}
          </p>
          <img
            src={instagramSubmission}
            alt="instagram submission"
            className="project-modal__submission"
          />
        </>
      ) : (
        ""
      )}
      {tiktokTask ? (
        <>
          <p>
            <FontAwesomeIcon icon={faTiktok} className="icon-left" />
            TikTok: {tiktokTask}
          </p>

          <img
            src={tiktokSubmission}
            alt="tiktok submission"
            className="project-modal__submission"
          />
        </>
      ) : (
        ""
      )}
      {youtubeTask ? (
        <>
          <p>
            <FontAwesomeIcon icon={faYoutube} className="icon-left" />
            TikTok: {youtubeTask}
          </p>

          <img
            src={youtubeSubmission}
            alt="youtube submission"
            className="project-modal__submission"
          />
        </>
      ) : (
        ""
      )}

      {!showRejectProjectComment ? (
        <div className="btn-holder">
          <button
            type="button"
            className="form__btn-dotted form__btn-dotted--large"
            onClick={(e) => {
              handleSubmit("brand approves submission", e);
              setReviewSuccess(true);
              setReviewSuccessMsg("Project was approved");
            }}
          >
            <FontAwesomeIcon icon={faCheck} className="icon-left" />
            Approve Submission
          </button>
          <button
            type="button"
            className="form__btn-dotted form__btn-dotted--large"
            onClick={(e) => {
              setShowRejectProjectComment(true);
            }}
          >
            <FontAwesomeIcon icon={faTimes} className="icon-left" />
            Project Needs to be Updated
          </button>
        </div>
      ) : (
        ""
      )}

      {showRejectProjectComment ? (
        <form action="">
          <label htmlFor="comments">
            <h4>What needs to be changed?</h4>
          </label>
          <p>Please be as specific as possible!</p>
          <input
            type="text"
            value={rejectProjectcomment}
            onChange={(e) => setRejectProjectComment(e.target.value)}
          ></input>

          <button
            type="submit"
            className="btn-dark btn-page-five"
            onClick={(e) => {
              handleSubmit("brand requests changes to submission", e);
              setReviewSuccess(true);
              setReviewSuccessMsg(
                "Comments have been sent to influencer to change. Please wait for the influencer to re-submit the project."
              );
            }}
          >
            Request changes to submission
            <FontAwesomeIcon icon={faPencil} />
          </button>
        </form>
      ) : (
        ""
      )}

      {reviewSuccess ? (
        <>
          <p>{reviewSuccessMsg}</p>
          <button
            className="create-project__close-btn"
            onClick={onClose}
            type="button"
          >
            <FontAwesomeIcon icon={faSquareMinus} className="icon-left" />
            Close
          </button>
        </>
      ) : (
        " "
      )}
    </>
  );
};

export default ProjectModalPageOneBrandReview;
