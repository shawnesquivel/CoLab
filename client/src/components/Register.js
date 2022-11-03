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
import "../styles/register.scss";
import colabFolderIcon from "../assets/Colab-logo.png";

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
  // other user props
  const [role, setRole] = useState("Influencer");
  const [company, setCompany] = useState("");

  // Landing page
  const [showLanding, setShowLanding] = useState(true);
  const [showInfluencerForm, setShowInfluencerForm] = useState(false);
  const [showBrandForm, setShowBrandForm] = useState(false);

  //   default focus on username
  useEffect(() => {
    // .current points to the mounted text input element
    userRef.current.focus();
  }, []);
  //   validate username
  useEffect(() => {
    // return boolean
    const result = USER_REGEX.test(user);
    setValidName(result);
  }, [user]);
  // validate password and password confirmation
  useEffect(() => {
    // returns true/false
    const result = PWD_REGEX.test(pwd);
    setValidPwd(result);
    // password confirmation
    const match = pwd === matchPwd;
    setValidMatch(match);
  }, [pwd, matchPwd]);

  //   Set Error Message
  useEffect(() => {
    setErrMsg("");
  }, [user, pwd, matchPwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // If register button is hacked, validate username/pwd again here and in backend
    const v1 = USER_REGEX.test(user);
    const v2 = PWD_REGEX.test(pwd);
    if (!v1 || !v2) {
      setErrMsg("Invalid Entry");
      return;
    }
    // To skip backend - uncomment the next 2 lines.
    // setSuccess(true);
    // console.log(user, pwd);
    try {
      const payload = JSON.stringify({ user, pwd, role, company });
      console.log(payload);
      const response = await axios.post(REGISTER_URL, payload, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      console.log(response);
      if (response.status === 200) {
        setSuccess(true);
        // // Clear form inputs
        setUser("");
        setPwd("");
        setCompany("");
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
      {/* Landing Page */}
      {showLanding ? (
        <section className="landing">
          <div className="landing__container-left">
            <img src={colabFolderIcon} alt="colab folder icon" />
            <h1 className="landing__header">Let's Collaborate!</h1>
            <p className="landing__description">
              Sign up to get access to thousands of social media campaigns with
              the top brands.{" "}
            </p>
            <p className="landing__description text--bold">I am a(n):</p>
            <button
              className="landing__btn"
              onClick={() => setShowInfluencerForm(true)}
            >
              Influencer
            </button>
            <button
              className="landing__btn"
              onClick={() => setShowBrandForm(true)}
            >
              Brand
            </button>
            <p className="description-text">
              Have an account? <a className="landing__link"> Login instead </a>
            </p>
          </div>
          <img src="" alt="model in a black coat" />
        </section>
      ) : (
        ""
      )}

      {success ? (
        <section>
          <h1 className="register__success-msg">Account Created!</h1>
          <p>
            <button
              onClick={() => {
                navigate("/login");
              }}
              className="btn-dark"
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
          <h1 className="register__title">Create new account</h1>
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

            <label htmlFor="role">Role</label>
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

            <label htmlFor="company">Company or Personal Brand</label>
            <input
              type="text"
              value={company}
              onChange={(e) => {
                setCompany(e.target.value);
              }}
              placeholder=""
            />
            <button
              disabled={validName && validPwd && validMatch ? false : true}
              className=""
            >
              Create New Account
            </button>
          </form>
          <p>
            Already have an account? <br />
            <span className="line">
              <button className="register__btn-login">
                <Link to="/login">Log In</Link>
              </button>
            </span>
          </p>
        </section>
      )}
    </>
  );
};

export default Register;
