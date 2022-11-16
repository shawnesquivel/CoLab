import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faTiktok,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
const moment = require("moment");

const Contract = ({
  instagramTask,
  tiktokTask,
  youtubeTask,
  reviewDeadline,
  deadline,
  numberOfRevisions,
  company,
}) => {
  return (
    <>
      <p className="form__text">
        The creator will provide the following in accordance to the content
        guidelines:
      </p>
      <p className="form__text">
        <FontAwesomeIcon icon={faInstagram} className="icon-left" />
        1. {instagramTask} on Instagram.
      </p>
      <p className="form__text">
        <FontAwesomeIcon icon={faTiktok} className="icon-left" />
        2. {tiktokTask} on Tik Tok.
      </p>
      <p className="form__text">
        <FontAwesomeIcon icon={faYoutube} className="icon-left" />
        3. {youtubeTask} on YouTube.
      </p>
      <p className="form__text">
        The creator must upload all content on CoLab by{" "}
        {moment(reviewDeadline).format("MMMM Do YYYY, h:mm:ss a")} for review by
        the brand ({company}). The contract will include up to{" "}
        {numberOfRevisions} revisions if necessary. All content must be uploaded
        by {moment(deadline).format("MMMM Do YYYY, h:mm:ss a")} after the
        Creator receives approval from the brand.
      </p>

      <p className="form__text">
        The Creator grants the Brand a worldwide, irrevocable, royalty-free,
        fully paid-up, transferrable, sub-licensable, and perpetual right and
        license to reproduce, publish, distribute, display, repost, share and
        edit all Creator created for or on behalf of the Brand in any and all
        media now known or developed in the future. The Creator accepts the
        terms of the foregoing proposal and agree to the Privacy Policy and
        Terms & Conditions.
      </p>
    </>
  );
};

export default Contract;
