import React, { useEffect, useState } from "react";

import ReactDOM from "react-dom";
import {
  faUser,
  faClock,
  faPlus,
  faArrowRight,
  faArrowLeft,
  faSquareMinus,
  faX,
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
import greyCircle from "../assets/greycircle.jpg";
import "../styles/createprojectmodal.scss";
import "../styles/dashboard.scss";

const MODAL_STYLES = {
  position: "fixed",
  top: "50%",
  right: "0%",
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
};

const CREATEPROJECT_URL = "/api/createproject";
const ADD_PROJECT_IMAGES_URL = "/api/addprojectimage";

const CreateProjectModal = ({
  isOpen,
  onClose,
  children,
  brand,
  OVERLAY_STYLES,
}) => {
  const { auth } = useAuth(AuthContext);

  // Create New Project
  const [title, setTitle] = useState("Test Project");
  const [influencerAssigned, setInfluencerAssigned] = useState("none");
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
  const [showUpload, setShowUpload] = useState(false);
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

  // Project
  const [socialExample, setSocialExample] = useState("");
  const [uploadSuccessMsg, setUploadSuccessMsg] = useState("");

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

      console.log("Response Data", response, response.data.project);
      setShowSuccess(true);
      setProject(response.data.project);

      setShowContractGuidelines(false);
      setShowUpload(true);
    } catch (err) {
      console.log(err);
    }
  };

  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);
  const [awsImage, setAwsImage] = useState("");
  // holds the new project ID after succesful project creation
  const [project, setProject] = useState("");

  useEffect(() => {
    console.log(project);
  }, [project]);

  const uploadImgFileHandler = (e) => {
    console.log("file was chosen", e.target.files[0]);
    setSelectedFile(e.target.files[0]);
    setIsFilePicked(true);
  };

  const handleAwsUpload = async (e, type) => {
    e.preventDefault();
    let amazonURL;
    let file;
    let contentType;
    // get secure url from server
    if (type === "image") {
      file = selectedFile;
      contentType = "multipart/form-data";
    }
    try {
      const res = await axios.get("/api/s3");
      amazonURL = res.data.url;
      console.log("got the secure url from S3", amazonURL);
    } catch (error) {
      console.log(error);
    }

    // post the image to S3
    await fetch(amazonURL, {
      method: "PUT",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      // withCredentials: true,
      body: file,
    });

    if (type === "image") {
      const imageURL = amazonURL.split("?")[0];
      console.log(imageURL);

      setAwsImage(imageURL);

      updateProjectExamples(imageURL);
    }
  };

  const updateProjectExamples = async (imageID, social) => {
    console.log("Image ID", imageID);
    console.log("Project ID", project._id);
    console.log("Adding an example to:", socialExample);

    try {
      const payload = JSON.stringify({
        projectID: project._id,
        imageURL: imageID,
        social: socialExample,
      });
      console.log("Update Profile Payload", payload);
      const response = await axios.post(ADD_PROJECT_IMAGES_URL, payload, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      setUploadSuccessMsg(
        `Example image for ${
          socialExample[0].toUpperCase() + socialExample.slice(1)
        } was succesfully uploaded! You may add more files for other socials.`
      );
      console.log(
        "The example image was added to the project",
        response.data.project
      );

      // reset
      setSocialExample("");

      if (response.status === 200) {
      } else {
        alert(response.status);
      }
    } catch (err) {
      console.log(err);
    }
  };

  if (!isOpen) return null;
  return ReactDOM.createPortal(
    // #to-do: switch from in-line style to className style
    <div style={OVERLAY_STYLES} className="create-project__overlay-modal">
      <div style={MODAL_STYLES} className="create-project__project-modal">
        <p style={{ color: "black" }}></p>
        {/* <form action=""> */}
        <div className="create-project">
          <button
            className="create-project__hide-btn"
            onClick={onClose}
            type="button"
          >
            <FontAwesomeIcon icon={faX} className="icon-left" />
          </button>
          <form className="create-project-form">
            <h2 className="create-project__text create-project__text--header">
              Create a Campaign
            </h2>
            {showContractDetails ? (
              <div className="create-project-page">
                <div className="create-project-header">
                  <p></p>
                </div>
                <label htmlFor="title" className="create-project-form__label">
                  Campaign Title
                </label>
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
                  className="create-project-form__input"
                />
                <label
                  htmlFor="influencer"
                  className="create-project-form__label"
                >
                  <FontAwesomeIcon className="icon-left" icon={faUser} />
                  Assign a specific influencer (optional)
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
                  className="create-project-form__input"
                />
                <label
                  htmlFor="instagramdeliverable"
                  className="create-project-form__label"
                >
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
                  className="create-project-form__input"
                />
                <label
                  htmlFor="tiktokdeliverable"
                  className="create-project-form__label"
                >
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
                <label
                  htmlFor="youtubedeliverable"
                  className="create-project-form__label"
                >
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
                <label
                  htmlFor="reviewdeadline"
                  className="create-project-form__label"
                >
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
                <label
                  htmlFor="deadline"
                  className="create-project-form__label"
                >
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
                <label htmlFor="time" className="create-project-form__label">
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
                  <FontAwesomeIcon className="icon-left" icon={faArrowRight} />
                  Next Page
                </button>
              </div>
            ) : (
              ""
            )}
            {showContractPayment ? (
              <div className="create-project-page">
                <div className="create-project-header">
                  <h2 className="create-project-header">Payment Details 💳</h2>
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
                  Select your method of payment 💵
                  <select
                    value={paymentMethod}
                    onChange={(e) => {
                      console.log(e.target.value);
                      setPaymentMethod(e.target.value);
                    }}
                  >
                    <option value="wire transfer">Stripe</option>
                    <option value="paypal">Paypal</option>
                    <option value="none">None - Product Only</option>
                  </select>
                </label>
                <label htmlFor="paymentproduct">
                  Describe the product you are sending
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
                  <FontAwesomeIcon className="icon-left" icon={faArrowRight} />
                  Next Page
                </button>
              </div>
            ) : (
              ""
            )}

            {showContractGuidelines ? (
              <div className="create-project-page">
                <div className="create-project-header">
                  <h2 className="create-project-header">Contract Guidelines</h2>
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

                {!showSuccess ? (
                  <>
                    <button
                      onClick={() => {
                        setShowContractGuidelines(false);
                        setShowContractPayment(true);
                      }}
                      type="button"
                    >
                      <FontAwesomeIcon
                        className="icon-left"
                        icon={faArrowLeft}
                      />
                      Previous Page
                    </button>
                    <button type="button" onClick={submitProject}>
                      <FontAwesomeIcon className="icon-left" icon={faPlus} />
                      Create Project
                    </button>
                  </>
                ) : (
                  ""
                )}
              </div>
            ) : (
              " "
            )}
          </form>
          {/* Update the example images */}

          {showUpload ? (
            <>
              {showSuccess ? (
                <div className="create-project__success-div">
                  <h3 className="create-project__text create-project__text--header">
                    The project was created!
                  </h3>
                  <button
                    className="create-project__hide-btn"
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
              ) : (
                ""
              )}
              <h4>Upload Examples</h4>
              <p className="create-project-form__instructions">
                Please upload any examples for the influencer to reference. E.g.
                samples, previous work by others, etc.
              </p>
              <form
                className="create-project-form"
                encType="multipart/form-data"
              >
                <label htmlFor="avatar">File Upload</label>
                <input
                  type="file"
                  id="avatar"
                  name="avatar"
                  onChange={uploadImgFileHandler}
                  required
                  className="create-project-form__input create-project-form__input--file"
                />
                <p
                  id="uidnote"
                  className="create-project-form__instructions  create-project-form__instructions--center"
                >
                  Max 2MB, .png only
                </p>
                <label htmlFor="social">Which social is this for?</label>
                <select
                  name="social"
                  id="social"
                  onChange={(e) => {
                    console.log(e.target.value);
                    setSocialExample(e.target.value);
                  }}
                  value={socialExample}
                  className="create-project-form__input create-project-form__input--select "
                >
                  <option value="none" className="create-project-form__social">
                    Select an option below
                  </option>
                  <option
                    value="instagram"
                    className="create-project-form__social"
                  >
                    Instagram
                  </option>
                  <option
                    value="tiktok"
                    className="create-project-form__social"
                  >
                    Tik Tok
                  </option>
                  <option
                    value="youtube"
                    className="create-project-form__social"
                  >
                    Youtube
                  </option>
                </select>

                {/* {isFilePicked && selectedFile.size > 2e6 ? (
                  <div>
                    <p className="update-profile__error">
                      Error: The image size exceeds the 2MB limit!
                    </p>
                  </div>
                ) : (
                  ""
                )}
                {isFilePicked && selectedFile.type !== "image/png" ? (
                  <div>
                    <p className="update-profile__error">
                      Error: The file uploaded is not a .png image!
                    </p>
                  </div>
                ) : (
                  ""
                )} */}

                <div className="flex-col-center">
                  {awsImage ? (
                    <img
                      className="create-project-form__profile-pic"
                      src={awsImage}
                      alt="aws avatar"
                    />
                  ) : (
                    <img
                      className="create-project-form__profile-pic"
                      src={greyCircle}
                      alt="blank avatar"
                    />
                  )}
                  {uploadSuccessMsg ? (
                    <p className="create-project-form__text create-project-form__text--success">
                      {uploadSuccessMsg}
                    </p>
                  ) : (
                    " "
                  )}
                  <button
                    type="submit"
                    onClick={(e) => handleAwsUpload(e, "image")}
                    className="update-profile__btn-cta"
                  >
                    Upload Photo
                  </button>
                  <button
                    className="create-project__close-btn"
                    onClick={onClose}
                    type="button"
                  >
                    <FontAwesomeIcon
                      icon={faSquareMinus}
                      className="icon-left"
                    />
                    Back to Dashboard
                  </button>
                  {/* {errMsg ? (
                  <p aria-live="assertive" className="update-profile__error">
                    {errMsg}
                  </p>
                ) : (
                  ""
                )} */}
                </div>
              </form>
            </>
          ) : (
            ""
          )}
        </div>
        {/* </form> */}
      </div>
    </div>,
    document.getElementById("portal")
  );
};

export default CreateProjectModal;
