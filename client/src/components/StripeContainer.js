import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "./PaymentForm";
const PUBLIC_KEY =
  "pk_test_51LzP4XI5HXM3pHflJ9vNo22XGQqpblsnF0MzmbuRwyKglgSFjMYYq6R2kisVZpTCpWOaDXEARaxpphVEqxlOGxB800am0Eu4W9";

const stripeTestPromise = loadStripe(PUBLIC_KEY);

const StripeContainer = ({ project, handleSuccess }) => {
  return (
    <Elements stripe={stripeTestPromise}>
      <PaymentForm project={project} handleSuccess={handleSuccess} />
    </Elements>
  );
};

export default StripeContainer;
