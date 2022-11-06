import React from "react";
import { useRef, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  faCheck,
  faTimes,
  faInfoCircle,
  faArrowLeftLong,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "../api/axios";
import "../styles/register.scss";

// const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = "/api/register";

const RegisterForm = ({
  showInfluencerForm,
  showBrandForm,
  handleShowForms,
  role,
}) => {
  const navigate = useNavigate(); // to use the navigate hook

  // returns a mutable object whose .current is initialized to the passed argument
  const userRef = useRef();
  const errRef = useRef();
  // state for user input
  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

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

  const [company, setCompany] = useState("");

  // Form Pages
  const [showInfluencerPageOne, setShowInfluencerPageOne] = useState(true);
  const [showBrandPageOne, setShowBrandPageOne] = useState(true);
  const [showBrandPageTwo, setShowBrandPageTwo] = useState(true);

  //   default focus on username
  // useEffect(() => {
  //   // .current points to the mounted text input element
  //   userRef.current.focus();
  // }, []);
  //   validate username
  // useEffect(() => {
  //   // return boolean
  //   const result = USER_REGEX.test(user);
  //   setValidName(result);
  // }, [user]);
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
    setShowInfluencerPageOne(false);
    setShowBrandPageOne(false);
    console.log("inside handle submit");

    // If register button is hacked, validate username/pwd again here and in backend
    // const v1 = USER_REGEX.test(user);
    const v2 = PWD_REGEX.test(pwd);
    if (!v2) {
      setErrMsg("Invalid Entry");
      return;
    }
    // To skip backend - uncomment the next 2 lines.
    // setSuccess(true);
    // console.log(user, pwd);
    try {
      const payload = JSON.stringify({
        user,
        pwd,
        role,
        company,
        firstName,
        lastName,
      });
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
      {success ? (
        <section>
          <h1 className="register__success-msg mb-1">Account Created!</h1>
          <p>
            <button
              onClick={() => {
                navigate("/login");
              }}
              className="register__btn-cta"
            >
              Sign In
            </button>
          </p>
        </section>
      ) : (
        <>
          {/* Influencer Sign Up Form */}
          {showInfluencerForm && !showBrandForm ? (
            <section className="landing__container-left">
              <p
                ref={errRef}
                className={errMsg ? "errmsg" : "offscreen"}
                aria-live="assertive"
              >
                {errMsg}
              </p>
              <button
                onClick={(e) => {
                  handleShowForms(e, "reset");
                }}
                className="register__btn-back mb-1"
              >
                <FontAwesomeIcon icon={faArrowLeftLong} className="icon-left" />
                Not an influencer?
              </button>
              <h1 className="register__title">Welcome to the club!</h1>
              <p className="register__description mb-1p5">
                Just a few more steps to get access to thousands of social media
                campaigns with the top brands.
              </p>
              <h4 className="mb-1">Create an Account</h4>
              {showInfluencerPageOne ? (
                <>
                  <form onSubmit={handleSubmit} className="form">
                    <label htmlFor="firstName" className="form__label">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      autoComplete="off"
                      onChange={(e) => {
                        setFirstName(e.target.value);
                      }}
                      required
                      placeholder="first name"
                      className="form__input"
                    />
                    <label htmlFor="lastName" className="form__label">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      autoComplete="off"
                      onChange={(e) => {
                        setLastName(e.target.value);
                      }}
                      required
                      placeholder="last name"
                      className="form__input"
                    />
                    <label htmlFor="username" className="form__label">
                      Email:
                    </label>
                    <input
                      type="email"
                      id="username"
                      ref={userRef}
                      autoComplete="off"
                      onChange={(e) => {
                        setUser(e.target.value);
                      }}
                      required
                      onFocus={() => setUserFocus(true)}
                      onBlur={() => setUserFocus(false)}
                      placeholder="email"
                      className="form__input"
                    />
                    <div className="form__label-row-container">
                      <label htmlFor="password" className="form__label">
                        Password:
                        <span className={validPwd ? "valid" : "hide"}>
                          <FontAwesomeIcon icon={faCheck} />
                        </span>
                        <span className={validPwd || !pwd ? "hide" : "invalid"}>
                          <FontAwesomeIcon icon={faTimes} />
                        </span>
                      </label>
                    </div>

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
                      placeholder="password"
                      className="form__input form__input--password"
                    />
                    <p
                      id="uidnote"
                      className="form__instructions"
                      // className={
                      //   !validPwd
                      //     ? "form__instructions"
                      //     : "form__instructions--offscreen"
                      // }
                    >
                      Use 8 or more characters with at least one upper case
                      letter, lower case letter, number, and special character.
                    </p>
                    <label htmlFor="confirm_pwd" className="form__label">
                      Confirm Password:
                      <span
                        className={validMatch && matchPwd ? "valid" : "hide"}
                      >
                        <FontAwesomeIcon icon={faCheck} />
                      </span>
                      <span
                        className={validMatch || !matchPwd ? "hide" : "invalid"}
                      >
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
                      placeholder="confirm password"
                      className={
                        validMatch || !matchPwd
                          ? "form__input"
                          : "form__input--invalid"
                      }
                    />

                    <div className="flex-col-center">
                      <button className="register__btn-cta">
                        Create New Account
                      </button>
                      <p className="register__text register__text--subtle">
                        Already have an account?{" "}
                        <Link
                          to="/login"
                          className="register__text register__text--subtle text--underline"
                        >
                          Log In Instead
                        </Link>
                      </p>
                    </div>
                  </form>
                </>
              ) : (
                ""
              )}
            </section>
          ) : (
            ""
          )}

          {/* Brand Sign Up Form */}

          {showBrandForm && !showInfluencerForm ? (
            <section className="landing__container-left">
              <p
                ref={errRef}
                className={errMsg ? "errmsg" : "offscreen"}
                aria-live="assertive"
              >
                {errMsg}
              </p>
              <button
                onClick={(e) => {
                  handleShowForms(e, "reset");
                }}
                className="register__btn-back mb-1"
              >
                <FontAwesomeIcon icon={faArrowLeftLong} className="icon-left" />
                Not a brand?
              </button>
              <h1 className="register__title">Welcome to the club!</h1>
              <p className="register__description mb-1p5">
                Just a few more steps to get access to thousands of
                micro-influencers, perfect for your next campaign.
              </p>
              <h4 className="mb-1">Create an Account</h4>
              {showInfluencerPageOne ? (
                <>
                  <form onSubmit={handleSubmit} className="form">
                    <label htmlFor="firstName" className="form__label">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      autoComplete="off"
                      onChange={(e) => {
                        setFirstName(e.target.value);
                      }}
                      required
                      placeholder="first name"
                      className="form__input"
                    />
                    <label htmlFor="lastName" className="form__label">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      autoComplete="off"
                      onChange={(e) => {
                        setLastName(e.target.value);
                      }}
                      required
                      placeholder="last name"
                      className="form__input"
                    />
                    <label htmlFor="username" className="form__label">
                      Email:
                    </label>
                    <input
                      type="email"
                      id="username"
                      ref={userRef}
                      autoComplete="off"
                      onChange={(e) => {
                        setUser(e.target.value);
                      }}
                      required
                      onFocus={() => setUserFocus(true)}
                      onBlur={() => setUserFocus(false)}
                      placeholder="email"
                      className="form__input"
                    />
                    <div className="form__label-row-container">
                      <label htmlFor="password" className="form__label">
                        Password:
                        <span className={validPwd ? "valid" : "hide"}>
                          <FontAwesomeIcon icon={faCheck} />
                        </span>
                        <span className={validPwd || !pwd ? "hide" : "invalid"}>
                          <FontAwesomeIcon icon={faTimes} />
                        </span>
                      </label>
                    </div>

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
                      placeholder="password"
                      className="form__input form__input--password"
                    />
                    <p
                      id="uidnote"
                      className="form__instructions"
                      // className={
                      //   !validPwd
                      //     ? "form__instructions"
                      //     : "form__instructions--offscreen"
                      // }
                    >
                      Use 8 or more characters with at least one upper case
                      letter, lower case letter, number, and special character.
                    </p>
                    <label htmlFor="confirm_pwd" className="form__label">
                      Confirm Password:
                      <span
                        className={validMatch && matchPwd ? "valid" : "hide"}
                      >
                        <FontAwesomeIcon icon={faCheck} />
                      </span>
                      <span
                        className={validMatch || !matchPwd ? "hide" : "invalid"}
                      >
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
                      placeholder="confirm password"
                      className={
                        validMatch || !matchPwd
                          ? "form__input"
                          : "form__input--invalid"
                      }
                    />

                    <div className="flex-col-center">
                      <button className="register__btn-cta">
                        Create New Account
                      </button>
                      <p className="register__text register__text--subtle">
                        Already have an account?{" "}
                        <Link
                          to="/login"
                          className="register__text register__text--subtle text--underline"
                        >
                          Log In Instead
                        </Link>
                      </p>
                    </div>
                  </form>
                </>
              ) : (
                ""
              )}
            </section>
          ) : (
            ""
          )}
        </>
      )}
    </>
  );
};

export default RegisterForm;
