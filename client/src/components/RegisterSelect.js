import React from "react";
import { useNavigate, Link } from "react-router-dom";
import colabFolder from "../assets/colab-logo.png";

const RegisterSelect = ({ handleShowForms }) => {
  return (
    <>
      <img
        src={colabFolder}
        alt="colab folder icon"
        className="colab-folder-logo landing__folder-logo"
      />
      <h1 className="heading heading--largest">Let's Collaborate!</h1>
      <p className="landing__description">
        Sign up to get access to thousands of social media campaigns with the
        top brands.{" "}
      </p>
      <p className="landing__description mb-1p5 text--bold">I am a(n):</p>
      <button
        className="landing__btn"
        onClick={(e) => {
          handleShowForms(e, "influencer");
        }}
      >
        Influencer
      </button>
      <button
        className="landing__btn"
        onClick={(e) => {
          handleShowForms(e, "brand");
        }}
      >
        Brand
      </button>
      <p className="description-text">
        Have an account?{" "}
        <Link to="/login" className="landing__link">
          Log In Instead
        </Link>
      </p>{" "}
    </>
  );
};

export default RegisterSelect;
