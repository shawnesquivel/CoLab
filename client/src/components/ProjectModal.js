import React, { useEffect, useState } from "react";
import {
  faCheck,
  faTimes,
  faPencil,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactDOM from "react-dom";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";

import axios from "../api/axios";
import StripeContainer from "./StripeContainer";
import "../styles/projectmodal.scss";
import "../styles/createprojectmodal.scss";

import ProjectModalPageOneReview from "./ProjectModalPageOneReview";
import ProjectModalPageOneInProgress from "./ProjectModalPageOneInProgress";
import ProjectModalPageOneSubmitted from "./ProjectModalPageOneSubmitted";
import ProjectModalPageTwo from "./ProjectModalPageTwo";
import ProjectModalPageThree from "./ProjectModalPageThree";
import ProjectModalPageFour from "./ProjectModalPageFour";
import ProjectModalPageOneBrandReview from "./ProjectModalPageOneBrandReview";
import holidayBackground from "../assets/holiday-background.png";
import ProjectModalAccept from "./ProjectModalAccept";

const UPDATEPROJECT_URL = "/api/updateproject";

const MODAL_STYLES = {
  position: "fixed",
  top: "50%",
  right: "0%",
  transform: "translate(0%, -50%)",
  backgroundColor: "#fefcfb",
  zIndex: 1000,
};

const ProjectModal = ({
  isOpen,
  children,
  onClose,
  projectModal,
  role,
  project,
  OVERLAY_STYLES,
  user,
  refreshDashboard,
}) => {
  const [showAddComment, setShowAddComment] = useState(false);
  const [comment, setComment] = useState("");
  // Pages
  const [showPageOne, setShowPageOne] = useState(true); //overview
  const [showPageTwo, setShowPageTwo] = useState(false); // products
  const [showPageThree, setShowPageThree] = useState(false); // contract
  const [showPageFour, setShowPageFour] = useState(false); // calendar
  const [showPageFive, setShowPageFive] = useState(false); // success page
  const [showProgress, setShowProgress] = useState(false);
  // Page Five - Accept Project
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  // Show Stripe Button
  const [showStripe, setShowStripe] = useState(false);
  const [showProjectComments, setShowProjectComments] = useState(false);

  const data = {
    id: project._id,
    status: project.status,
    title: project.title,
    description: project.description,
    influencerAssigned: project.influencerAssigned,
    reviewDeadline: project.reviewDeadline,
    instagramTask: project.instagramTask,
    tiktokTask: project.tiktokTask,
    youtubeTask: project.youtubeTask,
    instagramExample: project.instagramExample,
    tiktokExample: project.tiktokExample,
    youtubeExample: project.youtubeExample,
    instagramSubmission: project.instagramSubmission,
    tiktokSubmission: project.tiktokSubmission,
    youtubeSubmission: project.youtubeSubmission,
    deadlineTime: project.deadlineTime,
    numberOfRevisions: project.numberOfRevisions,
    paymentMethod: project.paymentMethod,
    paymentPrice: project.paymentPrice,
    paymentProduct: project.paymentProduct,
    keywords: project.keywords,
    hashtags: project.hashtags,
    tags: project.tags,
    phrases: project.phrases,
    linkInBio: project.linkInBio,
    role: role,
  };

  useEffect(() => {
    console.log("project:", project);
    console.log("user:", user);
  }, []);
  //  Attached to each button - will change the project status
  const handleSubmit = async (action, e) => {
    e.preventDefault();
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
        refreshDashboard();
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
        refreshDashboard();
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
          comment: "Project was rejected",
          project,
        });

        const response = await axios.post(UPDATEPROJECT_URL, payload, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });
        refreshDashboard();
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
        refreshDashboard();
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleSubmitReviewContract = async (action, e) => {
    e.preventDefault();
    // Step 1A / 1B - Influencer accepts or rejects contract
    if (action === "accept" || action === "reject") {
      try {
        const payload = JSON.stringify({
          token: localStorage.getItem("token"),
          action,
          comment,
          project,
          user: user,
        });

        const response = await axios.post(UPDATEPROJECT_URL, payload, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });
        refreshDashboard();

        console.log("Project was accepted/rejected", response);
      } catch (err) {
        console.log(err);
      }
    }

    // Step 1C - Influencer wants to modify the contract => Step 0
    if (action === "modify") {
      console.log("User wants to Modify Contract:", comment);
    }
    console.log("Action:", action);
  };

  const getPaymentMethodText = (paymentMethod) => {
    console.log(paymentMethod);
    if (paymentMethod === "payment and product") {
      return "💰🎁 Payment + Gift";
    }
    if (paymentMethod === "payment only") {
      return "💰 Payment";
    }
    if (paymentMethod === "payment and product") {
      return "🎁 Gifted";
    }

    return paymentMethod;
  };

  const showPage = (page) => {
    if (![0, 1, 2, 3, 4, 5].includes(page)) {
      console.log("what!");
      return;
    }

    setShowProgress(false);
    setShowPageOne(false);
    setShowPageTwo(false);
    setShowPageThree(false);
    setShowPageFour(false);
    setShowPageFive(false);

    if (page === 0) {
      setShowProgress(true);
    }
    if (page === 1) {
      setShowPageOne(true);
    }
    if (page === 2) {
      setShowPageTwo(true);
    }
    if (page === 3) {
      setShowPageThree(true);
    }
    if (page === 4) {
      setShowPageFour(true);
    }
    if (page === 5) {
      setShowPageFive(true);
    }
  };

  const acceptProject = (e) => {
    handleSubmitReviewContract("accept", e);
    setShowSuccess(true);
    setSuccessMsg("You accepted the project!");
  };

  // To Do: Include the functionality for the user to upload deliverables

  if (!isOpen) return null;
  return ReactDOM.createPortal(
    // #to-do: switch from in-line style to className style
    <div style={OVERLAY_STYLES} className="">
      <div style={MODAL_STYLES} className="project-modal">
        <div className="stack">
          <img src={holidayBackground} alt="" className="stack__under" />
          <button onClick={onClose} className="btn-hide stack__over">
            <FontAwesomeIcon icon={faX} className="icon-medium" />
          </button>
        </div>

        <div className="project-modal-container">
          <div className="label-row-container">
            <h1 className="project-modal__heading">{project.title}</h1>
            <p className="project-modal__text">
              {getPaymentMethodText(project.paymentMethod)}
            </p>
          </div>
          <h4 className="project-modal__subheading">{project.company}</h4>

          <div className="project-modal-contract">
            <nav className="project-modal-navbar">
              {showProgress ? (
                <button
                  className={
                    showProgress
                      ? "btn-modal-navbar btn-modal-navbar--highlight"
                      : "btn-modal-navbar btn-modal-navbar--greyed"
                  }
                  type="button"
                  onClick={() => showPage(1)}
                >
                  Progress
                </button>
              ) : (
                ""
              )}
              <button
                className={
                  showPageOne
                    ? "btn-modal-navbar btn-modal-navbar--highlight"
                    : "btn-modal-navbar btn-modal-navbar--greyed"
                }
                type="button"
                onClick={() => showPage(1)}
              >
                Overview
              </button>
              <button
                className={
                  showPageTwo
                    ? "btn-modal-navbar btn-modal-navbar--highlight"
                    : "btn-modal-navbar btn-modal-navbar--greyed"
                }
                type="button"
                onClick={() => showPage(2)}
              >
                Compensation
              </button>
              <button
                className={
                  showPageThree
                    ? "btn-modal-navbar btn-modal-navbar--highlight"
                    : "btn-modal-navbar btn-modal-navbar--greyed"
                }
                type="button"
                onClick={() => showPage(3)}
              >
                Deliverables
              </button>
              <button
                className={
                  showPageFour
                    ? "btn-modal-navbar btn-modal-navbar--highlight"
                    : "btn-modal-navbar btn-modal-navbar--greyed"
                }
                type="button"
                onClick={() => showPage(4)}
              >
                Guidelines{" "}
              </button>
            </nav>
            {showProgress ? (
              <section className="project-modal-page project-modal-page--center">
                <ProjectModalAccept
                  acceptProject={acceptProject}
                  showSuccess={showSuccess}
                  cancel={() => showPage(1)}
                  onClose={onClose}
                />
              </section>
            ) : (
              ""
            )}
            {showPageOne ? (
              <>
                <section className="project-modal-page">
                  {/* Influencer Is Reviewing Contract => Can Accept / Reject / Modify */}
                  {project.status === "Reviewing Contract" ||
                  project.status === "no influencer assigned" ? (
                    <>
                      <ProjectModalPageOneReview {...data} />
                    </>
                  ) : (
                    ""
                  )}

                  {role.includes(3000) &&
                  project.status === "in progress/waiting for submission" ? (
                    <ProjectModalPageOneReview {...data} />
                  ) : (
                    ""
                  )}

                  {/* Influencer Has Accepted Prjoject => Can Upload Submissions */}
                  {project.status === "in progress/waiting for submission" &&
                  role.includes(2000) ? (
                    <>
                      <ProjectModalPageOneInProgress
                        handleSubmit={handleSubmit}
                        {...data}
                      />
                    </>
                  ) : (
                    ""
                  )}

                  {/* Influencer Has Submitted Project => Wait for Review/Payment*/}
                  {role.includes(2000) &&
                  (project.status === "brand reviewing" ||
                    project.status.toLowerCase() === "ready to publish" ||
                    project.status === "awaiting project payment") ? (
                    <>
                      <ProjectModalPageOneSubmitted
                        {...data}
                        handleSubmit={handleSubmit}
                      />
                    </>
                  ) : (
                    ""
                  )}
                  {/* Brand is reviewing the project */}
                  {role.includes(3000) &&
                  project.status === "brand reviewing" ? (
                    <>
                      <ProjectModalPageOneBrandReview
                        {...data}
                        handleSubmit={handleSubmit}
                        onClose={onClose}
                      />
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
                        Please pay the influencer as per the contract guidelines
                        by the agreed payment method.
                      </p>
                      <h4>Project Submission Details</h4>
                      <p>
                        <FontAwesomeIcon
                          icon={faInstagram}
                          className="icon-left"
                        />
                        1. {project.instagramTask} on Instagram.
                      </p>
                      <img
                        src={project.instagramSubmission}
                        alt="instagram submission"
                        className="project-modal__submission project-modal__submission--small"
                      />
                      {/* <p>
                      <FontAwesomeIcon icon={faTiktok} className="icon-left" />
                      2. {project.tiktokSubmission} on Tik Tok.
                    </p>
                    <p>
                      <FontAwesomeIcon icon={faYoutube} className="icon-left" />
                      3. {project.youtubeSubmission} on YouTube.
                    </p> */}
                      <h3>Select your Payment Method</h3>
                      <h4>Project Price: ${project.paymentPrice} CAD</h4>
                      <div className="btn-holder">
                        <button
                          className="form__btn-dotted form__btn-dotted--large"
                          onClick={() => {
                            setShowStripe(!showStripe);
                          }}
                        >
                          {/* <FontAwesomeIcon
                          icon={faStripe}
                          className="icon-right"
                          style={{ fontSize: "1.2rem", padding: "" }}
                        /> */}
                          Stripe
                        </button>
                        {/* <a
                        href="https://paypal.com"
                        target="_blank"
                        rel="noreferrer"
                      > */}

                        <button className="form__btn-dotted form__btn-dotted--large">
                          {/* <FontAwesomeIcon
                            style={{ fontSize: "0.8rem" }}
                            icon={faPaypal}
                            className="icon-left"  */}
                          Paypal
                        </button>

                        {/* </a>  */}
                      </div>
                      {showStripe ? <StripeContainer project={project} /> : ""}
                    </>
                  ) : (
                    ""
                  )}
                </section>

                {/* <div className="comments-container">
                  {project.status !== "Reviewing Contract" &&
                  project.status !== "no influencer assigned" ? (
                    <button
                      onClick={() => {
                        setShowProjectComments(!showProjectComments);
                      }}
                      className="form__btn-dotted form__btn-dotted--medium"
                    >
                      {!showProjectComments ? "Show Comments" : "Hide Comments"}
                    </button>
                  ) : (
                    ""
                  )}

                  {project.commentList && showProjectComments ? (
                    <div className="comment-list">
                      <h3 className="comment-list__header">Recent Activity</h3>
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
                </div> */}
              </>
            ) : (
              ""
            )}

            {showPageTwo ? (
              <section className="project-modal-page">
                <ProjectModalPageTwo {...data} />
              </section>
            ) : (
              ""
            )}
            {showPageThree ? (
              <section className="project-modal-page">
                {/* <Contract {...data} /> */}
                <ProjectModalPageThree {...data} />
              </section>
            ) : (
              ""
            )}
            {showPageFour ? (
              <section className="project-modal-page">
                <ProjectModalPageFour {...data} />
              </section>
            ) : (
              ""
            )}
          </div>
          <>
            {/*  Buttons */}

            {!showProgress ? (
              <div className="btn-container btn-container--center mt-1p5">
                {role.includes(2000) &&
                (project.status.toLowerCase() === "no influencer assigned" ||
                  project.status.toLowerCase() === "reviewing contract") &&
                !showAddComment ? (
                  <button
                    className={
                      !showPageFour
                        ? "btn-negotiate btn-negotiate--disabled"
                        : "btn-negotiate"
                    }
                    onClick={() => setShowAddComment(!showAddComment)}
                    disabled={!showPageFour ? true : false}
                  >
                    <FontAwesomeIcon icon={faPencil} className="icon-left" />
                    Negotiate
                  </button>
                ) : (
                  ""
                )}

                {role.includes(2000) &&
                (project.status === "Reviewing Contract" ||
                  project.status === "no influencer assigned") &&
                !showAddComment ? (
                  <button
                    type="button"
                    className={
                      showPageFour
                        ? "btn-accept"
                        : "btn-accept btn-accept--disabled"
                    }
                    disabled={!showPageFour ? true : false}
                    onClick={() => {
                      showPage(0);
                    }}
                  >
                    <FontAwesomeIcon icon={faCheck} className="icon-left" />
                    Accept
                  </button>
                ) : (
                  ""
                )}
              </div>
            ) : (
              ""
            )}

            {showAddComment ? (
              <form action="">
                <div className="label-col-container">
                  <label htmlFor="comments" className="form__label">
                    Request Changes
                  </label>
                  <input
                    type="text"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="form__input"
                  />
                </div>
                <div className="btn-container btn-container--center">
                  <button
                    type="submit"
                    className="btn-accept"
                    onClick={(e) => handleSubmit("modify", e)}
                  >
                    <FontAwesomeIcon
                      icon={faPencil}
                      className="icon-left icon-small"
                    />
                    Submit
                  </button>
                </div>
              </form>
            ) : (
              ""
            )}
          </>

          {(project.status === "no influencer assigned" ||
            project.status === "Reviewing Contract") &&
          showPageFive &&
          role.includes(2000) ? (
            <div className="project-modal-title">
              <form action="">
                {!showSuccess ? (
                  <>
                    <div className="btn-container btn-container--center">
                      <button
                        type="button"
                        className="form__btn-dotted form__btn-dotted--medium"
                        onClick={(e) => {
                          handleSubmitReviewContract("reject", e);
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
                        className="form__btn-dotted form__btn-dotted--medium"
                        onClick={() => {
                          setShowAddComment(true);
                        }}
                      >
                        <FontAwesomeIcon
                          icon={faPencil}
                          className="icon-left"
                        />
                        Request Changes
                      </button>
                    </div>
                    <div className="btn-container btn-container--center">
                      <button
                        type="button"
                        onClick={() => {
                          setShowPageFive(false);
                          setShowPageFour(true);
                        }}
                        className="form__btn-next form__btn-next--white"
                      >
                        Go Back
                      </button>
                    </div>
                  </>
                ) : (
                  ""
                )}
              </form>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>,

    document.getElementById("portal")
  );
};

export default ProjectModal;
