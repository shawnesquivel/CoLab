import React from "react";
import { Link, useNavigate } from "react-router-dom";
import colab from "../assets/colab-text.png";
import useAuth from "../hooks/useAuth";
import "../styles/links.scss";
import "../index.scss";
import appStore from "../assets/download-app-store.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faTiktok } from "@fortawesome/free-brands-svg-icons";
import { useState } from "react";
const Links = () => {
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();
  const [showLinks, setShowLinks] = useState(false);

  return (
    <>
      <header className="header">
        <Link to="/" className="header-left links__link">
          <img
            src={colab}
            alt="colab text logo"
            className="header-left colab-text-logo"
          />
        </Link>
        {/* <button
          className="btn-blank"
          onClick={() => {
            setShowLinks(!showLinks);
          }}
        >
          <FontAwesomeIcon icon={faBars} className="socials-container--icon" />
        </button> */}
        <div className="header-right">
          <div className="socials-container">
            <a href="https://instagram.com/">
              <FontAwesomeIcon
                icon={faInstagram}
                className="socials-container--icon"
              />
            </a>

            <a href="https://tiktok.com/">
              <FontAwesomeIcon
                icon={faTiktok}
                className="socials-container--icon"
              />
            </a>
          </div>
          <img
            src={appStore}
            alt="apple app store download"
            className="header-right__img"
          />
        </div>
      </header>

      {showLinks ? (
        <>
          <section className="links">
            <nav className="links-container">
              <Link to="/register"> Register </Link>
              <Link to="/login"> Login </Link>
              <Link to="/changepassword"> Change Password </Link>
              <Link to="/updateprofile"> Update Profile</Link>
              <button
                onClick={() => {
                  setAuth({});
                  localStorage.clear();
                  console.log("User signed out:", localStorage);
                  console.log("Auth Cleared", auth);
                  navigate("/", { replace: true });
                }}
                className="form__btn-dotted"
              >
                Sign Out
              </button>
            </nav>
            <nav className="links-container">
              <Link to="/dashboard">Dashboard</Link>
              <Link to="/upcoming">Upcoming Collabs</Link>
            </nav>
          </section>
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default Links;
