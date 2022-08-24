import React from "react";
import { useRef, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "../api/axios";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = "/api/register";

const Register = () => {
  const navigate = useNavigate(); // to use the navigate hook

  // returns a mutable object whose .current is initialized to the passed argument
  const userRef = useRef();
  const errRef = useRef();
  // state for user input
  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);
  // state for password input
  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);
  // state for password confirmation
  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);
  //   state for  successful registration
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);
  // set role
  const [role, setRole] = useState("Influencer");

  //   default focus on username
  useEffect(() => {
    // .current points to the mounted text input element
    userRef.current.focus();
  }, []);
  //   validate username
  useEffect(() => {
    // return boolean
    const result = USER_REGEX.test(user);
    console.log("Username validity:", result);
    console.log("User ID:", user);
    setValidName(result);
  }, [user]);
  // validate password and password confirmation
  useEffect(() => {
    // returns true/false
    const result = PWD_REGEX.test(pwd);
    console.log("Password Validity:", result);
    console.log("Password:", pwd);
    setValidPwd(result);
    // password confirmation
    const match = pwd === matchPwd;
    setValidMatch(match);
  }, [pwd, matchPwd]);

  //   error message
  useEffect(() => {
    setErrMsg("");
  }, [user, pwd, matchPwd]);
  // Role selected
  useEffect(() => {
    console.log(role);
  }, [role]);
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page refresh
    // If users somehow manually enable the Register button, do a final check on userID/password.
    // Better to do validation in the backend since frontend can be hacked
    const v1 = USER_REGEX.test(user);
    const v2 = PWD_REGEX.test(pwd);
    if (!v1 || !v2) {
      setErrMsg("Invalid Entry");
      return;
    }
    // To test form without backend
    // setSuccess(true);
    // console.log(user, pwd);
    // To Use Backend
    try {
      const payload = JSON.stringify({ user, pwd, role });
      console.log(payload);
      // With Axios
      const response = await axios.post(REGISTER_URL, payload, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      // With Fetch
      // const response = await fetch("http://localhost:5000/api/register", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: payload,
      // }).then((res) => res.json());
      // Check the response

      console.log(response);
      if (response.status === 200) {
        setSuccess(true);
        // // Clear form inputs
        setUser("");
        setPwd("");
        setMatchPwd("");
      } else {
        alert(response.status);
      }
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Username is taken");
      } else {
        setErrMsg("Registration Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <>
      {success ? (
        <section>
          <h1>Account Created!</h1>
          <p>
            <button
              onClick={() => {
                navigate("/login");
              }}
            >
              Sign In
            </button>
          </p>
        </section>
      ) : (
        <section>
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <h1>Register</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="username">
              Username:
              <span className={validName ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span className={validName || !user ? "hide" : "invalid"}>
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </label>
            <input
              type="text"
              id="username"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => {
                setUser(e.target.value);
              }}
              required
              aria-invalid={validName ? "false" : "true"}
              aria-describedby="uidnote"
              onFocus={() => setUserFocus(true)}
              onBlur={() => setUserFocus(false)}
            />
            <p
              id="uidnote"
              className={
                userFocus && user && !validName ? "instructions" : "offscreen"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              4 to 24 characters. <br />
              Must begin with a letter. <br />
              Can include any letters, numbers, underscores, and hyphens.
            </p>
            <label htmlFor="password">
              Password:
              <span className={validPwd ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span className={validPwd || !user ? "hide" : "invalid"}>
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </label>
            <input
              type="password"
              id="password"
              onChange={(e) => {
                setPwd(e.target.value);
              }}
              required
              aria-invalid={validPwd ? "false" : "true"}
              aria-describedby="pwdnote"
              onFocus={() => setPwdFocus(true)}
              onBlur={() => setPwdFocus(false)}
            />
            <p
              id="uidnote"
              className={
                pwdFocus && pwd && !validPwd ? "instructions" : "offscreen"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              8 to 24 characters. <br />
              Must include uppercase and lower case letters, a number, and a
              special character <br />
              Allowed special characters
              <span aria-label="exclamation mark">!</span>
              <span aria-label="at symbol">@</span>
              <span aria-label="hashtag">#</span>
              <span aria-label="dollar sign">$</span>
              <span aria-label="perecent">%</span>
            </p>

            <label htmlFor="confirm_pwd">
              Confirm Password:
              <span className={validMatch && matchPwd ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span className={validMatch || !matchPwd ? "hide" : "invalid"}>
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </label>
            <input
              type="password"
              id="confirm_pwd"
              onChange={(e) => setMatchPwd(e.target.value)}
              required
              aria-invalid={validMatch ? "false" : "true"}
              aria-describedby="confirmnote"
              onFocus={() => setMatchFocus(true)}
              onBlur={() => setMatchFocus(false)}
            />
            <p
              id="confirmnote"
              className={
                matchFocus && !validMatch ? "instructions" : "offscreen"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              Confirmation password does not match.
            </p>

            <label htmlFor="role">
              Role:
              {/* <span className={validName ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span className={validName || !user ? "hide" : "invalid"}>
                <FontAwesomeIcon icon={faTimes} />
              </span> */}
            </label>
            <select
              value={role}
              onChange={(e) => {
                setRole(e.target.value);
              }}
              required
            >
              <option value="Influencer">Influencer</option>
              <option value="Brand">Brand</option>
              <option value="Admin">Admin</option>
            </select>
            <button
              disabled={validName && validPwd && validMatch ? false : true}
            >
              Sign Up
            </button>
          </form>
          <p>
            Already registered? <br />
            <span className="line">
              <button>
                <Link to="/login">Sign In</Link>
              </button>
            </span>
          </p>
        </section>
      )}
    </>
  );
};

export default Register;
