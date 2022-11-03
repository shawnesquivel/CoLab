import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import "../styles/links.scss";

const Links = () => {
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();
  return (
    <>
      <Link to="/" className="links__link">
        <h1 className="website__title">CoLab</h1>
      </Link>
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
            className="links__btn-sign-out"
          >
            Sign Out
          </button>
        </nav>
        <nav className="links-container">
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/upcoming">Upcoming Collabs</Link>
          <Link to="/invites">Collab Invites </Link>
          {/* <h3>
          <Link to="/createproject"> Brand Rep: Create Project ------ </Link>
          <Link to="/admin"> Admin: Website Settings</Link>
        </h3> */}
        </nav>
      </section>
    </>
  );
};

export default Links;
