import React from "react";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faTiktok,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
const moment = require("moment");

const CreateProjectSummary = ({
  title,
  description,
  influencerAssigned,
  reviewDeadline,
  deadline,
  deadlineTime,
  instagramTask,
  tiktokTask,
  youtubeTask,
  numberOfRevisions,
  paymentMethod,
  paymentPrice,
  paymentProduct,
  keywords,
  hashtags,
  tags,
  phrases,
  linkInBio,
}) => {
  return (
    <div className="preview">
      <h2 className="preview__header">Preview</h2>
      <div className="preview-container">
        <div className="preview-left">
          {/* Campaign Overview */}
          <div className="preview-col">
            <div className="preview-row">
              <h5 className="form__label">Campaign Overview</h5>
              <FontAwesomeIcon icon={faPencil} className="form__label" />
            </div>
            <table className="preview-table">
              <tbody className="preview-table__tbody">
                <tr className="preview-table__tr">
                  <th className="preview-table__th">Campaign Title</th>
                  <td className="preview-table__td">
                    {title.length > 40
                      ? title.slice(0, 40).concat("...")
                      : title}
                  </td>
                </tr>
                {description ? (
                  <tr className="preview-table__tr">
                    <th className="preview-table__th">Description</th>
                    <td className="preview-table__td">
                      {description.length > 30
                        ? description.slice(0, 40).concat("...")
                        : description}
                    </td>
                  </tr>
                ) : (
                  ""
                )}

                <tr className="preview-table__tr">
                  <th className="preview-table__th">Draft Deadline</th>
                  <td className="preview-table__td">
                    {moment(reviewDeadline).format("MMMM Do YYYY, h:mm:ss a")}
                  </td>
                </tr>
                <tr className="preview-table__tr">
                  <th className="preview-table__th">Post Deadline</th>
                  <td className="preview-table__td">
                    {moment(deadline).format("MMMM Do YYYY, h:mm:ss a")}
                  </td>
                </tr>
                <tr className="preview-table__tr">
                  <th className="preview-table__th">Influencer Assigned</th>
                  <td className="preview-table__td">
                    {influencerAssigned !== "none"
                      ? influencerAssigned
                      : "No Invites"}
                  </td>
                </tr>
                <tr className="preview-table__tr">
                  <th className="preview-table__th">Deadline Time</th>
                  <td className="preview-table__td">{deadlineTime}</td>
                </tr>
                <tr className="preview-table__tr">
                  <th className="preview-table__th">Keywords</th>
                  <td className="preview-table__td">
                    {keywords.map((word) => word + ", ")}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          {/* Tasks */}
          <div className="preview-col">
            <div className="preview-row">
              <h5 className="form__label">Deliverables</h5>
              <FontAwesomeIcon icon={faPencil} className="form__label" />
            </div>
            <table className="preview-table">
              <tbody className="preview-table__tbody">
                {instagramTask ? (
                  <tr className="preview-table__tr">
                    <th className="preview-table__th">
                      <FontAwesomeIcon
                        icon={faInstagram}
                        className="icon-left"
                      />
                      Instagram
                    </th>
                    <td className="preview-table__td">{instagramTask}</td>
                  </tr>
                ) : (
                  ""
                )}
                {youtubeTask ? (
                  <tr className="preview-table__tr">
                    <th className="preview-table__th">
                      <FontAwesomeIcon icon={faYoutube} className="icon-left" />
                      Youtube
                    </th>{" "}
                    <td className="preview-table__td">{youtubeTask}</td>
                  </tr>
                ) : (
                  ""
                )}
                {tiktokTask ? (
                  <tr className="preview-table__tr">
                    <th className="preview-table__th">
                      <FontAwesomeIcon icon={faTiktok} className="icon-left" />
                      Tik Tok
                    </th>
                    <td className="preview-table__td">{tiktokTask}</td>
                  </tr>
                ) : (
                  ""
                )}
              </tbody>
            </table>
          </div>
          {/* Payment */}
          <div className="preview-col">
            <div className="preview-row">
              <h5 className="form__label">Payment</h5>
              <FontAwesomeIcon icon={faPencil} className="form__label" />
            </div>
            <table className="preview-table">
              <tbody className="preview-table__tbody">
                <tr className="preview-table__tr">
                  <th className="preview-table__th">Payment Type</th>
                  <td className="preview-table__td">{paymentMethod}</td>
                </tr>

                {paymentPrice ? (
                  <tr className="preview-table__tr">
                    <th className="preview-table__th">Payment Price</th>
                    <td className="preview-table__td">${paymentPrice}</td>
                  </tr>
                ) : (
                  ""
                )}
                {paymentProduct ? (
                  <tr className="preview-table__tr">
                    <th className="preview-table__th">Payment Product</th>
                    <td className="preview-table__td">{paymentProduct}</td>
                  </tr>
                ) : (
                  ""
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="preview-right">
          {/* Guidelines */}
          <div className="preview-col">
            <div className="preview-row">
              <h5 className="form__label">Guidelines</h5>
              <FontAwesomeIcon icon={faPencil} className="form__label" />
            </div>
            <table className="preview-table">
              <tbody className="preview-table__tbody">
                {phrases ? (
                  <tr className="preview-table__tr">
                    <th className="preview-table__th">Required Phrases</th>
                    <td className="preview-table__td">
                      {phrases.length === 1
                        ? '"' + phrases[0] + '"'
                        : phrases.map((word) => '"' + word + '"' + ", ")}
                    </td>
                  </tr>
                ) : (
                  ""
                )}
                {hashtags ? (
                  <tr className="preview-table__tr">
                    <th className="preview-table__th">Required Hashtags</th>
                    <td className="preview-table__td">
                      {hashtags.length === 1
                        ? "#" + hashtags[0]
                        : hashtags.map((word) => "#" + word + ", ")}
                    </td>
                  </tr>
                ) : (
                  ""
                )}
                {tags ? (
                  <tr className="preview-table__tr">
                    <th className="preview-table__th">Required Tags</th>
                    <td className="preview-table__td">
                      {tags.length === 1
                        ? "@" + tags[0]
                        : tags.map((word) => "@" + word + ", ")}
                    </td>
                  </tr>
                ) : (
                  ""
                )}

                <tr className="preview-table__tr">
                  <th className="preview-table__th">Link in Bio</th>
                  <td className="preview-table__td">{linkInBio}</td>
                </tr>
              </tbody>
            </table>
          </div>
          {/* Deliverables */}
          <div className="preview-col">
            <div className="preview-row">
              <h5 className="form__label">Contract</h5>
              <FontAwesomeIcon icon={faPencil} className="form__label" />
            </div>
            <table className="preview-table">
              <tbody className="preview-table__tbody">
                <tr className="preview-table__tr">
                  <td className="preview-table__td preview-table__td--contract">
                    <p>
                      The creator will provide the following in accordance to
                      the content guidelines:
                    </p>
                    <br />
                    <p>
                      The creator must upload all content on CoLab by{" "}
                      {moment(reviewDeadline).format("MMMM Do YYYY, h:mm:ss a")}{" "}
                      for review by the brand. The contract will include up to{" "}
                      {numberOfRevisions} revisions if necessary. All content
                      must be uploaded by{" "}
                      {moment(deadline).format("MMMM Do YYYY, h:mm:ss a")} after
                      the Creator receives approval from the brand.
                    </p>
                    <br />

                    <p>
                      The Creator grants the Brand a worldwide, irrevocable,
                      royalty-free, fully paid-up, transferrable,
                      sub-licensable, and perpetual right and license to
                      reproduce, publish, distribute, display, repost, share and
                      edit all Creator created for or on behalf of the Brand in
                      any and all media now known or developed in the future.
                    </p>
                    <br />
                    <p>
                      {" "}
                      The Creator accepts the terms of the foregoing proposal
                      and agree to the Privacy Policy and Terms & Conditions.
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <p className="form__instructions form__instructions--center form__instructions--large">
        How would you like to proceed?
      </p>
    </div>
  );
};

export default CreateProjectSummary;
