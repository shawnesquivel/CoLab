import React from "react";
import { useEffect, useState, useRef } from "react";
import useAuth from "../hooks/useAuth";
import AuthContext from "../context/AuthProvider";

import axios from "../api/axios";
import { Link, useNavigate, useLocation } from "react-router-dom";
import loginImg from "../assets/login.png";
import "../styles/login.scss";

const LOGIN_URL = "/api/login";

const Login = () => {
  // using the context before creating the custom hook useAuth
  // const { setAuth } = useContext(AuthContext);
  // using the context after creating custom hook useAuth (removed imports)
  const { auth, setAuth } = useAuth(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  // see if it we came from a previous path
  const from = location.state?.from?.pathname || "/";

  const errRef = useRef();

  // Login State
  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  // Successful submission: Show the Success JSX  (only use this for prototyping)
  // Now replaced with the Navigate feature
  // const [success, setSuccess] = useState(false);
  // Error Message
  const [errMsg, setErrMsg] = useState("");
  // Set User Focus on page load
  const userRef = useRef();
  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    // console.log("Username:", user);
    // console.log("Password:", pwd);
    setErrMsg("");
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user, pwd);

    // Submit the user/password combination
    try {
      const payload = JSON.stringify({ user, pwd });
      // axios throws errors automatically, no need for .catch
      // axios convertsd to json automatically
      const response = await axios.post(LOGIN_URL, payload, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      const accessToken = response?.data?.token;
      const roles = response?.data?.roles;
      console.log("Response Data", user, pwd, roles, accessToken);
      setAuth({ user, pwd, roles, accessToken });
      console.log("AUTH:", auth);
      setUser("");
      setPwd("");

      if (response.status === 200) {
        // clear previous local storage
        localStorage.clear();
        // store the login token
        console.log("Received token and set to local storage:", response.data);
        localStorage.setItem("token", JSON.stringify(response.data));

        if (location?.state?.from) {
          navigate(location.state.from);
        }
      } else {
        alert(response.status);
      }
    } catch (err) {
      if (err?.response) {
        setErrMsg("No server response.");
      } else if (err.response?.status === 400) {
        setErrMsg("Username is taken");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Registration Failed");
      }
      errRef.current.focus();
    }
  };

  const handleSubmitInfluencer = async (e) => {
    e.preventDefault();
    setUser("shayhayashico");
    setPwd("$Hi12345");
    // Submit the user/password combination
    try {
      const payload = JSON.stringify({
        user: "shayhayashico",
        pwd: "$Hi12345",
      });
      // axios throws errors automatically, no need for .catch
      // axios convertsd to json automatically
      const response = await axios.post(LOGIN_URL, payload, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      const accessToken = response?.data?.token;
      const roles = response?.data?.roles;
      console.log("Response Data", user, pwd, roles, accessToken);
      setAuth({ user, pwd, roles, accessToken });
      setUser("");
      setPwd("");

      if (response.status === 200) {
        // clear previous local storage
        localStorage.clear();
        // store the login token
        console.log("Received token and set to local storage:", response.data);
        localStorage.setItem("token", JSON.stringify(response.data));

        if (location?.state?.from) {
          navigate(location.state.from);
        }
      } else {
        alert(response.status);
      }
    } catch (err) {
      if (err?.response) {
        setErrMsg("No server response.");
      } else if (err.response?.status === 400) {
        setErrMsg("Username is taken");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Registration Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <>
      <section className="login">
        <div className="login__container-left">
          <h1 className="login__header">Sign In</h1>
          <p className="login__description mb-1p5 text--bold mb-">
            Enter your account details
          </p>
          <form onSubmit={handleSubmit} className="login-form">
            {errMsg ? <p aria-live="assertive">{errMsg}</p> : ""}
            <label htmlFor="username" className="login-form__label">
              Username
            </label>
            <input
              ref={userRef}
              onChange={(e) => {
                setUser(e.target.value);
              }}
              type="text"
              id="username"
              autoComplete="off"
              value={user}
              required
              placeholder="example@email.com"
              className="login-form__input"
            />
            <label htmlFor="pwd" className="login-form__label">
              Password
            </label>
            <input
              type="password"
              onChange={(e) => {
                setPwd(e.target.value);
              }}
              value={pwd}
              id="pwd"
              required
              placeholder="password"
              className="login-form__input login-form__input--password"
            />
            <p id="uidnote" className="login-form__instructions">
              Forgot Password?
            </p>
            <div className="flex-col-center">
              <button
                disabled={user && pwd ? false : true}
                onSubmit={handleSubmit}
                className="register__btn-cta"
              >
                Sign In
              </button>
              <p className="register__text register__text--subtle">
                New here?{" "}
                <Link
                  to="/login"
                  className="register__text register__text--subtle text--underline"
                >
                  Sign Up instead
                </Link>
              </p>
            </div>
          </form>

          {/* Demo Log-in */}
          {/* <button onClick={handleSubmitInfluencer} >
            Login as an Influencer
          </button> */}
        </div>
        <img
          src={loginImg}
          alt="black model with curly hair with left arm raised with a blue dress short hanging over her shoulders wearing a white tanktop"
          className="landing__img-right"
        />
      </section>
    </>
  );
};

export default Login;
