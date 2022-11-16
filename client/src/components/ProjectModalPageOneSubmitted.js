import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faInstagram,
  faTiktok,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";

const moment = require("moment");

const ProjectModalPageOneSubmitted = ({
  reviewDeadline,
  tiktokSubmission,
  youtubeSubmission,
  instagramSubmission,
  status,
  handleSubmit,
  role,
  company,
}) => {
  // Influencer has posted deliverables
  const [postedContentSuccess, setPostedContentSuccess] = useState(false);

  return (
    <>
      <h3>
        {status === "ready to publish"
          ? "You're all set to post your content!"
          : ""}
        {status === "awaiting project payment"
          ? "You have uploaded your deliverables to social media."
          : ""}
      </h3>
      <p>
        {status === "brand reviewing"
          ? "Thank you for submitting your draft. Please give the brand some time to review."
          : ""}
        {status.toLowerCase() === "ready to publish"
          ? `${company} has approved your submission. Please post your content before the deadline time. Be sure to include any required hashtags as per the Guidelines page!`
          : ""}
        {/* If the content has been posted and the influencer is waiting to be paid */}
        {status === "awaiting project payment"
          ? `Thank you for submitting your 
                          ${company} has been notified of your
                          submission, and upon their confirmation, your payment
                          will be transferred as per the contract.`
          : ""}
      </p>

      <p>
        <FontAwesomeIcon icon={faInstagram} className="icon-left" />
        1. {instagramSubmission} on Instagram.
      </p>
      <p>
        <FontAwesomeIcon icon={faTiktok} className="icon-left" />
        2. {tiktokSubmission} on Tik Tok.
      </p>
      <p>
        <FontAwesomeIcon icon={faYoutube} className="icon-left" />
        3. {youtubeSubmission} on YouTube.
      </p>
      {/* Deadline */}
      <h3>
        {status.toLowerCase() === "ready to publish"
          ? `Deadline: ${moment(reviewDeadline).format(
              "MMMM Do YYYY, h:mm:ss a"
            )}`
          : ""}
      </h3>
      {/* Influncer: Notify the brand that you have published the deliverables */}
      {role.includes(2000) &&
      status.toLowerCase() === "ready to publish" &&
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
        <p>Thank you for posting your content! The brand has been notified.</p>
      ) : (
        ""
      )}
    </>
  );
};

export default ProjectModalPageOneSubmitted;
