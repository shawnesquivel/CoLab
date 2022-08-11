import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Links = () => {
  const { auth, setAuth } = useAuth();
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
        <Link to="/updateprofile"> Update Profile </Link>
        <br />
        <br />

        <h3>Private</h3>
        <Link to="/home"> Landing Page </Link>
        <br />
        <Link to="/editor"> Editor's Page </Link>
        <br />
        <Link to="/admin"> Admin's Page</Link>
        <br />
        <Link to="/lounge">Lounge</Link>
        <br />

        <button
          onClick={() => {
            setAuth({});
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
