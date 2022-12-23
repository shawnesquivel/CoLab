import React, { useState } from "react";
import {
  faTimes,
  faPencil,
  faSquareMinus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../styles/projectmodal.scss";
import "../styles/createprojectmodal.scss";
import ToDoList from "./ToDoList";
import Tasks from "./Tasks";
const ProjectModalPageOneBrandReview = ({
  status,
  tiktokTask,
  instagramTask,
  youtubeTask,
  tiktokSubmission,
  instagramSubmission,
  youtubeSubmission,
  handleSubmit,
  onClose,
  numberOfRevisions,
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
      <div className="to-do">
        <div className="to-do-left">
          <ToDoList
            status={status}
            tiktokTask={tiktokTask}
            youtubeTask={youtubeTask}
            instagramTask={instagramTask}
          />
        </div>
        <div className="to-do-right">
          <p className="form__label">Review</p>

          <Tasks
            instagramSubmission={instagramSubmission}
            instagramTask={instagramTask}
            tiktokSubmission={tiktokSubmission}
            tiktokTask={tiktokTask}
            youtubeSubmission={youtubeSubmission}
            youtubeTask={youtubeTask}
          />

          {!showRejectProjectComment ? (
            <div className="flex-col-center mt-2">
              <button
                type="button"
                className="btn-cta btn-cta--transparent"
                onClick={(e) => {
                  setShowRejectProjectComment(true);
                }}
                // disabled for now
                disabled
              >
                Request Revision
              </button>
              <button
                type="button"
                className="btn-cta"
                onClick={(e) => {
                  handleSubmit("brand approves submission", e);
                  setReviewSuccess(true);
                  setReviewSuccessMsg("Project was approved");
                }}
              >
                Approve Submission
              </button>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
      {/* #todo: Add Request Revisions */}
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
      )}{" "}
    </>
  );
};

export default ProjectModalPageOneBrandReview;
