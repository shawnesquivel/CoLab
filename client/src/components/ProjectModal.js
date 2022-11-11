import React, { useEffect, useState } from "react";
import {
  faCheck,
  faTimes,
  faPencil,
  faPlus,
  faAngleDown,
  faAngleUp,
  faArrowLeft,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactDOM from "react-dom";
import {
  faInstagram,
  faTiktok,
  faYoutube,
  faStripe,
  faPaypal,
} from "@fortawesome/free-brands-svg-icons";
import {
  faCircleExclamation,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import campaignPhoto from "../assets/cloudpaint.png";
import axios from "../api/axios";
import StripeContainer from "./StripeContainer";
import "../styles/projectmodal.scss";

const moment = require("moment");

const UPDATEPROJECT_URL = "/api/updateproject";

const MODAL_STYLES = {
  position: "fixed",
  top: "50%",
  right: "0%",
  transform: "translate(0%, -50%)",
  backgroundColor: "#fefcfb",
  padding: "30px",
  zIndex: 1000,
};
const OVERLAY_STYLES = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, .7)",
  zIndex: 1000,
};
const ProjectModal = ({
  isOpen,
  children,
  onClose,
  projectModal,
  role,
  project,
}) => {
  useEffect(() => {
    console.log(project);
  }, []);

  const [status, setStatus] = useState(project.status);
  const [showAddComment, setShowAddComment] = useState(false);
  const [comment, setComment] = useState("");
  // Pages
  const [showPageOne, setShowPageOne] = useState(true); //overview
  const [showPageTwo, setShowPageTwo] = useState(false); // products
  const [showPageThree, setShowPageThree] = useState(false); // contract
  const [showPageFour, setShowPageFour] = useState(false); // calendar
  const [showPageFive, setShowPageFive] = useState(false); // success page

  // Page One - 2 - In Progress - Task Dropdowns
  const [showSubmitDraft, setShowSubmitDraft] = useState(false);
  const [showReviseDraft, setShowReviseDraft] = useState(false);

  const [instagramBtnTxt, setInstagramBtnTxt] = useState("Upload");
  const [tiktokBtnTxt, setTiktokBtnTxt] = useState("Upload");
  const [youtubeBtnTxt, setYoutubeBtnTxt] = useState("Upload");
  // 2 -  Influencer Upload
  const [showUploadSuccess, setShowUploadSuccess] = useState(false);
  // 3 - Brand Accept/Reject Submission
  const [showRejectProjectComment, setShowRejectProjectComment] =
    useState(false);
  const [rejectProjectcomment, setRejectProjectComment] = useState(
    "The YouTube video at 3min 40sec is missing the brand logo."
  );
  // Brand Reviews Project
  const [reviewSuccess, setReviewSuccess] = useState(false);
  const [reviewSuccessMsg, setReviewSuccessMsg] = useState(false);
  // Influencer has posted deliverables
  const [postedContentSuccess, setPostedContentSuccess] = useState(false);

  // Page Four - Review Contract - Guideline Dropdowns
  const [showHashtags, setShowHashtags] = useState(false);
  const [showTags, setShowTags] = useState(false);
  const [showPhrases, setShowPhrases] = useState(false);
  const [showLinkInBio, setShowLinkInBio] = useState(false);

  // Page Five - Accept Project
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  // Show Stripe Button
  const [showStripe, setShowStripe] = useState(false);
  const [showProjectComments, setShowProjectComments] = useState(false);

  //  Attached to each button - will change the project status
  const handleSubmit = async (action, e) => {
    e.preventDefault();
    // Step 1A / 1B - Influencer accepts or rejects contract
    if (action === "accept" || action === "reject") {
      try {
        const payload = JSON.stringify({
          token: localStorage.getItem("token"),
          action,
          comment,
          project,
        });

        const response = await axios.post(UPDATEPROJECT_URL, payload, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });
      } catch (err) {
        console.log(err);
      }
    }

    // Step 1C - Influencer wants to modify the contract => Step 0
    if (action === "modify") {
      console.log("User wants to Modify Contract:", comment);
    }
    console.log("Action:", action);

    // Step 2 - Influencer submits their draft of the project => Step 3
    if (action === "influencer submit draft") {
      try {
        console.log("inside submit draft try block");
        const payload = JSON.stringify({
          token: localStorage.getItem("token"),
          action,
          project,
        });

        const response = await axios.post(UPDATEPROJECT_URL, payload, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });
      } catch (err) {
        console.log(err);
      }
    }
    // Step 3A - Brand reviewed project and approves of the submission => Move to Step 4
    if (action === "brand approves submission") {
      try {
        const payload = JSON.stringify({
          token: localStorage.getItem("token"),
          action,
          project,
        });

        const response = await axios.post(UPDATEPROJECT_URL, payload, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });
      } catch (err) {
        console.log(err);
      }
    }
    // Step 3B - Brand reviewed project and rejects submission => Return to step 2
    if (action === "brand requests changes to submission") {
      try {
        console.log("brand requests changes");
        const payload = JSON.stringify({
          token: localStorage.getItem("token"),
          action,
          comment: rejectProjectcomment,
          project,
        });

        const response = await axios.post(UPDATEPROJECT_URL, payload, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });
      } catch (err) {
        console.log(err);
      }
    }
    // Step 4 - Influencer posts content to social media
    if (action === "influencer posted content") {
      try {
        const payload = JSON.stringify({
          token: localStorage.getItem("token"),
          action,
          project,
        });
        console.log(
          "Influencer has uploaded the content to social media",
          payload
        );
        const response = await axios.post(UPDATEPROJECT_URL, payload, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });
      } catch (err) {
        console.log(err);
      }
    }
  };

  // To Do: Include the functionality for the user to upload deliverables

  if (!isOpen) return null;
  return ReactDOM.createPortal(
    // #to-do: switch from in-line style to className style
    <div style={OVERLAY_STYLES} className="overlay-modal">
      <div style={MODAL_STYLES} className="project-modal">
        <div className="flex-row">
          <h1 style={{ color: "black" }}>
            {project.company}: {project.title}
          </h1>
          <button onClick={onClose} className="btn-light btn-close-project">
            Close Project <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>

        {showPageFive ? (
          ""
        ) : (
          <div className="project-modal-navbar">
            <h3
              className={
                showPageOne
                  ? "project-modal-page-highlight"
                  : "project-modal-page-greyed"
              }
            >
              Overview
            </h3>
            <h3
              className={
                showPageTwo
                  ? "project-modal-page-highlight"
                  : "project-modal-page-greyed"
              }
            >
              Payment/Products
            </h3>
            <h3
              className={
                showPageThree
                  ? "project-modal-page-highlight"
                  : "project-modal-page-greyed"
              }
            >
              Campaign
            </h3>
            <h3
              className={
                showPageFour
                  ? "project-modal-page-highlight"
                  : "project-modal-page-greyed"
              }
            >
              Guidelines
            </h3>
          </div>
        )}

        {showPageOne ? (
          <>
            <section className="project-modal-page">
              <img
                className="project-modal-campaign-photo"
                src={campaignPhoto}
                alt="Campaign Product"
              />
              {project.status === "Reviewing Contract" ? (
                <>
                  <h1 className="project-modal-title">Campaign Description</h1>
                  <p>
                    Skillshare is an online learning community with thousands of
                    online classes and members across 150 countries, who come
                    together to find inspiration and take the next step in their
                    creative journey.
                  </p>
                  <h1 className="project-modal-title">Required Steps</h1>
                  <div className="project-modal-card">
                    <FontAwesomeIcon icon={faCircleExclamation} />
                    <div>
                      <h2>Select Products</h2>
                      <p>
                        0/2 Products Selected{" "}
                        <span style={{ fontWeight: "bold", color: "red" }}>
                          {" "}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="project-modal-card">
                    <FontAwesomeIcon icon={faCircleExclamation} />
                    <div>
                      <h2>Read Contracts</h2>
                      <p>
                        <FontAwesomeIcon
                          icon={faInstagram}
                          className="icon-left"
                        />
                        {project.instagramTask}
                      </p>
                      <p>
                        <FontAwesomeIcon
                          icon={faTiktok}
                          className="icon-left"
                        />
                        {project.tiktokTask}
                      </p>
                      <p>
                        <FontAwesomeIcon
                          icon={faYoutube}
                          className="icon-left"
                        />
                        {project.youtubeTask}
                      </p>
                    </div>
                  </div>
                  <div className="project-modal-card">
                    <FontAwesomeIcon icon={faCircleExclamation} />
                    <div>
                      <h2>Read Content Guideline</h2>
                      <p>Include the required hashtags, tags, and phrases.</p>
                    </div>
                  </div>
                </>
              ) : (
                ""
              )}

              {project.status === "in progress/waiting for submission" &&
              role.includes(2000) ? (
                <>
                  <div className="deadline-text-large">
                    <h1 className="project-modal-title">Deadlines</h1>
                    <p className="deadline-text-large">
                      <span className=" bold-text">Draft Deadline Date:</span>
                      <br />
                      {moment(project.reviewDeadline).format(
                        "MMMM Do YYYY, h:mm:ss a"
                      )}
                    </p>

                    <p className="deadline-text-large">
                      <span className="bold-text">
                        Upload to Social Media Date:
                      </span>
                      <br />
                      {moment(project.deadline).format(
                        "MMMM Do YYYY, h:mm:ss a"
                      )}
                    </p>
                  </div>
                  {!showUploadSuccess &&
                  project.status !== "brand reviewing" ? (
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
                              By{" "}
                              {moment(project.reviewDeadline).format(
                                "MMMM Do YYYY, h:mm:ss a"
                              )}
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
                                <FontAwesomeIcon
                                  icon={faInstagram}
                                  className="icon-left"
                                />
                                {project.instagramDeliverable.task} on Instagram
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
                                <FontAwesomeIcon
                                  icon={faTiktok}
                                  className="icon-left"
                                />
                                {project.tiktokDeliverable.task} on Tik Tok
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
                                <FontAwesomeIcon
                                  icon={faYoutube}
                                  className="icon-left"
                                />
                                {project.youtubeDeliverable.task} on YouTube
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
                        Successfully submitted draft. Please wait for the brand
                        to review.
                      </p>
                    </>
                  ) : (
                    ""
                  )}
                </>
              ) : (
                ""
              )}

              {/* SUMMARY PAGE FOR INFLUENCERS: Brand is reviewing the project OR Influencer is ready to publish the content OR Influencer is awaiting Payment*/}
              {role.includes(2000) &&
              (project.status === "brand reviewing" ||
                project.status.toLowerCase() === "ready to publish" ||
                project.status === "awaiting project payment") ? (
                <>
                  <h3>
                    {project.status === "ready to publish"
                      ? "You're all set to post your content!"
                      : ""}
                    {project.status === "awaiting project payment"
                      ? "You have uploaded your deliverables to social media."
                      : ""}
                  </h3>
                  <p>
                    {project.status === "brand reviewing"
                      ? "Thank you for submitting your draft. Please give the brand some time to review."
                      : ""}
                    {project.status.toLowerCase() === "ready to publish"
                      ? `${project.company} has approved your submission. Please post your content before the deadline time. Be sure to include any required hashtags as per the Guidelines page!`
                      : ""}
                    {/* If the content has been posted and the influencer is waiting to be paid */}
                    {project.status === "awaiting project payment"
                      ? `Thank you for submitting your project.
                          ${project.company} has been notified of your
                          submission, and upon their confirmation, your payment
                          will be transferred as per the contract.`
                      : ""}
                  </p>

                  <p>
                    <FontAwesomeIcon icon={faInstagram} className="icon-left" />
                    1. {project.instagramSubmission} on Instagram.
                  </p>
                  <p>
                    <FontAwesomeIcon icon={faTiktok} className="icon-left" />
                    2. {project.tiktokSubmission} on Tik Tok.
                  </p>
                  <p>
                    <FontAwesomeIcon icon={faYoutube} className="icon-left" />
                    3. {project.youtubeSubmission} on YouTube.
                  </p>
                  {/* Deadline */}
                  <h3>
                    {project.status.toLowerCase() === "ready to publish"
                      ? `Deadline: ${moment(project.reviewDeadline).format(
                          "MMMM Do YYYY, h:mm:ss a"
                        )}`
                      : ""}
                  </h3>
                  {/* Influncer: Notify the brand that you have published the deliverables */}
                  {role.includes(2000) &&
                  project.status.toLowerCase() === "ready to publish" &&
                  !postedContentSuccess ? (
                    <button
                      type="button"
                      className="btn-dark btn-page-five"
                      onClick={(e) => {
                        handleSubmit("influencer posted content", e);
                        setPostedContentSuccess(true);
                      }}
                    >
                      I have uploaded my deliverables
                    </button>
                  ) : (
                    ""
                  )}
                  {postedContentSuccess ? (
                    <p>
                      Thank you for posting your content! The brand has been
                      notified.
                    </p>
                  ) : (
                    ""
                  )}
                </>
              ) : (
                ""
              )}
              {/* Brand is reviewing the project */}
              {role.includes(3000) && project.status === "brand reviewing" ? (
                <>
                  <p>Please review the submission.</p>
                  <p>
                    <FontAwesomeIcon icon={faInstagram} className="icon-left" />
                    1. {project.instagramSubmission} on Instagram.
                  </p>
                  <p>
                    <FontAwesomeIcon icon={faTiktok} className="icon-left" />
                    2. {project.tiktokSubmission} on Tik Tok.
                  </p>
                  <p>
                    <FontAwesomeIcon icon={faYoutube} className="icon-left" />
                    3. {project.youtubeSubmission} on YouTube.
                  </p>
                  {!showRejectProjectComment ? (
                    <div className="btn-holder">
                      <button
                        type="button"
                        className="btn-dark btn-page-five"
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
                        className="btn-dark btn-page-five"
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
                        onChange={(e) =>
                          setRejectProjectComment(e.target.value)
                        }
                      ></input>

                      <button
                        type="submit"
                        className="btn-dark btn-page-five"
                        onClick={(e) => {
                          handleSubmit(
                            "brand requests changes to submission",
                            e
                          );
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
                    </>
                  ) : (
                    " "
                  )}
                </>
              ) : (
                ""
              )}

              {/* Brand is paying  */}
              {role.includes(3000) &&
              project.status === "awaiting project payment" ? (
                <>
                  <h3>The influencer has submitted their deliverables.</h3>
                  <p>
                    Please pay the influencer as per the contract guidelines by
                    the agreed payment method.
                  </p>
                  <h4>Project Submission Details</h4>
                  <p>
                    <FontAwesomeIcon icon={faInstagram} className="icon-left" />
                    1. {project.instagramSubmission} on Instagram.
                  </p>
                  <p>
                    <FontAwesomeIcon icon={faTiktok} className="icon-left" />
                    2. {project.tiktokSubmission} on Tik Tok.
                  </p>
                  <p>
                    <FontAwesomeIcon icon={faYoutube} className="icon-left" />
                    3. {project.youtubeSubmission} on YouTube.
                  </p>
                  <h3>Select your Payment Method</h3>
                  <h4>Project Price: ${project.paymentPrice} CAD</h4>
                  <div className="btn-holder">
                    <button
                      className="btn-small btn-dark reset-margin-top"
                      onClick={() => {
                        setShowStripe(!showStripe);
                      }}
                    >
                      <FontAwesomeIcon
                        icon={faStripe}
                        className="icon-right"
                        style={{ fontSize: "1.2rem", padding: "" }}
                      />
                    </button>
                    <a
                      href="https://paypal.com"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <button className="btn-small btn-dark reset-margin-top">
                        <FontAwesomeIcon
                          style={{ fontSize: "0.8rem" }}
                          icon={faPaypal}
                          className="icon-left"
                        />
                        Paypal
                      </button>
                    </a>
                  </div>
                  {showStripe ? <StripeContainer project={project} /> : ""}
                </>
              ) : (
                ""
              )}
            </section>
            {/* Show Comments - Always Active */}
            <button
              onClick={() => {
                setShowProjectComments(!showProjectComments);
              }}
              className="btn-dark btn-small"
            >
              {!showProjectComments ? "Show Comments" : "Hide Comments"}
            </button>
            {project.commentList && showProjectComments ? (
              <div className="comment-list">
                <h3 className="comment-list__header">Recent Activity</h3>
                {/* Reverse the comment array (to get newest first) and display  */}
                {[...project.commentList].reverse().map((comment) => {
                  const commentArr = comment.split("m: ");
                  const date = commentArr[0] + "m";
                  const commentOne = commentArr[1];
                  const commentTwo = commentArr[2];
                  return (
                    <div className="comment-list__comment">
                      <p className="bold">{date}</p>
                      <p>{commentOne}</p>
                      <br />
                      {commentTwo ? <p>{commentTwo}</p> : ""}
                    </div>
                  );
                })}
              </div>
            ) : (
              ""
            )}

            <div className="div-center">
              <button
                className="btn-light btn-small"
                type="button"
                onClick={() => {
                  setShowPageOne(false);
                  setShowPageTwo(true);
                }}
              >
                Continue <FontAwesomeIcon icon={faArrowRight} />
              </button>
            </div>
          </>
        ) : (
          ""
        )}

        {showPageTwo ? (
          <section className="project-modal-page">
            <h1 className="project-modal-title">
              {project.status === "Reviewing Contract"
                ? "Select Products"
                : "Shipped Products"}
            </h1>
            {project.status === "Reviewing Contract" ? (
              <div className="project-modal-add-product">
                <FontAwesomeIcon icon={faPlus} />
                Add Product
              </div>
            ) : (
              ""
            )}
            <div className="project-modal-card">
              <img
                className="project-modal-product-photo"
                src={campaignPhoto}
                alt="Product"
              />
              <div>
                <h2>Cloud Paint</h2>
                <p>Dawn</p>
                {project.status === "Reviewing Contract" ? (
                  <p>
                    <FontAwesomeIcon icon={faTrashCan} className="icon-left" />
                    Remove
                  </p>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div>
              <h1 className="project-modal-title">Payment Details</h1>
              <p className="deadline-text-large">
                <span className="bold-text">Project Payment: </span>$
                {project.paymentPrice}
              </p>
              <p className="deadline-text-large">
                <span className="bold-text">Payment Method: </span>
                {project.paymentMethod === "wire transfer"
                  ? "You will be paid via secure wire transfer"
                  : ""}
              </p>
            </div>
            {!showSuccess ? (
              <div className="btn-holder">
                <button
                  className="btn-light btn-small"
                  type="button"
                  onClick={() => {
                    setShowPageTwo(false);
                    setShowPageOne(true);
                  }}
                >
                  <FontAwesomeIcon icon={faArrowLeft} /> Go Back
                </button>
                <button
                  className="btn-light btn-small"
                  type="button"
                  onClick={() => {
                    setShowPageTwo(false);
                    setShowPageThree(true);
                  }}
                >
                  Continue <FontAwesomeIcon icon={faArrowRight} />
                </button>
              </div>
            ) : (
              <p>Success!</p>
            )}
          </section>
        ) : (
          ""
        )}
        {showPageThree ? (
          <section className="project-modal-page">
            <h1 className="project-modal-title">
              {project.status === "Reviewing Contract"
                ? "Contract"
                : "You agreed to:"}
            </h1>
            <p>
              The creator will provide the following in accordance to the
              content guidelines:
            </p>
            <p>
              <FontAwesomeIcon icon={faInstagram} className="icon-left" />
              1. {project.instagramDeliverable.task} on Instagram.
            </p>
            <p>
              <FontAwesomeIcon icon={faTiktok} className="icon-left" />
              2. {project.tiktokDeliverable.task} on Tik Tok.
            </p>
            <p>
              <FontAwesomeIcon icon={faYoutube} className="icon-left" />
              3. {project.youtubeDeliverable.task} on YouTube.
            </p>
            <p>
              The creator must upload all content on CoLab by{" "}
              {project.reviewDeadline} for review by the brand (
              {project.company}). The contract will include up to{" "}
              {project.numberOfRevisions} revisions if necessary. All content
              must be uploaded by {project.deadline} after the Creator receives
              approval from the brand.
            </p>

            <p>
              The Creator grants the Brand a worldwide, irrevocable,
              royalty-free, fully paid-up, transferrable, sub-licensable, and
              perpetual right and license to reproduce, publish, distribute,
              display, repost, share and edit all Creator created for or on
              behalf of the Brand in any and all media now known or developed in
              the future. The Creator accepts the terms of the foregoing
              proposal and agree to the Privacy Policy and Terms & Conditions.
            </p>
            <div className="btn-holder">
              <button
                type="button"
                className="btn-light btn-small"
                onClick={() => {
                  setShowPageThree(false);
                  setShowPageTwo(true);
                }}
              >
                <FontAwesomeIcon icon={faArrowLeft} /> Go Back
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowPageThree(false);
                  setShowPageFour(true);
                }}
                className="btn-dark btn-small"
              >
                {role.includes(2000) && project.status === "Reviewing Contract"
                  ? "I agree to the terms."
                  : "View Guidelines"}
              </button>
            </div>
          </section>
        ) : (
          ""
        )}
        {showPageFour ? (
          <section className="project-modal-page">
            <h1 className="project-modal-title">Examples</h1>
            <div className="project-modal-examples-container">
              <div className="project-modal-example">
                <img src={campaignPhoto} alt="" className="img-rounded" />
                <p>Feed Post</p>
              </div>
              <div className="project-modal-example">
                <img src={campaignPhoto} alt="" className="img-rounded" />
                <p>Stories</p>
              </div>
              <div className="project-modal-example">
                <img src={campaignPhoto} alt="" className="img-rounded" />
                <p>YouTube Videos</p>
              </div>
              <div className="project-modal-example">
                <img src={campaignPhoto} alt="" className="img-rounded" />
                <p>Tik Toks</p>
              </div>
            </div>
            <div className="project-modal-container">
              <div className="project-modal-guidelines-card">
                <div className="project-modal-guidelines-card-header">
                  <h4>Hashtags</h4>
                  <button
                    type="button"
                    className="project-modal-guidelines-btn"
                    onClick={() => {
                      setShowHashtags(!showHashtags);
                    }}
                  >
                    {showHashtags ? (
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
                {showHashtags ? (
                  <div className="keywords-container">
                    {project.hashtags.map((hashtag, index) => (
                      <div className="keywords-item" key={index}>
                        <span className="keywords-text">{hashtag}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  " "
                )}
              </div>
              <div className="project-modal-guidelines-card">
                <div className="project-modal-guidelines-card-header">
                  <h4>Tags</h4>
                  <button
                    type="button"
                    className="project-modal-guidelines-btn"
                    onClick={() => {
                      setShowTags(!showTags);
                    }}
                  >
                    {showTags ? (
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
                {showTags ? (
                  <div className="keywords-container">
                    {project.tags.map((hashtag, index) => (
                      <div className="keywords-item" key={index}>
                        <span className="keywords-text">{hashtag}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  " "
                )}
              </div>
              <div className="project-modal-guidelines-card">
                <div className="project-modal-guidelines-card-header">
                  <h4>Phrases</h4>
                  <button
                    type="button"
                    className="project-modal-guidelines-btn"
                    onClick={() => {
                      setShowPhrases(!showPhrases);
                    }}
                  >
                    {showPhrases ? (
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
                {showPhrases ? (
                  <div className="keywords-container">
                    {project.phrases.map((phrase, index) => (
                      <div className="keywords-item" key={index}>
                        <span className="keywords-text">{phrase}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  " "
                )}
              </div>
              <div className="project-modal-guidelines-card">
                <div className="project-modal-guidelines-card-header">
                  <h4>Link In Bio</h4>
                  <button
                    type="button"
                    className="project-modal-guidelines-btn"
                    onClick={() => {
                      setShowLinkInBio(!showLinkInBio);
                    }}
                  >
                    {showLinkInBio ? (
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
                {showLinkInBio ? (
                  <div className="keywords-container">
                    <div className="keywords-item">
                      <span className="keywords-text">{project.linkInBio}</span>
                    </div>
                  </div>
                ) : (
                  " "
                )}
              </div>
            </div>

            <div className="btn-holder">
              <button
                type="button"
                className="btn-light btn-small"
                onClick={() => {
                  setShowPageThree(true);
                  setShowPageFour(false);
                }}
              >
                <FontAwesomeIcon icon={faArrowLeft} /> Go Back
              </button>

              {role.includes(2000) &&
              project.status === "Reviewing Contract" ? (
                <button
                  type="button"
                  onClick={() => {
                    setShowPageFour(false);
                    setShowPageFive(true);
                  }}
                  className="btn-dark btn-small"
                >
                  Finish Reviewing <FontAwesomeIcon icon={faCheck} />
                </button>
              ) : (
                ""
              )}
            </div>
          </section>
        ) : (
          ""
        )}

        {showPageFive &&
        project.status === "Reviewing Contract" &&
        role.includes(2000) ? (
          <div className="project-modal-title">
            {" "}
            {!showSuccess ? (
              <>
                <h2 className="project-modal-title">
                  "Thanks for reviewing the project!"
                </h2>
                <p>
                  Thank you for reviewing the contract. Do you accept the terms
                  and conditions?
                </p>
                <p>How would you like to proceed?</p>
              </>
            ) : (
              successMsg
            )}
            <form action="">
              {!showSuccess ? (
                <div className="btn-holder">
                  <button
                    type="button"
                    onClick={() => {
                      setShowPageFive(false);
                      setShowPageFour(true);
                    }}
                    className="btn-light btn-page-five"
                  >
                    <FontAwesomeIcon icon={faArrowLeft} /> Go Back
                  </button>
                  <button
                    type="button"
                    className="btn-dark btn-page-five"
                    onClick={(e) => {
                      handleSubmit("accept", e);
                      setShowSuccess(true);
                      setSuccessMsg("You accepted the project!");
                    }}
                  >
                    <FontAwesomeIcon icon={faCheck} className="icon-left" />
                    Accept Project
                  </button>
                  <button
                    type="button"
                    className="btn-dark btn-page-five"
                    onClick={(e) => {
                      handleSubmit("reject", e);
                      setShowSuccess(true);
                      setSuccessMsg(
                        'You rejected the project. Go to the "Upcoming Collabs" to look for other projects!'
                      );
                    }}
                  >
                    <FontAwesomeIcon icon={faTimes} className="icon-left" />
                    Reject Project
                  </button>
                  <button
                    type="button"
                    className="btn-dark btn-page-five"
                    onClick={() => {
                      setShowAddComment(true);
                    }}
                  >
                    <FontAwesomeIcon icon={faPencil} className="icon-left" />
                    Modify Contract
                  </button>
                </div>
              ) : (
                ""
              )}
            </form>
            {showAddComment ? (
              <form action="">
                <label htmlFor="comments">Add a new comment</label>
                <p>E.g., request new deadline date, increase payment price</p>
                <input
                  type="text"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                ></input>

                <button
                  type="submit"
                  className="btn-light"
                  onClick={(e) => handleSubmit("modify", e)}
                >
                  Submit modifications to proposal{" "}
                  <FontAwesomeIcon icon={faPencil} />
                </button>
              </form>
            ) : (
              ""
            )}
          </div>
        ) : (
          ""
        )}
      </div>
    </div>,
    document.getElementById("portal")
  );
};

export default ProjectModal;
