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
      fontSize: "16px",
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

const PaymentForm = ({ project, handleSuccess }) => {
  const [success, setSuccess] = useState(false);
  const [paymentError, setPaymentError] = useState("");
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e, amount) => {
    e.preventDefault();
    console.log("Clicked 'Pay'");
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });
    console.log(error, paymentMethod);
    // Stripe Payment
    if (!error) {
      try {
        const { id } = paymentMethod;
        const payload = {
          // cents
          amount,
          id,
        };
        console.log("we get to here");
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
      setPaymentError(error.message);
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
      console.log(response);
      handleSuccess();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {!success ? (
        // Note: Payment = Price in Dollars * 100 cents per dollar
        <form onSubmit={(e) => handleSubmit(e, project.paymentPrice * 100)}>
          <fieldset className="FormGroup">
            <div className="FormRow">
              <CardElement options={CARD_OPTIONS} />
            </div>
          </fieldset>
          <button className="stripe-btn">Pay</button>
        </form>
      ) : (
        <div>
          <p>✅ Your payment has been processed!</p>
        </div>
      )}
      {paymentError ? <p>{paymentError}</p> : ""}
    </>
  );
};

export default PaymentForm;
