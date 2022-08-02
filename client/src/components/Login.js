import React from "react";
import { useEffect, useState, useRef, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../context/AuthProvider";
import axios from "../api/axios";

const LOGIN_URL = "/api/login";

const Login = () => {
  // sets authorization in the global context
  const { setAuth } = useContext(AuthContext);

  const navigate = useNavigate();
  const errRef = useRef();

  // Login State
  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  // Successful submission: ### TDL: Upon success, navigate to new page.
  const [success, setSuccess] = useState(false);
  // Error Message
  const [errMsg, setErrMsg] = useState("");
  // Set User Focus on page load
  const userRef = useRef();
  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    console.log("Username:", user);
    console.log("Password:", pwd);
    setErrMsg("");
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user, pwd);

    // Axios Submit
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

      console.log(JSON.stringify(response?.data));
      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;

      setAuth({ user, pwd, roles, accessToken });

      if (response.status === 200) {
        setSuccess(true);
        // clear components
        setUser("");
        setPwd("");
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
      {success ? (
        <>
          <p>Welcome to Bug Tracker, Shawn.</p>
          <Link to="/">Back to Home</Link>
        </>
      ) : (
        <section>
          <h1>Login</h1>
          <form onSubmit={handleSubmit}>
            {errMsg ? <p aria-live="assertive">{errMsg}</p> : ""}
            <label htmlFor="username">Username</label>
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
            />
            <label htmlFor="pwd">Password</label>
            <input
              type="password"
              onChange={(e) => {
                setPwd(e.target.value);
              }}
              value={pwd}
              id="pwd"
              required
            />
            <button
              disabled={user && pwd ? false : true}
              onSubmit={handleSubmit}
            >
              Sign In
            </button>
          </form>
          <p>Need an account?</p>
          <span className="line">
            <button>
              <Link to="/">Register</Link>
            </button>
          </span>
        </section>
      )}
    </>
  );
};

export default Login;
