import React, { useState } from "react";

import ReactDOM from "react-dom";
import {
  faUser,
  faClock,
  faPlus,
  faArrowRight,
  faArrowLeft,
  faSquareMinus,
} from "@fortawesome/free-solid-svg-icons";

import { faCalendar } from "@fortawesome/free-regular-svg-icons";
import {
  faInstagram,
  faTiktok,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useAuth from "../hooks/useAuth";
import axios from "../api/axios";
import AuthContext from "../context/AuthProvider";

const MODAL_STYLES = {
  position: "fixed",
  top: "50%",
  left: "70%",
  transform: "translate(0%, -50%)",
  backgroundColor: "#fefcfb",
  padding: "50px",
  zIndex: 1000,
};

const OVERLAY_STYLES = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, .7)",
  zIndex: 100,
  maxHeight: "100vh",
};

const CREATEPROJECT_URL = "/api/createproject";

const CreateProjectModal = ({ isOpen, onClose, children, brand }) => {
  const changeStatus = (status) => {
    // e.preventDefault();
    console.log(status);
  };
  const { auth } = useAuth(AuthContext);
  // useEffect(() => {
  //   console.log(auth.roles);
  // }, []);

  // Create New Project
  const [title, setTitle] = useState("Test Project");
  const [influencerAssigned, setInfluencerAssigned] = useState("kyliejenner");
  const [instagramDeliverable, setInstagramDeliverable] =
    useState("Post a story");
  const [tiktokDeliverable, setTiktokDeliverable] =
    useState("10-20sec Tik Tok");
  const [youtubeDeliverable, setYoutubeDeliverable] =
    useState("15-30 sec ad read");

  const [reviewDeadline, setReviewDeadline] = useState("2023-01-31");
  const [deadline, setDeadline] = useState("2025-01-31");
  const [deadlineTime, setDeadlineTime] = useState("23:59");
  const [numberOfRevisions, setNumberOfRevisions] = useState("2");

  // Form Pages
  const [showContractDetails, setShowContractDetails] = useState(true);
  const [showContractGuidelines, setShowContractGuidelines] = useState(false);
  const [showContractPayment, setShowContractPayment] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Payment Page
  const [paymentMethod, setPaymentMethod] = useState("wire transfer");
  const [paymentPrice, setPaymentPrice] = useState(100);
  const [paymentProduct, setPaymentProduct] = useState("lotion");

  // Project Guidelines
  const [keywords, setKeywords] = useState([]);
  const [hashtags, setHashtags] = useState([]);
  const [tags, setTags] = useState([]);
  const [phrases, setPhrases] = useState([]);
  const [linkInBio, setLinkInBio] = useState(
    "https://glossier.com/products/cloud-paint"
  );

  // Project Guideline Helper Functions
  const handleKeyDown = async (e) => {
    // console.log(e.target.className);
    if (e.key !== "Enter") return;
    const value = e.target.value;
    if (!value.trim()) return;
    if (e.target.className === "keywords-input") {
      setKeywords([...keywords, value]);
      console.log(keywords);
    }
    if (e.target.className === "hashtags-input") {
      setHashtags([...hashtags, value]);
      console.log(hashtags);
    }
    if (e.target.className === "tags-input") {
      setTags([...tags, value]);
      console.log(tags);
    }
    if (e.target.className === "phrases-input") {
      setPhrases([...phrases, value]);
      console.log(phrases);
    }
    e.target.value = "";
  };
  // Removing keywords, hashtags, etc.
  const removeKeyword = (deleteIndex) => {
    setKeywords(keywords.filter((keyword, index) => index !== deleteIndex));
  };

  // Form Submit
  const submitProject = async (e) => {
    e.preventDefault();
    const user = auth?.username;
    console.log(
      "Project Token:",
      auth.user,
      title,
      influencerAssigned,
      instagramDeliverable,
      tiktokDeliverable,
      youtubeDeliverable,
      reviewDeadline,
      deadline,
      deadlineTime,
      numberOfRevisions,
      paymentMethod,
      paymentPrice,
      paymentProduct,
      keywords,
      hashtags,
      tags,
      phrases,
      linkInBio,
      brand
    );

    try {
      const payload = JSON.stringify({
        token: localStorage.getItem("token"),
        brandRepAssigned: auth.user,
        title,
        brand,
        influencerAssigned,
        instagramDeliverable,
        tiktokDeliverable,
        youtubeDeliverable,
        reviewDeadline: new Date(),
        deadline: new Date(),
        deadlineTime,
        numberOfRevisions,
        paymentMethod,
        paymentPrice,
        paymentProduct,
        keywords,
        hashtags,
        tags,
        phrases,
        linkInBio,
      });
      console.log("logging the form submission", payload);
      console.log("logging the date object", typeof deadline);

      const response = await axios.post(CREATEPROJECT_URL, payload, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      console.log("Response Data", response);
    } catch (err) {
      console.log(err);
    }
  };

  if (!isOpen) return null;
  return ReactDOM.createPortal(
    // #to-do: switch from in-line style to className style
    <div style={OVERLAY_STYLES} className="">
      <div style={MODAL_STYLES} className="">
        <p style={{ color: "black" }}></p>
        <form action="">
          <div className="create-project-container">
            <form>
              {showContractDetails ? (
                <div className="create-project-page">
                  <div className="create-project-header">
                    <h2 className="create-project-header">
                      Create a New Project 🎨
                    </h2>
                    <button
                      className="create-project-close-project-btn"
                      onClick={onClose}
                      type="button"
                    >
                      <FontAwesomeIcon
                        icon={faSquareMinus}
                        className="icon-left"
                      />
                      Hide
                    </button>
                  </div>
                  <label htmlFor="title">Project Title</label>
                  <input
                    onChange={(e) => {
                      setTitle(e.target.value);
                    }}
                    type="text"
                    id="title"
                    autoComplete="off"
                    value={title}
                    required
                    placeholder="E.g., Fall Summer Promo"
                  />
                  <label htmlFor="influencer">
                    <FontAwesomeIcon className="icon-left" icon={faUser} />
                    Influencer Assigned
                  </label>
                  <input
                    onChange={(e) => {
                      setInfluencerAssigned(e.target.value);
                    }}
                    type="text"
                    id="influencer"
                    autoComplete="off"
                    value={influencerAssigned}
                    required
                    placeholder="For testing: shawnchemicalengineer or shayhayashico"
                  />
                  <label htmlFor="instagramdeliverable">
                    <FontAwesomeIcon className="icon-left" icon={faInstagram} />
                    Instagram Deliverable
                  </label>
                  <input
                    type="text"
                    onChange={(e) => {
                      setInstagramDeliverable(e.target.value);
                    }}
                    placeholder="For example: 1 instagram story featuring the product"
                    value={instagramDeliverable}
                  />
                  <label htmlFor="tiktokdeliverable">
                    <FontAwesomeIcon className="icon-left" icon={faTiktok} />
                    Tik Tok Deliverable
                  </label>
                  <input
                    type="text"
                    onChange={(e) => {
                      setTiktokDeliverable(e.target.value);
                    }}
                    placeholder="For example: A 15-20sec tik tok"
                    value={tiktokDeliverable}
                  />
                  <label htmlFor="youtubedeliverable">
                    <FontAwesomeIcon className="icon-left" icon={faYoutube} />
                    YouTube Deliverable
                  </label>
                  <input
                    type="text"
                    onChange={(e) => {
                      setYoutubeDeliverable(e.target.value);
                    }}
                    placeholder="Minimum 30 sec product mention during video"
                    value={youtubeDeliverable}
                  />
                  <label htmlFor="reviewdeadline">
                    <FontAwesomeIcon className="icon-left" icon={faCalendar} />
                    Deadline to Submit for First Review
                  </label>
                  <input
                    onChange={(e) => {
                      setReviewDeadline(e.target.value);
                    }}
                    type="date"
                    id="reviewdeadline"
                    autoComplete="off"
                    value={reviewDeadline}
                    required
                  />
                  <label htmlFor="deadline">
                    <FontAwesomeIcon className="icon-left" icon={faCalendar} />
                    Deadline to Post the Final Deliverable(s)
                  </label>
                  <input
                    onChange={(e) => {
                      setDeadline(e.target.value);
                    }}
                    type="date"
                    id="deadline"
                    autoComplete="off"
                    value={deadline}
                    required
                  />
                  <label htmlFor="time">
                    <FontAwesomeIcon className="icon-left" icon={faClock} />
                    Deadline Time
                  </label>
                  <input
                    onChange={(e) => {
                      setDeadlineTime(e.target.value);
                    }}
                    type="time"
                    id="time"
                    autoComplete="off"
                    value={deadlineTime}
                    required
                  />

                  <label htmlFor="numberofrevisions">
                    Revisions Required (3 max)
                  </label>
                  <p className="note__italic">
                    Enter a number from 0-2. More revisions decreases the
                    likelihood of an influencers to accept the contract.
                  </p>
                  <input
                    type="text"
                    placeholder="Enter a number"
                    onChange={(e) => {
                      setNumberOfRevisions(e.target.value);
                    }}
                    value={numberOfRevisions}
                  />
                  <button
                    onClick={() => {
                      setShowContractDetails(false);
                      setShowContractPayment(true);
                    }}
                    type="button"
                  >
                    <FontAwesomeIcon
                      className="icon-left"
                      icon={faArrowRight}
                    />
                    Next Page
                  </button>
                </div>
              ) : (
                ""
              )}
              {showContractPayment ? (
                <div className="create-project-page">
                  <div className="create-project-header">
                    <h2 className="create-project-header">
                      Payment Details 💳
                    </h2>
                    <button
                      className="create-project-close-project-btn"
                      onClick={onClose}
                      type="button"
                    >
                      <FontAwesomeIcon
                        icon={faSquareMinus}
                        className="icon-left"
                      />
                      Hide
                    </button>
                  </div>

                  <label htmlFor="paymentmethod">
                    Select your method of cash payment 💵
                    <select
                      value={paymentMethod}
                      onChange={(e) => {
                        console.log(e.target.value);
                        setPaymentMethod(e.target.value);
                      }}
                    >
                      <option value="wire transfer">Wire Transfer</option>
                      <option value="paypal">Paypal</option>
                      <option value="none">None - Product Only</option>
                    </select>
                  </label>
                  <label htmlFor="paymentproduct">
                    Select the gifted product 🎁
                    <select
                      value={paymentProduct}
                      onChange={(e) => {
                        console.log(e.target.value);
                        setPaymentProduct(e.target.value);
                      }}
                    >
                      <option value="lotion">Lotion</option>
                      <option value="headphones">Headphones</option>
                      <option value="none">None - Cash Only</option>
                    </select>
                  </label>
                  <label htmlFor="paymentprice">Payment Amount ($CAD)</label>
                  <input
                    type="text"
                    value={paymentPrice}
                    onChange={(e) => setPaymentPrice(e.target.value)}
                  />
                  <button
                    onClick={() => {
                      setShowContractPayment(false);
                      setShowContractDetails(true);
                    }}
                    type="button"
                  >
                    <FontAwesomeIcon className="icon-left" icon={faArrowLeft} />
                    Previous Page
                  </button>
                  <button
                    onClick={() => {
                      setShowContractPayment(false);
                      setShowContractGuidelines(true);
                    }}
                    type="button"
                  >
                    <FontAwesomeIcon
                      className="icon-left"
                      icon={faArrowRight}
                    />
                    Next Page
                  </button>
                </div>
              ) : (
                ""
              )}

              {showContractGuidelines ? (
                <div className="create-project-page">
                  <div className="create-project-header">
                    <h2 className="create-project-header">
                      Contract Guidelines
                    </h2>
                    <button
                      className="create-project-close-project-btn"
                      onClick={onClose}
                      type="button"
                    >
                      <FontAwesomeIcon
                        icon={faSquareMinus}
                        className="icon-left"
                      />
                      Hide
                    </button>
                  </div>

                  <label htmlFor="keywords">
                    Please add some keywords that describe your project
                    <br />
                    <span className="note__italic">
                      E.g., sustainability, fashion, fitness, lifestyle
                    </span>
                  </label>
                  <p></p>
                  <div className="keywords-container">
                    {keywords.map((keyword, index) => (
                      <div className="keywords-item" key={index}>
                        <span className="keywords-text">{keyword}</span>
                        <span
                          onClick={() => removeKeyword(index)}
                          className="keywords-delete"
                        >
                          &times;
                        </span>
                      </div>
                    ))}
                    <input
                      onKeyDown={handleKeyDown}
                      type="text"
                      className="keywords-input"
                      placeholder="Add a keyword"
                    />
                  </div>
                  <label htmlFor="hashtags">
                    Are there any required hashtags?
                    <br />
                    <span className="note__italic">
                      E.g., #glossier, #ad, #bossbabe, #studentlife
                    </span>
                  </label>
                  <p></p>
                  <div className="keywords-container">
                    {hashtags.map((hashtag, index) => (
                      <div className="keywords-item" key={index}>
                        <span className="keywords-text">{hashtag}</span>
                        <span
                          onClick={() => removeKeyword(index)}
                          className="keywords-delete"
                        >
                          &times;
                        </span>
                      </div>
                    ))}
                    <input
                      onKeyDown={handleKeyDown}
                      type="text"
                      className="hashtags-input"
                      placeholder="Add a hashtag"
                    />
                  </div>
                  <label htmlFor="tags">
                    Are there any required tags?
                    <br />
                    <span className="note__italic">
                      E.g., @glossier, @saje, @nike
                    </span>
                  </label>
                  <p></p>
                  <div className="keywords-container">
                    {tags.map((tag, index) => (
                      <div className="keywords-item" key={index}>
                        <span className="keywords-text">{tag}</span>
                        <span
                          onClick={() => removeKeyword(index)}
                          className="keywords-delete"
                        >
                          &times;
                        </span>
                      </div>
                    ))}
                    <input
                      onKeyDown={handleKeyDown}
                      type="text"
                      className="tags-input"
                      placeholder="Add a tag"
                    />
                  </div>
                  <label htmlFor="phrases">
                    Are there any recommended phrases?
                    <br />
                    <span className="note__italic">
                      E.g., I love how natural it looks. It's a part of my
                      everyday makeup look.
                    </span>
                  </label>
                  <p></p>
                  <div className="keywords-container">
                    {phrases.map((phrase, index) => (
                      <div className="keywords-item" key={index}>
                        <span className="keywords-text">{phrase}</span>
                        <span
                          onClick={() => removeKeyword(index)}
                          className="keywords-delete"
                        >
                          &times;
                        </span>
                      </div>
                    ))}
                    <input
                      onKeyDown={handleKeyDown}
                      type="text"
                      className="phrases-input"
                      placeholder="Add a phrase"
                    />
                  </div>
                  <label htmlFor="linkinbio">Link in Bio</label>
                  <span className="note__italic"></span>
                  <input
                    onChange={(e) => {
                      setLinkInBio(e.target.value);
                    }}
                    value={linkInBio}
                    type="url"
                    id="linkinbio"
                    name="linkinbio"
                    placeholder="https://glossier.com/products/cloud-paint"
                  />
                  <button
                    onClick={() => {
                      setShowContractGuidelines(false);
                      setShowContractPayment(true);
                    }}
                    type="button"
                  >
                    <FontAwesomeIcon className="icon-left" icon={faArrowLeft} />
                    Previous Page
                  </button>
                  <button type="button" onClick={submitProject}>
                    <FontAwesomeIcon className="icon-left" icon={faPlus} />
                    Create Project
                  </button>
                </div>
              ) : (
                " "
              )}
            </form>
          </div>
        </form>
      </div>
    </div>,
    document.getElementById("portal")
  );
};

export default CreateProjectModal;
