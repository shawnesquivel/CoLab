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
import AddDeliverableBtn from "./AddDeliverableBtn";

const MODAL_STYLES = {
  position: "fixed",
  top: "50%",
  right: "0%",
  transform: "translate(0%, -50%)",
  backgroundColor: "#fefcfb",
  zIndex: 1000,
};

// const OVERLAY_STYLES = {
//   position: "fixed",
//   top: 0,
//   left: 0,
//   right: 0,
//   bottom: 0,
//   backgroundColor: "rgba(0, 0, 0, .7)",
//   zIndex: 100,
// };

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

  // Form
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [influencerAssigned, setInfluencerAssigned] = useState("none");
  const [instagramDeliverable, setInstagramDeliverable] = useState("");
  const [tiktokDeliverable, setTiktokDeliverable] = useState("");
  const [youtubeDeliverable, setYoutubeDeliverable] = useState("");

  const [reviewDeadline, setReviewDeadline] = useState("2023-01-31");
  const [deadline, setDeadline] = useState("2025-01-31");
  const [deadlineTime, setDeadlineTime] = useState("23:59");
  const [numberOfRevisions, setNumberOfRevisions] = useState("2");

  // Form Pages
  const [showContractDetails, setShowContractDetails] = useState(true);
  const [showDeliverables, setShowDeliverables] = useState(false);
  const [showContractGuidelines, setShowContractGuidelines] = useState(false);
  const [showContractPayment, setShowContractPayment] = useState(false);
  const [showUpload, setShowUpload] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Payment Page
  const [showPaymentDetails, setShowPaymentDetails] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [paymentPrice, setPaymentPrice] = useState("");
  const [paymentProduct, setPaymentProduct] = useState("");

  // Project Guidelines
  const [keywords, setKeywords] = useState([]);
  const [hashtags, setHashtags] = useState([]);
  const [tags, setTags] = useState([]);
  const [phrases, setPhrases] = useState([]);
  const [linkInBio, setLinkInBio] = useState(
    "https://glossier.com/products/cloud-paint"
  );

  // Deliverables
  const [showDeliverableTwo, setShowDeliverableTwo] = useState(false);
  const [showDeliverableThree, setShowDeliverableThree] = useState(false);

  // Project
  const [socialExample, setSocialExample] = useState("");
  const [uploadSuccessMsg, setUploadSuccessMsg] = useState("");

  // Project Guideline Helper Functions
  const handleKeyDown = async (e) => {
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
  const removeKeyword = (e, deleteIndex) => {
    console.log(deleteIndex);
    console.log(e);
    if (e.target.className === "keywords-delete") {
      setKeywords(keywords.filter((keyword, index) => index !== deleteIndex));
    }
    if (e.target.className === "hashtags-delete") {
      setHashtags(hashtags.filter((keyword, index) => index !== deleteIndex));
    }
    if (e.target.className === "tags-delete") {
      setTags(tags.filter((keyword, index) => index !== deleteIndex));
    }
    if (e.target.className === "phrases-delete") {
      setPhrases(phrases.filter((keyword, index) => index !== deleteIndex));
    }
  };

  const [deliverableOneSocial, setDeliverableOneSocial] = useState("");
  const [deliverableOneDescription, setDeliverableOneDescription] =
    useState("");
  const [deliverableTwoSocial, setDeliverableTwoSocial] = useState("");
  const [deliverableTwoDescription, setDeliverableTwoDescription] =
    useState("");
  const [deliverableThreeSocial, setDeliverableThreeSocial] = useState("");
  const [deliverableThreeDescription, setDeliverableThreeDescription] =
    useState("");

  // Dynamically choose which platform's state to update
  const choosePlatform = (e) => {
    // if the div's container is for instagram, change hte instagram deliverable
    console.log(e.target.id, e.target.value);
    const social = e.target.value;
    setDeliverableOneSocial(e.target.value);
  };

  // const assignSocialDescription = (e, id) => {
  //   const num = e.target.id.split("-")[1];
  //   console.log(num);
  //   const social = "deliverable-" + num + "-social";
  //   console.log(`${"deliverable" + ""}`);
  // };

  const updateSocial = (socialPlatform, description) => {
    if (socialPlatform === "none") return;
    if (socialPlatform === "instagram") {
      setInstagramDeliverable(description);
    } else if (socialPlatform === "youtube") {
      setYoutubeDeliverable(description);
    } else if (socialPlatform === "tiktok") {
      setTiktokDeliverable(description);
    } else {
    }
  };

  // whenever social / description changes, update the necessary IG deliverable
  //  to do later: if the user starts on IG then switches to TikTok later, the IG deliverable must be reset
  useEffect(() => {
    if (!showDeliverables) return;
    console.log(deliverableOneSocial);
    console.log(deliverableOneDescription);
    updateSocial(deliverableOneSocial, deliverableOneDescription);
  }, [deliverableOneDescription, deliverableOneSocial]);
  useEffect(() => {
    if (!showDeliverables) return;
    console.log(deliverableTwoSocial);
    console.log(deliverableTwoDescription);
    updateSocial(deliverableTwoSocial, deliverableTwoDescription);
  }, [deliverableTwoDescription, deliverableTwoSocial]);
  useEffect(() => {
    if (!showDeliverables) return;
    console.log(deliverableThreeSocial);
    console.log(deliverableThreeDescription);
    updateSocial(deliverableThreeSocial, deliverableThreeDescription);
  }, [deliverableThreeDescription, deliverableThreeSocial]);

  useEffect(() => {
    console.log("instagram:", instagramDeliverable);
    console.log("youtube:", youtubeDeliverable);
    console.log("tiktok:", tiktokDeliverable);
  }, [instagramDeliverable, youtubeDeliverable, tiktokDeliverable]);

  // Create Project
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
    <div style={OVERLAY_STYLES} className="">
      <div style={MODAL_STYLES} className="create-project-modal">
        {/* <form action=""> */}
        <div className="btn-container btn-container--right">
          <button
            className="btn-container__hide-btn"
            onClick={onClose}
            type="button"
          >
            <FontAwesomeIcon icon={faX} className="icon-left" />
          </button>
        </div>
        <form className="form">
          <h2 className="form__text form__text--header">Create a Campaign</h2>
          {showContractDetails ? (
            <div className="form-page">
              <h4 className="form__text form__text--subheader">Overview</h4>
              <label htmlFor="title" className="form__label">
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
                placeholder="title"
                className="form__input"
              />
              <label htmlFor="description" className="form__label">
                Campaign Description (200 Words Max)
              </label>
              <textarea
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
                type="text"
                id="description"
                autoComplete="off"
                value={description}
                required
                placeholder="description"
                className="form__input form__input--textarea"
                rows="6"
                cols="50"
              />
              <div className="label-row-container">
                <div className="label-row-container__col">
                  <label htmlFor="influencer" className="form__label">
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
                    className="form__input"
                  />
                </div>
                <div className="label-row-container__col">
                  {" "}
                  <label htmlFor="reviewdeadline" className="form__label">
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
                    className="form__input"
                  />
                </div>
                <div className="label-row-container__col">
                  <label htmlFor="deadline" className="form__label">
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
                    className="form__input"
                  />
                </div>
                <div className="label-row-container__col">
                  {" "}
                  <label htmlFor="time" className="form__label">
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
                    className="form__input"
                  />
                </div>
              </div>
              <div className="label-row-container">
                <div className="label-row-container__col label-row-container__col--keywords">
                  <label htmlFor="keywords" className="form__label">
                    Campaign Keywords (Press Enter)
                    {/* <span className="note__italic">
                  E.g., sustainability, fashion, fitness, lifestyle
                </span> */}
                  </label>
                  <input
                    onKeyDown={handleKeyDown}
                    type="text"
                    className="keywords-input"
                    placeholder="Enter a keyword"
                  />
                  <div className="keywords-container">
                    {keywords.map((keyword, index) => (
                      <div className="keywords-item" key={index}>
                        <span className="keywords-text">{keyword}</span>
                        <span
                          onClick={(e) => removeKeyword(e, index)}
                          className="keywords-delete"
                        >
                          &times;
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="label-row-container__col label-row-container__col--revisions">
                  <label htmlFor="numberofrevisions" className="form__label">
                    Revisions Required (3 max)
                  </label>
                  <input
                    className="form__input"
                    type="text"
                    placeholder="Enter a number"
                    onChange={(e) => {
                      setNumberOfRevisions(e.target.value);
                    }}
                    value={numberOfRevisions}
                  />
                </div>
              </div>
              <div className="btn-container btn-container--center">
                <button
                  onClick={() => {
                    setShowContractDetails(false);
                    setShowDeliverables(true);
                  }}
                  type="button"
                  className="form__btn-next"
                >
                  {/* <FontAwesomeIcon className="icon-left" icon={faArrowRight} /> */}
                  Next
                </button>
              </div>
              <p className="form__text form__text--center form__text--note">
                Save as a draft
              </p>
            </div>
          ) : (
            ""
          )}

          {showDeliverables ? (
            <div className="form-page">
              <h4 className="form__text form__text--subheader">Deliverables</h4>
              <label
                className="form__label"
                htmlFor="social"
                id="deliverable-one-social"
              >
                Platform
              </label>
              <select
                name="social"
                id="deliverable-one-social"
                onChange={(e) => {
                  setDeliverableOneSocial(e.target.value);
                }}
                value={deliverableOneSocial}
                className="form__input form__input--select form__input--small"
              >
                <option value="none" className="create-project-form__social">
                  Select Platform
                </option>
                <option
                  value="instagram"
                  className="create-project-form__social"
                >
                  Instagram
                </option>
                <option value="tiktok" className="create-project-form__social">
                  Tik Tok
                </option>
                <option value="youtube" className="create-project-form__social">
                  Youtube
                </option>
              </select>
              <label
                htmlFor="description"
                className="form__label"
                id="deliverable-one-description"
              >
                Campaign Description (200 Words Max)
              </label>
              <textarea
                onChange={(e) => {
                  setDeliverableOneDescription(e.target.value);
                  // assignSocialDescription(e);
                }}
                type="text"
                id="deliverable-one-description"
                autoComplete="off"
                value={deliverableOneDescription}
                required
                placeholder="description"
                className="form__input form__input--textarea"
                rows="6"
                cols="50"
              />
              {/* Deliverable Two */}
              {showDeliverableTwo ? (
                <>
                  {" "}
                  <label
                    className="form__label"
                    htmlFor="social"
                    id="deliverable-two-social"
                  >
                    Platform
                  </label>
                  <select
                    name="social"
                    id="deliverable-two-social"
                    onChange={(e) => {
                      setDeliverableTwoSocial(e.target.value);
                    }}
                    value={deliverableTwoSocial}
                    className="form__input form__input--select "
                  >
                    <option
                      value="none"
                      className="create-project-form__social"
                    >
                      Select Platform
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
                  <label
                    htmlFor="description"
                    className="form__label"
                    id="deliverable-two-description"
                  >
                    Campaign Description (200 Words Max)
                  </label>
                  <textarea
                    onChange={(e) => {
                      setDeliverableTwoDescription(e.target.value);
                      // assignSocialDescription(e);
                    }}
                    type="text"
                    id="deliverable-one-description"
                    autoComplete="off"
                    value={deliverableTwoDescription}
                    required
                    placeholder="description"
                    className="form__input form__input--textarea"
                    rows="6"
                    cols="50"
                  />
                </>
              ) : (
                ""
              )}
              {/* Deliverable Three */}
              {showDeliverableThree ? (
                <>
                  {" "}
                  <label
                    className="form__label"
                    htmlFor="social"
                    id="deliverable-three-social"
                  >
                    Platform
                  </label>
                  <select
                    name="social"
                    id="deliverable-three-social"
                    onChange={(e) => {
                      setDeliverableThreeSocial(e.target.value);
                    }}
                    value={deliverableThreeSocial}
                    className="form__input form__input--select "
                  >
                    <option
                      value="none"
                      className="create-project-form__social"
                    >
                      Select Platform
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
                  <label
                    htmlFor="description"
                    className="form__label"
                    id="deliverable-three-description"
                  >
                    Campaign Description (200 Words Max)
                  </label>
                  <textarea
                    onChange={(e) => {
                      setDeliverableThreeDescription(e.target.value);
                      // assignSocialDescription(e);
                    }}
                    type="text"
                    id="deliverable-one-description"
                    autoComplete="off"
                    value={deliverableThreeDescription}
                    required
                    placeholder="description"
                    className="form__input form__input--textarea"
                    rows="6"
                    cols="50"
                  />
                </>
              ) : (
                ""
              )}

              <button
                className="form__btn-add-deliverable"
                onClick={() => {
                  // if deliverableTwoSocial does not exist, show it
                  if (!showDeliverableTwo) {
                    setShowDeliverableTwo(true);
                  } else if (!showDeliverableThree) {
                    setShowDeliverableThree(true);
                  }
                }}
              >
                <FontAwesomeIcon icon={faPlus} className="icon-left" />
                Add Platform
              </button>
              {/* <AddDeliverableBtn /> */}

              <div className="btn-container btn-container--center">
                <button
                  onClick={() => {
                    setShowDeliverables(false);
                    setShowContractPayment(true);
                  }}
                  type="button"
                  className="form__btn-next"
                >
                  {/* <FontAwesomeIcon className="icon-left" icon={faArrowRight} /> */}
                  Next
                </button>
              </div>
              <p className="form__text form__text--center form__text--note">
                Save as a draft
              </p>
            </div>
          ) : (
            ""
          )}
          {showContractPayment ? (
            <div className={!showPaymentDetails ? "form-page" : "form-page"}>
              <h2 className="form__header">Payment Details</h2>
              <div className="label-row-container__col label-row-container__col--compensation">
                <label htmlFor="paymentmethod" className="form__label">
                  Compensation Type
                </label>
                <select
                  className="form__input form__input--select"
                  value={paymentMethod}
                  onChange={(e) => {
                    setShowPaymentDetails(true);
                    setPaymentMethod(e.target.value);
                  }}
                >
                  <option value="none">Select Type</option>
                  <option value="payment and product">Payment + Product</option>
                  <option value="payment only">Payment Only</option>
                  <option value="product only">Product Only</option>
                </select>
              </div>

              {/* When type is clicked, show the Method / Amount / Description */}

              {showPaymentDetails ? (
                <>
                  <label htmlFor="paymentprice" className="form__label">
                    Payment Amount ($CAD)
                  </label>
                  <input
                    type="text"
                    value={paymentPrice}
                    onChange={(e) => setPaymentPrice(e.target.value)}
                    className="form__input"
                    placeholder="$XXX"
                  />
                  <label htmlFor="paymentproduct" className="form__label">
                    Describe the product you are sending
                  </label>
                  <textarea
                    type="text"
                    autoComplete="off"
                    placeholder="description"
                    value={paymentProduct}
                    onChange={(e) => {
                      console.log(e.target.value);
                      setPaymentProduct(e.target.value);
                    }}
                    className="form__input form__input--textarea"
                    rows="6"
                    cols="50"
                  />
                </>
              ) : (
                <>
                  <div className="form__empty-space"></div>
                </>
              )}

              <div className="btn-container btn-container--center">
                <button
                  onClick={() => {
                    setShowContractPayment(false);
                    setShowDeliverables(true);
                  }}
                  type="button"
                  className="form__btn-next"
                >
                  Previous Page
                </button>
                <button
                  onClick={() => {
                    setShowContractPayment(false);
                    setShowContractGuidelines(true);
                  }}
                  type="button"
                  className="form__btn-next"
                >
                  Next Page
                </button>
              </div>
            </div>
          ) : (
            ""
          )}

          {showContractGuidelines ? (
            <div className="create-project-page">
              <div className="create-project-header">
                <h2 className="create-project-header">Contract Guidelines</h2>
              </div>
              <label htmlFor="phrases" className="form__label">
                Required Phrases
              </label>
              <div className="keywords-container">
                {phrases.map((phrase, index) => (
                  <div className="keywords-item" key={index}>
                    <span className="keywords-text">{phrase}</span>
                    <span
                      onClick={(e) => removeKeyword(e, index)}
                      className="phrases-delete"
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
              <label htmlFor="hashtags">Are there any required hashtags?</label>
              <p></p>
              <div className="keywords-container">
                {hashtags.map((hashtag, index) => (
                  <div className="keywords-item" key={index}>
                    <span className="keywords-text">{hashtag}</span>
                    <span
                      onClick={(e) => removeKeyword(e, index)}
                      className="hashtags-delete"
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
                Required Profile Tags
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
                      onClick={(e) => removeKeyword(e, index)}
                      className="tags-delete"
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
                    <FontAwesomeIcon className="icon-left" icon={faArrowLeft} />
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
                  <FontAwesomeIcon icon={faSquareMinus} className="icon-left" />
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
            <form className="create-project-form" encType="multipart/form-data">
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
                  Select Platform
                </option>
                <option
                  value="instagram"
                  className="create-project-form__social"
                >
                  Instagram
                </option>
                <option value="tiktok" className="create-project-form__social">
                  Tik Tok
                </option>
                <option value="youtube" className="create-project-form__social">
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
                  <FontAwesomeIcon icon={faSquareMinus} className="icon-left" />
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
        {/* </form> */}
      </div>
    </div>,
    document.getElementById("portal")
  );
};

export default CreateProjectModal;
