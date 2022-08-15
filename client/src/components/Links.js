import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Links = () => {
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();
  return (
    <section>
      <h1>Links</h1>
      <br />
      <nav>
        <h3>Public</h3>

        <Link to="/"> Back To Home </Link>
        <br />
        <Link to="/register"> Register </Link>
        <br />
        <Link to="/login"> Login </Link>
        <br />
        <Link to="/changepassword"> Change Password </Link>
        <br />
        <br />

        <h3>Influencer</h3>
        <Link to="/updateprofile"> Update Profile </Link>
        <br />
        <Link to="/dashboard"> Dashboard </Link>

        <br />
        <Link to="/upcoming">Upcoming Collabs</Link>
        <br />
        <Link to="/invites">Collab Invites</Link>
        <br />
        <br />
        <h3>Brand Rep</h3>
        <Link to="/createproject"> Create Project </Link>
        <br />
        <br />
        <h3>Administrator</h3>
        <Link to="/admin"> Admin's Page</Link>
        <br />
        <button
          onClick={() => {
            setAuth({});
            localStorage.clear();
            console.log("User signed out:", localStorage);
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
