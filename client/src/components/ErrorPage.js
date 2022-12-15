import React from "react";
import { Link } from "react-router-dom";
import "../index.scss";

const ErrorPage = () => {
  return (
    <>
      <h1 className="heading heading--large " style={{ marginTop: "5rem" }}>
        404 Error: Page Not Found
      </h1>
      <p className="mb-1p5">
        Sorry, we can't find the page you're looking for!
      </p>

      <Link
        to="/"
        className="header-left links__link text--underline text--grey"
      >
        Return to Home
      </Link>
    </>
  );
};

export default ErrorPage;
