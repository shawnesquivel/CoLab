import React from "react";
import { useRef, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/register.scss";
import influencerHeadshot from "../assets/register/black-model-afro.png";
import RegisterForm from "./RegisterForm";
import RegisterSelect from "./RegisterSelect";

const Register = () => {
  const navigate = useNavigate(); // to use the navigate hook

  // Landing page
  const [showLanding, setShowLanding] = useState(true);
  const [showRegisterSelect, setShowRegisterSelect] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [showInfluencerForm, setShowInfluencerForm] = useState(false);
  const [showBrandForm, setShowBrandForm] = useState(false);
  const [success, setSuccess] = useState(false);

  // Change the state basewd on the child elements
  const handleShowForms = (e, form) => {
    e.preventDefault();

    if (form === "influencer") {
      setShowRegisterSelect(false);
      setShowForm(true);
      setShowInfluencerForm(true);
    }
    if (form === "brand") {
      setShowRegisterSelect(false);
      setShowForm(true);
      setShowBrandForm(true);
    }
    // if user wants to go back to landing page
    if (form === "reset") {
      setShowForm(false);
      setShowRegisterSelect(true);
      setShowBrandForm(false);
      setShowInfluencerForm(false);
    }
  };

  return (
    <>
      {/* Landing Page */}
      {showLanding ? (
        <section className="landing">
          <div className="landing__container-left">
            {/* Show the Landing Page */}
            {showRegisterSelect ? (
              <RegisterSelect handleShowForms={handleShowForms} />
            ) : (
              ""
            )}
            {/* Show the Influencer Page */}
            {showForm ? (
              <RegisterForm
                showInfluencerForm={showInfluencerForm}
                showBrandForm={showBrandForm}
                handleShowForms={handleShowForms}
                role={showInfluencerForm ? "influencer" : "brand"}
              />
            ) : (
              ""
            )}
            {/* Show the Brand Page */}
          </div>
          <img
            src={influencerHeadshot}
            alt="headshot of a model in a black coat"
            className="landing__img-right"
          />
        </section>
      ) : (
        ""
      )}
    </>
  );
};

export default Register;
