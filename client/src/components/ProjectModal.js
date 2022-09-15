import React, { useEffect, useState } from "react";
import {
  faCheck,
  faTimes,
  faPencil,
  faPlus,
  faAngleDown,
  faAngleUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactDOM from "react-dom";
import {
  faInstagram,
  faTiktok,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";

import {
  faCircleExclamation,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";

import campaignPhoto from "../assets/cloudpaint.png";

const MODAL_STYLES = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "#fefcfb",
  padding: "50px",
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
  const [addComment, setAddComment] = useState(false);

  // Pages
  const [showPageOne, setShowPageOne] = useState(true); //overview
  const [showPageTwo, setShowPageTwo] = useState(false); // products
  const [showPageThree, setShowPageThree] = useState(false); // contract
  const [showPageFour, setShowPageFour] = useState(false); // calendar

  // Page Four Dropdowns
  const [showHashtags, setShowHashtags] = useState(false);
  const [showTags, setShowTags] = useState(false);
  const [showPhrases, setShowPhrases] = useState(false);
  const [showLinkInBio, setShowLinkInBio] = useState(false);

  //  to do: Change Status of Project
  const handleSubmit = async (e) => {
    console.log(status);
    try {
      // to do: add axios post request
      // if you want to propose changes, then include "comment"
    } catch (err) {}
  };

  if (!isOpen) return null;
  return ReactDOM.createPortal(
    // #to-do: switch from in-line style to className style
    <div style={OVERLAY_STYLES} className="">
      <div style={MODAL_STYLES} className="">
        <h1 style={{ color: "black" }}>
          {project.company}: {project.title}
        </h1>

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
            Products
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

        {showPageOne ? (
          <section className="project-modal-page">
            <img
              className="project-modal-campaign-photo"
              src={campaignPhoto}
              alt="Campaign Product"
            />
            <h1 className="project-modal-title">Campaign Description</h1>
            <p>
              Skillshare is an online learning community with thousands of
              online classes and members across 150 countries, who come together
              to find inspiration and take the next step in their creative
              journey.
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
                    NEED TO FIX{" "}
                  </span>
                </p>
              </div>
            </div>
            <div className="project-modal-card">
              <FontAwesomeIcon icon={faCircleExclamation} />
              <div>
                <h2>Read Contracts</h2>
                <p>
                  <FontAwesomeIcon icon={faInstagram} className="icon-left" />
                  {project.instagramDeliverable.task}
                </p>
                <p>
                  <FontAwesomeIcon icon={faTiktok} className="icon-left" />
                  {project.tiktokDeliverable.task}
                </p>
                <p>
                  <FontAwesomeIcon icon={faYoutube} className="icon-left" />
                  {project.youtubeDeliverable.task}
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

            <button
              className="btn-light btn-small"
              type="button"
              onClick={() => {
                setShowPageOne(false);
                setShowPageTwo(true);
              }}
            >
              Continue
            </button>
          </section>
        ) : (
          ""
        )}

        {showPageTwo ? (
          <section className="project-modal-page">
            <h1 className="project-modal-title">Select Products</h1>
            <div className="project-modal-add-product">
              <FontAwesomeIcon icon={faPlus} />
              Add Product
            </div>
            <div className="project-modal-card">
              <img
                className="project-modal-product-photo"
                src={campaignPhoto}
                alt="Product"
              />
              <div>
                <h2>Cloud Paint</h2>
                <p>
                  Dawn
                  <span style={{ fontWeight: "bold", color: "red" }}>
                    {" "}
                    NEED TO FIX{" "}
                  </span>
                </p>
                <p>
                  <FontAwesomeIcon icon={faTrashCan} className="icon-left" />
                  Remove
                </p>
              </div>
            </div>
            <div>
              <h4>Payment Details</h4>
              <p>{project.paymentMethod}</p>
              <p>{project.paymentPrice}</p>
              <p>{project.paymentProduct}</p>
            </div>

            <div className="btn-holder">
              <button
                className="btn-light btn-small"
                type="button"
                onClick={() => {
                  setShowPageTwo(false);
                  setShowPageOne(true);
                }}
              >
                Go Back
              </button>
              <button
                className="btn-light btn-small"
                type="button"
                onClick={() => {
                  setShowPageTwo(false);
                  setShowPageThree(true);
                }}
              >
                Continue
              </button>
            </div>
          </section>
        ) : (
          ""
        )}
        {showPageThree ? (
          <section className="project-modal-page">
            <h1 className="project-modal-title">Contract</h1>
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
                Go Back
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowPageThree(false);
                  setShowPageFour(true);
                }}
                className="btn-dark btn-small"
              >
                I agree to the terms.{" "}
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
            <div className="project-modal-required-elements-container">
              <div className="project-modal-required-element">
                <h4>Hashtags</h4>
                <button
                  type="button"
                  onClick={() => {
                    setShowHashtags(!showHashtags);
                  }}
                >
                  {showHashtags ? (
                    <>
                      <FontAwesomeIcon icon={faAngleDown} />
                    </>
                  ) : (
                    <>
                      <FontAwesomeIcon icon={faAngleUp} />
                    </>
                  )}
                </button>
              </div>
              <div className="project-modal-required-element">
                <h4>Tags</h4>
                <button
                  type="button"
                  onClick={() => {
                    setShowTags(!showTags);
                  }}
                >
                  {showTags ? (
                    <>
                      <FontAwesomeIcon icon={faAngleDown} />
                    </>
                  ) : (
                    <>
                      <FontAwesomeIcon icon={faAngleUp} />
                    </>
                  )}
                </button>
              </div>
              <div className="project-modal-required-element">
                <h4>Phrases</h4>
                <button
                  type="button"
                  onClick={() => {
                    setShowPhrases(!showPhrases);
                  }}
                >
                  {showPhrases ? (
                    <>
                      <FontAwesomeIcon icon={faAngleDown} />
                    </>
                  ) : (
                    <>
                      <FontAwesomeIcon icon={faAngleUp} />
                    </>
                  )}
                </button>
              </div>
              <div className="project-modal-required-element">
                <h4>Link In Bio</h4>
                <button
                  type="button"
                  onClick={() => {
                    setShowLinkInBio(!showLinkInBio);
                  }}
                >
                  {showLinkInBio ? (
                    <>
                      <FontAwesomeIcon icon={faAngleDown} />
                    </>
                  ) : (
                    <>
                      <FontAwesomeIcon icon={faAngleUp} />
                    </>
                  )}
                </button>
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
                Go Back
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowPageFour(false);
                  setShowPageOne(true);
                }}
                className="btn-dark btn-small"
              >
                I agree to the guidelines.
              </button>
            </div>
          </section>
        ) : (
          ""
        )}

        <form action="">
          {project.status === "Reviewing Contract" && role.includes(2000) ? (
            <>
              <br />
              <p>
                Thank you for reviewing the contract. Do you accept the terms
                and conditions?
              </p>
            </>
          ) : (
            ""
          )}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              setStatus("Accept");
              handleSubmit();
            }}
          >
            Accept the Project <FontAwesomeIcon icon={faCheck} />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              setStatus("Reject");
              handleSubmit();
            }}
          >
            Reject the Project <FontAwesomeIcon icon={faTimes} />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              setStatus("Proposed Changes");
              handleSubmit();
              setAddComment(true);
            }}
          >
            I'd like to propose some changes.{" "}
            <FontAwesomeIcon icon={faPencil} />
          </button>
        </form>

        {addComment ? (
          <form action="">
            <label htmlFor="comments">
              Add a new comment (if you have proposed changes)
            </label>
            <input type="text"></input>

            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                setStatus("Proposed Changes");
                handleSubmit();
              }}
            >
              Submit modifications to proposal{" "}
              <FontAwesomeIcon icon={faPencil} />
            </button>
          </form>
        ) : (
          ""
        )}

        <button onClick={onClose}>
          Close Project <FontAwesomeIcon icon={faTimes} />
        </button>
      </div>
    </div>,
    document.getElementById("portal")
  );
};

export default ProjectModal;
