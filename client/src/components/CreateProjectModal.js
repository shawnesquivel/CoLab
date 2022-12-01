import React, { useEffect, useState } from "react";

import ReactDOM from "react-dom";
import {
  faUser,
  faClock,
  faPlus,
  faSquareMinus,
  faX,
} from "@fortawesome/free-solid-svg-icons";

import { faCalendar } from "@fortawesome/free-regular-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useAuth from "../hooks/useAuth";
import axios from "../api/axios";
import AuthContext from "../context/AuthProvider";
import greyCircle from "../assets/greycircle.jpg";
import "../styles/createprojectmodal.scss";
import "../styles/dashboard.scss";
import CreateProjectSummary from "./CreateProjectSummary";

const MODAL_STYLES = {
  position: "fixed",
  top: "50%",
  right: "0%",
  transform: "translate(0%, -50%)",
  backgroundColor: "#fefcfb",
  zIndex: 1000,
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

  // Form
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [influencerAssigned, setInfluencerAssigned] = useState("none");
  const [instagramDeliverable, setInstagramDeliverable] = useState("");
  const [tiktokDeliverable, setTiktokDeliverable] = useState("");
  const [youtubeDeliverable, setYoutubeDeliverable] = useState("");

  const [reviewDeadline, setReviewDeadline] = useState("");
  const [deadline, setDeadline] = useState("");
  const [deadlineTime, setDeadlineTime] = useState("23:59");
  const [numberOfRevisions, setNumberOfRevisions] = useState("1");

  // Form Pages
  const [showContractDetails, setShowContractDetails] = useState(true);
  const [showDeliverables, setShowDeliverables] = useState(false);
  const [showContractGuidelines, setShowContractGuidelines] = useState(false);
  const [showContractPayment, setShowContractPayment] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
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
  const [linkInBio, setLinkInBio] = useState("");

  // Used to pass in props
  const data = {
    title: title,
    description: description,
    influencerAssigned: influencerAssigned,
    reviewDeadline: reviewDeadline,
    instagramTask: instagramDeliverable,
    tiktokTask: tiktokDeliverable,
    youtubeTask: youtubeDeliverable,
    deadlineTime: deadlineTime,
    numberOfRevisions: numberOfRevisions,
    paymentMethod: paymentMethod,
    paymentPrice: paymentPrice,
    paymentProduct: paymentProduct,
    keywords: keywords,
    hashtags: hashtags,
    tags: tags,
    phrases: phrases,
    linkInBio: linkInBio,
  };

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

  // Debugging
  // useEffect(() => {
  //   console.log("instagram:", instagramDeliverable);
  //   console.log("youtube:", youtubeDeliverable);
  //   console.log("tiktok:", tiktokDeliverable);
  // }, [instagramDeliverable, youtubeDeliverable, tiktokDeliverable]);

  // Create Project
  const submitProject = async (e) => {
    e.preventDefault();
    const user = auth?.username;
    console.log(
      "Project Token:",
      auth.user,
      title,
      description,
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
        description,
        brand,
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

      setShowSummary(false);

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
        type: "example",
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
        <div className="btn-container btn-container--right">
          <button className="btn-hide" onClick={onClose} type="button">
            <FontAwesomeIcon icon={faX} className="icon-left" />
          </button>
        </div>
        {/*  */}
        <form className="form">
          <h2 className="form__text form__text--header">
            {!showSuccess ? "Create a Campaign" : "Success!"}
          </h2>
          {showContractDetails ? (
            <div className="form-page">
              <h4 className="form__text form__text--subheader">Overview</h4>
              <div className="label-row-container__col">
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
              </div>
              <div className="label-row-container__col">
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
              </div>
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
              <div className="btn-container btn-container--center mt-1p5">
                <button
                  onClick={() => {
                    setShowContractDetails(false);
                    setShowDeliverables(true);
                  }}
                  type="button"
                  disabled={
                    title &&
                    description &&
                    reviewDeadline &&
                    deadline &&
                    deadlineTime &&
                    keywords
                      ? false
                      : true
                  }
                  className={
                    title &&
                    description &&
                    reviewDeadline &&
                    deadline &&
                    deadlineTime &&
                    keywords
                      ? "btn-cta btn-cta--medium btn-cta--active"
                      : "btn-cta btn-cta--medium btn-cta--inactive"
                  }
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
              <div className="label-row-container__col">
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
              </div>
              <div className="label-row-container__col">
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
              </div>
              {/* Deliverable Two */}
              {showDeliverableTwo ? (
                <>
                  <div className="label-row-container__col">
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
                  </div>
                  <div className="label-row-container__col">
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
                  </div>
                </>
              ) : (
                ""
              )}
              {/* Deliverable Three */}
              {showDeliverableThree ? (
                <>
                  <div className="label-row-container__col">
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
                  </div>
                  <div className="label-row-container__col">
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
                  </div>
                </>
              ) : (
                ""
              )}

              <button
                className="form__btn-dotted mb-1"
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

              <div className="btn-container btn-container--center mt-1p5">
                <button
                  onClick={() => {
                    setShowDeliverables(false);
                    setShowContractDetails(true);
                  }}
                  type="button"
                  className="btn-cta btn-cta--medium btn-cta--inactive"
                >
                  Previous Page
                </button>
                <button
                  onClick={() => {
                    setShowDeliverables(false);
                    setShowContractPayment(true);
                  }}
                  type="button"
                  disabled={
                    deliverableOneSocial && deliverableOneDescription
                      ? false
                      : true
                  }
                  className={
                    deliverableOneSocial && deliverableOneDescription
                      ? "btn-cta btn-cta--medium btn-cta--active"
                      : "btn-cta btn-cta--medium btn-cta--inactive"
                  }
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
              <h2 className="form__text form__text--subheader">
                Payment Details
              </h2>
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
                  {paymentMethod === "payment and product" ||
                  paymentMethod === "payment only" ? (
                    <div className="label-row-container__col">
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
                    </div>
                  ) : (
                    ""
                  )}

                  {paymentMethod === "payment and product" ||
                  paymentMethod === "product only" ? (
                    <div className="label-row-container__col">
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
                    </div>
                  ) : (
                    ""
                  )}
                </>
              ) : (
                <>
                  <div className="form__empty-space"></div>
                </>
              )}

              <div className="btn-container btn-container--center mt-1p5">
                <button
                  onClick={() => {
                    setShowContractPayment(false);
                    setShowDeliverables(true);
                  }}
                  type="button"
                  className="btn-cta btn-cta--medium btn-cta--inactive"
                >
                  Previous Page
                </button>
                <button
                  onClick={() => {
                    setShowContractPayment(false);
                    setShowContractGuidelines(true);
                  }}
                  type="button"
                  disabled={paymentMethod !== "none" ? false : true}
                  className={
                    paymentMethod !== "none"
                      ? "btn-cta btn-cta--medium btn-cta--active"
                      : "btn-cta btn-cta--medium btn-cta--inactive"
                  }
                >
                  Next Page
                </button>
              </div>
            </div>
          ) : (
            ""
          )}

          {showContractGuidelines ? (
            <div className="form-page ">
              <h2 className="form__text form__text--subheader">
                Contract Guidelines
              </h2>
              {/* Phrases */}
              <div className="label-row-container__col">
                <label htmlFor="phrases" className="form__label">
                  Required Phrases (Press Enter ⏎)
                </label>
                <input
                  onKeyDown={handleKeyDown}
                  type="text"
                  className="phrases-input"
                  placeholder="Add a phrase"
                />
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
                </div>
              </div>
              {/* Hashtags */}
              <div className="label-row-container__col">
                <label htmlFor="hashtags" className="form__label">
                  Required Hashtags (Press Enter ⏎)
                </label>
                <input
                  onKeyDown={handleKeyDown}
                  type="text"
                  className="hashtags-input"
                  placeholder="Add a hashtag"
                />
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
                </div>
              </div>
              {/* Tags */}
              <div className="label-row-container__col">
                <label htmlFor="tags" className="form__label">
                  Required Profile Tags (Press Enter ⏎)
                </label>
                <input
                  onKeyDown={handleKeyDown}
                  type="text"
                  className="tags-input"
                  placeholder="Add a tag"
                />
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
                </div>
              </div>
              {/* Link In Bio */}
              <div className="label-row-container__col mb-1p5">
                <label htmlFor="linkinbio" className="form__label">
                  Link in Bio
                </label>
                <input
                  onChange={(e) => {
                    setLinkInBio(e.target.value);
                  }}
                  value={linkInBio}
                  type="url"
                  id="linkinbio"
                  name="linkinbio"
                  placeholder="link in bio"
                  className="form__input"
                />
              </div>
              {/* Buttons */}
              {!showSuccess ? (
                <>
                  <div className="btn-container btn-container--center">
                    <button
                      onClick={() => {
                        setShowContractGuidelines(false);
                        setShowContractPayment(true);
                      }}
                      type="button"
                      className="btn-cta btn-cta--medium btn-cta--inactive"
                    >
                      Back
                    </button>
                    <button
                      onClick={() => {
                        setShowContractGuidelines(false);
                        setShowSummary(true);
                      }}
                      type="button"
                      className="btn-cta btn-cta--medium btn-cta--active"
                    >
                      Preview
                    </button>
                  </div>
                </>
              ) : (
                ""
              )}
            </div>
          ) : (
            " "
          )}

          {showSummary ? <CreateProjectSummary {...data} /> : ""}
          {showSummary ? (
            <>
              <div className="btn-container btn-container--center">
                <button
                  onClick={() => {
                    setShowSummary(false);
                    setShowContractGuidelines(true);
                  }}
                  type="button"
                  className="btn-cta btn-cta--medium btn-cta--inactive"
                >
                  Back
                </button>

                <button
                  type="button"
                  onClick={submitProject}
                  className="btn-cta btn-cta--medium btn-cta--active"
                >
                  Create Project
                </button>
              </div>
            </>
          ) : (
            ""
          )}
        </form>

        {showUpload ? (
          <>
            <form className="form " encType="multipart/form-data">
              <div className="mt-1p5">
                <h4 className="form__text form__text--subheader">
                  Upload Examples
                </h4>
                <p className="form__instructions">
                  Please upload any examples for the influencer to reference.
                  E.g. samples, previous work by others, etc.
                </p>
              </div>
              <div className="label-row-container label-row-container--left">
                <div className="label-row-container__col">
                  <label htmlFor="avatar" className="form__label">
                    File Upload
                  </label>
                  <input
                    type="file"
                    id="avatar"
                    name="avatar"
                    onChange={uploadImgFileHandler}
                    required
                    className=""
                  />
                  <p id="uidnote" className="form__instructions">
                    Max 2MB, .png or .jpeg files only
                  </p>
                </div>
                <div className="label-row-container__col">
                  <label htmlFor="social" className="form__label">
                    Which deliverable is this an example for?
                  </label>
                  <select
                    name="social"
                    id="social"
                    onChange={(e) => {
                      console.log(e.target.value);
                      setSocialExample(e.target.value);
                    }}
                    value={socialExample}
                    className="form__input form__input--select "
                  >
                    <option value="none" className="form__social">
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
                </div>
              </div>

              <div className="flex-col-center">
                {awsImage ? (
                  <img
                    className="form__profile-pic"
                    src={awsImage}
                    alt="aws avatar"
                  />
                ) : (
                  <img
                    className="form__profile-pic"
                    src={greyCircle}
                    alt="blank avatar"
                  />
                )}
                {uploadSuccessMsg ? (
                  <p className="form__text form__text--success">
                    {uploadSuccessMsg}
                  </p>
                ) : (
                  " "
                )}
              </div>

              <button
                type="submit"
                onClick={(e) => handleAwsUpload(e, "image")}
                className="btn-cta btn-cta--medium btn-cta--active"
              >
                Upload Photo
              </button>
              <button
                onClick={onClose}
                type="button"
                className="btn-dotted btn-dotted--large"
              >
                <FontAwesomeIcon icon={faSquareMinus} className="icon-left" />
                Go to New Collabs
              </button>

              {/* {errMsg ? (
                  <p aria-live="assertive" className="update-profile__error">
                    {errMsg}
                  </p>
                ) : (
                  ""
                )} */}
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
