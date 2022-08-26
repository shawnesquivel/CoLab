import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Links = () => {
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();
  return (
    <section>
      <h2>Links</h2>
      <br />
      <nav>
        <h3>Public</h3>

        <Link to="/"> Back To Home ------ </Link>
        <Link to="/register"> Register ------</Link>
        <Link to="/login"> Login ------ </Link>
        <Link to="/changepassword"> Change Password </Link>
        <br />
        <br />

        <h3>Influencer</h3>
        <Link to="/updateprofile"> Update Profile ------</Link>
        <Link to="/dashboard"> Dashboard ------</Link>
        <Link to="/upcoming">Upcoming Collabs ------</Link>
        <Link to="/invites">Collab Invites ------ </Link>
        <br />
        <br />
        <h3>
          <Link to="/createproject"> Brand Rep: Create Project ------ </Link>
          <Link to="/admin"> Admin: Website Settings</Link>
        </h3>

        <br />
        <button
          onClick={() => {
            setAuth({});
            localStorage.clear();
            console.log("User signed out:", localStorage);
            console.log("Auth Cleared", auth);
            navigate("/", { replace: true });
          }}
          className="flexGrow"
        >
          Sign Out
        </button>
      </nav>
    </section>
  );
};

export default Links;
