import React, { useState } from "react";
import StripeContainer from "./StripeContainer";

const ProjectModalPayment = ({ paymentPrice, project, paymentMethod }) => {
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handleSuccess = () => {
    setPaymentSuccess(true);
  };

  return (
    <div className="page">
      <p className="form__label">Payment</p>
      {paymentSuccess ? (
        <>
          <p className="mb-1">
            Please pay the influencer as per the Compensation section.
          </p>
          {paymentPrice ? (
            <p>Amount Owed: ${paymentPrice ? paymentPrice : "$100"} CAD</p>
          ) : (
            ""
          )}

          <div className="mt-2">
            <p className="form__label">Pay with Stripe</p>
            <StripeContainer project={project} handleSuccess={handleSuccess} />
            <p className="form__label">For Demo Purposes</p>
            <p className="fs-small mt-1">
              Type 4242 repeatedly until the following appears:
            </p>
            <p className="form__instructions mt-1">
              <span className="bold">VISA </span> 4242 4242 4242 4242
              ----------------------------------------- 04/24 -- 242 -- 42424
            </p>
          </div>
        </>
      ) : (
        <p>
          ✅ You have succesfully paid the influencer. The project is now
          complete!
        </p>
      )}
    </div>
  );
};

export default ProjectModalPayment;
