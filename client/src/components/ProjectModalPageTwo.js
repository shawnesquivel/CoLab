import React from "react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import campaignPhoto from "../assets/cloudpaint.png";

const ProjectModalPageTwo = ({
  status,
  paymentMethod,
  paymentPrice,
  paymentProduct,
}) => {
  return (
    <section className="project-modal-page">
      <h4 className="form__text form__text--subheader">Payment Details</h4>
      <p className="form__text">
        <span className="form__text form__text--bold">Compensation Type: </span>
        {paymentMethod === "payment and product"
          ? "You will receive cash and a physical product"
          : ""}
      </p>
      <p className="form__text">
        <span className="form__text form__text--bold">Monetary: </span>$
        {paymentPrice}
      </p>
      <h1 className="form__text form__text--subheader">
        {status === "Reviewing Contract" ? "Products" : "Shipped Products"}
      </h1>
      {/* To Do: Allow Influencer to Pick a Product */}
      {/* {status === "Reviewing Contract" ||
      status === "no influencer assigned" ? (
        <div className="project-modal-add-product">
          <FontAwesomeIcon icon={faPlus} />
          Add Product
        </div>
      ) : (
        ""
      )} */}
      <div className="project-modal-card">
        <img
          className="project-modal__product"
          src={campaignPhoto}
          alt="Product"
        />
        <div>
          <h2 className="form__text form__text--subheader">Payment Details</h2>
          <p>{paymentProduct}</p>
          {status === "Reviewing Contract" ? (
            <p>
              <FontAwesomeIcon icon={faTrashCan} className="icon-left" />
              Remove
            </p>
          ) : (
            ""
          )}
        </div>
      </div>
    </section>
  );
};

export default ProjectModalPageTwo;
