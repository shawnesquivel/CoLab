import React from "react";
import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "../api/axios";

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const CHANGEPASSWORD_URL = "/api/changepassword";

const ChangePassword = () => {
  const navigate = useNavigate(); // to use the navigate hook

  // returns a mutable object whose .current is initialized to the passed argument
  const pwdRef = useRef();
  const errRef = useRef();
  // state for old password input
  const [oldPwd, setOldPwd] = useState("");
  const [oldPwdFocus, setOldPwdFocus] = useState(false);
  // state for new password input
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
  //   default focus on username
  useEffect(() => {
    // .current points to the mounted text input element
    pwdRef.current.focus();
  }, []);

  // validate the old password and password confirmation
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
  }, [oldPwd, pwd, matchPwd]);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page refresh
    // If users somehow manually enable the Register button, do a final check on userID/password.
    // Better to do validation in the backend since frontend can be hacked
    // const v1 = USER_REGEX.test(user);
    // const v2 = PWD_REGEX.test(pwd);
    // if (!v1 || !v2) {
    //   setErrMsg("Invalid Entry");
    //   return;
    // }
    // To test form without backend
    // setSuccess(true);
    // console.log(user, pwd);
    // To Use Backend
    try {
      const payload = JSON.stringify({
        oldPwd,
        newPwd: pwd,
        token: localStorage.getItem("token"),
      });
      // With Axios
      const response = await axios.post(CHANGEPASSWORD_URL, payload, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      console.log(response);
      if (response.status === 200) {
        setSuccess(true);
        // // Clear form inputs
        setOldPwd("");
        setPwd("");
        setMatchPwd("");
      } else {
        alert(response.status);
      }
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Password error");
      } else {
        setErrMsg("Change password failed");
      }
      errRef.current.focus();
    }
  };
  return (
    <>
      {success ? (
        <section>
          <h1>Your password was changed.</h1>
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
          <h1>Change Password</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="password">Old Password:</label>
            <input
              type="password"
              id="old-password"
              ref={pwdRef}
              autoComplete="off"
              onChange={(e) => {
                setOldPwd(e.target.value);
              }}
              required
              aria-describedby="pwdnote"
              onFocus={() => setOldPwdFocus(true)}
              onBlur={() => setOldPwdFocus(false)}
            />
            <label htmlFor="password">
              New Password:
              <span className={validPwd ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span className={validPwd || !pwd ? "hide" : "invalid"}>
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
              <span aria-label="exclamation mark"> !</span>
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
            <button disabled={validPwd && validMatch ? false : true}>
              Change Password
            </button>
          </form>
        </section>
      )}
    </>
  );
};

export default ChangePassword;
