import React from "react";

const ProjectModalPageTwo = ({
  paymentMethod,
  paymentPrice,
  paymentProduct,
}) => {
  const generatePaymentMethodText = (paymentMethod) => {
    if (paymentMethod.toLowerCase() === "payment and product")
      return "Payment + Product";
    if (paymentMethod.toLowerCase() === "payment only") return "Payment";
    if (paymentMethod.toLowerCase() === "product only") return "Product";
  };

  return (
    <>
      <div className="page">
        <div className="project-modal-page__group">
          <h4 className="project-modal-page__label">Compensation Type</h4>
          <p className="project-modal-page__value">
            {generatePaymentMethodText(paymentMethod)}
          </p>
        </div>

        {paymentMethod.toLowerCase() === "payment only" ||
        paymentMethod.toLowerCase() === "payment and product" ? (
          <>
            <div className="project-modal-page__group">
              <h4 className="project-modal-page__label">Payment Method</h4>
              <p className="project-modal-page__value">Stripe</p>
            </div>
            <div className="project-modal-page__group">
              <h4 className="project-modal-page__label">Payment Amount</h4>
              <p className="project-modal-page__value">${paymentPrice}</p>
            </div>
          </>
        ) : (
          ""
        )}
        {paymentMethod.toLowerCase() === "product only" ||
        paymentMethod.toLowerCase() === "payment and product" ? (
          <div className="project-modal-page__group">
            <h4 className="project-modal-page__label">Product Description</h4>
            <p className="project-modal-page__value">{paymentProduct}</p>
          </div>
        ) : (
          ""
        )}

        {/* <div className="project-modal-page__group">
        <h4 className="project-modal-page__label">Label</h4>
        <p className="project-modal-page__value">Content</p>
      </div> */}

        {/* <section className="project-modal-page">
        <h4 className="form__text form__text--subheader">Payment Details</h4>
        <p className="form__text">
          <span className="form__text form__text--bold">
            Compensation Type:{" "}
          </span>
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
    
        <div className="project-modal-card">
          <img
            className="project-modal__product"
            src={campaignPhoto}
            alt="Product"
          />
          <div>
            <h2 className="form__text form__text--subheader">
              Payment Details
            </h2>
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
      </section> */}
      </div>
    </>
  );
};

export default ProjectModalPageTwo;
