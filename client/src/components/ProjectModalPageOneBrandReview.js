import React, { useState } from "react";
import { faPencil, faSquareMinus } from "@fortawesome/free-solid-svg-icons";
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
          {!showRejectProjectComment && !reviewSuccess ? (
            <div className="btn-container btn-container--gap mt-2">
              <button
                type="button"
                className="btn-cta btn-cta--transparent btn-cta--small"
                onClick={(e) => {
                  setShowRejectProjectComment(true);
                }}
                // #todo: enable this once restyled
                disabled
              >
                Request Revision
              </button>
              <button
                type="button"
                className="btn-cta btn-cta--small"
                onClick={(e) => {
                  handleSubmit("brand approves submission", e);
                  setReviewSuccess(true);
                  setReviewSuccessMsg(
                    "✅ The submission was approved! The influencer has been notified."
                  );
                }}
              >
                Approve Post
              </button>
            </div>
          ) : (
            ""
          )}
          {reviewSuccess ? (
            <div className="flex-col-center">
              <p className="mt-2">{reviewSuccessMsg}</p>
              <button
                className="btn-cta mt-1p5"
                onClick={onClose}
                type="button"
              >
                <FontAwesomeIcon icon={faSquareMinus} className="icon-left" />
                Close
              </button>
            </div>
          ) : (
            " "
          )}{" "}
        </div>
      </div>
      {/* #todo: restyling */}
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
    </>
  );
};

export default ProjectModalPageOneBrandReview;
