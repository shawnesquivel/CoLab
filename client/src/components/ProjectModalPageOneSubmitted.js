import React, { useState } from "react";
import { faSquareMinus } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faInstagram,
  faTiktok,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import ToDo from "./ToDo";

const moment = require("moment");

const ProjectModalPageOneSubmitted = ({
  reviewDeadline,
  tiktokTask,
  youtubeTask,
  instagramTask,
  status,
  handleSubmit,
  role,
  company,
  deadline,
  onClose,
}) => {
  // Influencer has posted deliverables
  const [postedContentSuccess, setPostedContentSuccess] = useState(false);

  return (
    <>
      <div className="to-do">
        <div className="to-do-left">
          <div>
            <p className="mb-1 form__label">To Do</p>
            {status === "ready to publish" ? (
              <>
                {instagramTask ? (
                  <ToDo title="Post on Instagram" deadline={deadline} />
                ) : (
                  ""
                )}
                {tiktokTask ? (
                  <ToDo title="Post on Tik Tok" deadline={deadline} />
                ) : (
                  ""
                )}
                {youtubeTask ? (
                  <ToDo title="Post on YouTube" deadline={deadline} />
                ) : (
                  ""
                )}
              </>
            ) : (
              <ToDo title="placeholder" />
            )}
          </div>
        </div>
        <div className="to-do-right">
          <div className="flex-col flex-col--gap">
            <p className="form__label">Next Steps</p>
            {status === "ready to publish" ? (
              <>
                <p>
                  {company} has approved your submission! Please post your
                  content before the deadline time. Be sure to include any
                  required hashtags as per the Guidelines.
                </p>
              </>
            ) : (
              ""
            )}
            {status === "brand reviewing" ? (
              <>
                <p>
                  "Thank you for submitting your draft. Please give the brand
                  some time to review."
                </p>
              </>
            ) : (
              ""
            )}
            {/* If the content has been posted and the influencer is waiting to be paid */}
            {status === "awaiting project payment" ? (
              <>
                <p>
                  {company} has been notified of your upload to social media.
                </p>
                <p>
                  Upon their review, you will be paid as per the Compensation
                  section.
                </p>
              </>
            ) : (
              ""
            )}
            {instagramTask ? (
              <p>
                <FontAwesomeIcon icon={faInstagram} className="icon-left" />
                {instagramTask} on Instagram.
              </p>
            ) : (
              ""
            )}
            {tiktokTask ? (
              <p>
                <FontAwesomeIcon icon={faTiktok} className="icon-left" />
                {tiktokTask} on Tik Tok.
              </p>
            ) : (
              ""
            )}
            {youtubeTask ? (
              <p>
                <FontAwesomeIcon icon={faYoutube} className="icon-left" />
                {youtubeTask} on YouTube.
              </p>
            ) : (
              ""
            )}
            {/* Deadline */}
            <p className="">
              {status.toLowerCase() === "ready to publish"
                ? `Deadline: ${moment(reviewDeadline).format(
                    "MMMM Do YYYY, h:mm:ss a"
                  )}`
                : ""}
            </p>
            {/* Influncer: Notify the brand that you have published the deliverables */}
            {role.includes(2000) &&
            status.toLowerCase() === "ready to publish" &&
            !postedContentSuccess ? (
              <button
                type="button"
                className="btn-cta mt-1p5"
                onClick={(e) => {
                  handleSubmit("influencer posted content", e);
                  setPostedContentSuccess(true);
                }}
              >
                Finished Uploading
              </button>
            ) : (
              ""
            )}
            {postedContentSuccess ? (
              <>
                <p className="bold">
                  ✅ Thank you for posting your content! The brand has been
                  notified.
                </p>
                <button type="button" onClick={onClose} className="btn-cta">
                  <FontAwesomeIcon icon={faSquareMinus} className="icon-left" />
                  Close Project
                </button>
              </>
            ) : (
              ""
            )}{" "}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectModalPageOneSubmitted;
