import React from "react";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const moment = require("moment");

const CreateProjectSummary = ({
  title,
  description,
  influencerAssigned,
  reviewDeadline,
  deadline,
  deadlineTime,
  instagramDeliverable,
  tiktokDeliverable,
  youtubeDeliverable,
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
    <div className="preview-page ">
      <h2 className="form-header">Preview</h2>
      <div className="preview-container">
        <div className="preview-left">
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
                    {title.length > 20
                      ? title.slice(0, 20).concat("...")
                      : title}
                  </td>
                </tr>
                <tr className="preview-table__tr">
                  <th className="preview-table__th">Description</th>
                  <td className="preview-table__td">
                    {description.length > 20
                      ? description.slice(0, 20).concat("...")
                      : description}
                  </td>
                </tr>
                <tr className="preview-table__tr">
                  <th className="preview-table__th">Draft Deadline</th>
                  <td className="preview-table__td">
                    {moment(reviewDeadline).format("MMMM Do YYYY, h:mm:ss a")}
                  </td>
                </tr>
                <tr className="preview-table__tr">
                  <th className="preview-table__th">Review Deadline</th>
                  <td className="preview-table__td">{deadline}</td>
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

          <div className="preview-col">
            <div className="preview-row">
              <h5 className="form__label">Deliverables</h5>
              <FontAwesomeIcon icon={faPencil} className="form__label" />
            </div>
            <table className="preview-table">
              <tbody className="preview-table__tbody">
                {instagramDeliverable ? (
                  <tr className="preview-table__tr">
                    <th className="preview-table__th">Instagram</th>
                    <td className="preview-table__td">
                      {instagramDeliverable}
                    </td>
                  </tr>
                ) : (
                  ""
                )}
                {youtubeDeliverable ? (
                  <tr className="preview-table__tr">
                    <th className="preview-table__th">Youtube</th>
                    <td className="preview-table__td">{youtubeDeliverable}</td>
                  </tr>
                ) : (
                  ""
                )}
                {tiktokDeliverable ? (
                  <tr className="preview-table__tr">
                    <th className="preview-table__th">Tiktok</th>
                    <td className="preview-table__td">{tiktokDeliverable}</td>
                  </tr>
                ) : (
                  ""
                )}
              </tbody>
            </table>
          </div>

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
                    {title.length > 20
                      ? title.slice(0, 20).concat("...")
                      : title}
                  </td>
                </tr>
                <tr className="preview-table__tr">
                  <th className="preview-table__th">Description</th>
                  <td className="preview-table__td">
                    {description.length > 20
                      ? description.slice(0, 20).concat("...")
                      : description}
                  </td>
                </tr>
                <tr className="preview-table__tr">
                  <th className="preview-table__th">Draft Deadline</th>
                  <td className="preview-table__td">
                    {moment(reviewDeadline).format("MMMM Do YYYY, h:mm:ss a")}
                  </td>
                </tr>
                <tr className="preview-table__tr">
                  <th className="preview-table__th">Review Deadline</th>
                  <td className="preview-table__td">{deadline}</td>
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

          <div className="preview-col">
            <div className="preview-row">
              <h5 className="form__label">Deliverables</h5>
              <FontAwesomeIcon icon={faPencil} className="form__label" />
            </div>
            <table className="preview-table">
              <tbody className="preview-table__tbody">
                {instagramDeliverable ? (
                  <tr className="preview-table__tr">
                    <th className="preview-table__th">Instagram</th>
                    <td className="preview-table__td">
                      {instagramDeliverable}
                    </td>
                  </tr>
                ) : (
                  ""
                )}
                {youtubeDeliverable ? (
                  <tr className="preview-table__tr">
                    <th className="preview-table__th">Youtube</th>
                    <td className="preview-table__td">{youtubeDeliverable}</td>
                  </tr>
                ) : (
                  ""
                )}
                {tiktokDeliverable ? (
                  <tr className="preview-table__tr">
                    <th className="preview-table__th">Tiktok</th>
                    <td className="preview-table__td">{tiktokDeliverable}</td>
                  </tr>
                ) : (
                  ""
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProjectSummary;
