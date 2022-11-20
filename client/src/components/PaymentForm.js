import React, { useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "../api/axios";

// Styling the form (from Stripe docs)
const CARD_OPTIONS = {
  iconStyle: "solid",
  style: {
    base: {
      iconColor: "#c4f0ff",
      color: "#fff",
      fontWeight: 500,
      fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
      fontSize: "1rem",
      fontSmoothing: "antialiased",
      ":-webkit-autofill": { color: "#fce883" },
      "::placeholder": { color: "#87bbfd" },
    },
    invalid: {
      iconColor: "#ffc7ee",
      color: "#ffc7ee",
    },
  },
};
const UPDATEPROJECT_URL = "/api/updateproject";

const PaymentForm = ({ project }) => {
  const [success, setSuccess] = useState(false);
  const [paymentError, setPaymentError] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e, amount) => {
    e.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });
    // Stripe Payment
    if (!error) {
      try {
        const { id } = paymentMethod;
        const payload = {
          // cents
          amount,
          id,
        };
        const response = await axios.post("/api/payment", payload, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });
        console.log(response);
        if (response.data.success) {
          console.log("Successful payment!");
          setSuccess(true);
        }
      } catch (error) {
        console.log("Could not process payment", error);
      }
    } else {
      console.log(error.message);
      setPaymentError(true);
    }

    // If the Stripe payment succeeds, update the project status to complete
    try {
      const payload = JSON.stringify({
        action: "brand paid influencer",
        project,
      });

      const response = await axios.post(UPDATEPROJECT_URL, payload, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
    } catch (error) {}
  };

  return (
    <>
      {!success ? (
        <form onSubmit={(e) => handleSubmit(e, project.paymentPrice)}>
          <fieldset className="FormGroup">
            <div className="FormRow">
              <CardElement options={CARD_OPTIONS} />
            </div>
          </fieldset>
          <button className="stripe-btn">Pay</button>
        </form>
      ) : (
        <div>
          <h2>Your payment has been processed!</h2>
        </div>
      )}
      {paymentError ? <p>There was an error processing your paymenst</p> : ""}
    </>
  );
};

export default PaymentForm;
