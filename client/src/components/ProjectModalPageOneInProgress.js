import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";

import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import greyCircle from "../assets/greycircle.jpg";
import axios from "../api/axios";
import ToDoList from "./ToDoList";

const ADD_PROJECT_IMAGES_URL = "/api/addprojectimage";

const ProjectModalPageOneInProgress = ({
  id,
  reviewDeadline,
  deadline,
  tiktokTask,
  youtubeTask,
  instagramTask,
  status,
  handleSubmit,
}) => {
  // Page One - 2 - In Progress - Task Dropdowns
  const [showSubmitDraft, setShowSubmitDraft] = useState(false);

  const [showUploadSuccess, setShowUploadSuccess] = useState(false);
  const [showRequestReview, setShowRequestReview] = useState(false);

  // Copy and Pasta from Create Project Modal BEGIN - upload image
  const [socialExample, setSocialExample] = useState("");
  const [uploadSuccessMsg, setUploadSuccessMsg] = useState("");

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

  const updateProjectExamples = async (imageID, social, type) => {
    console.log("Image ID", imageID);
    console.log("Project ID", project._id);
    console.log("Adding an example to:", socialExample);

    try {
      const payload = JSON.stringify({
        projectID: id,
        imageURL: imageID,
        social: socialExample,
        type: "Submission",
      });
      console.log("Update Profile Payload", payload);
      const response = await axios.post(ADD_PROJECT_IMAGES_URL, payload, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      setUploadSuccessMsg(
        `Submission for  ${
          socialExample[0].toUpperCase() + socialExample.slice(1)
        } was succesfully uploaded! You may add more files for other submissions. `
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
  // Copy and Pasta from CreateProjectModal END

  return (
    <>
      <div className="to-do">
        <div className="to-do-left">
          <ToDoList
            status={status}
            tiktokTask={tiktokTask}
            youtubeTask={youtubeTask}
            instagramTask={instagramTask}
          />
        </div>
        <div className="to-do-right">
          {status !== "brand reviewing" ? (
            <div className="to-do__card">
              <div className="guidelines-card__header">
                {/* Left Icon */}
                <FontAwesomeIcon
                  icon={faCircleExclamation}
                  className="icon-highlight guidelines-card__flex-one"
                />
                {/* Middle Text */}
                <div className="guidelines-card__flex-two">
                  <p className="to-do__title">Submit Draft</p>
                </div>
                {/* Toggle Button */}
                <button
                  type="button"
                  className="guidelines-card__flex-three guidelines-card__btn-expand"
                  onClick={() => {
                    setShowSubmitDraft(!showSubmitDraft);
                  }}
                >
                  {showSubmitDraft ? (
                    <>
                      <FontAwesomeIcon icon={faAngleUp} />
                    </>
                  ) : (
                    <>
                      <FontAwesomeIcon icon={faAngleDown} />
                    </>
                  )}
                </button>
              </div>
              {showSubmitDraft ? (
                <form
                  className="form form--small"
                  encType="multipart/form-data"
                >
                  <label htmlFor="avatar" className="form__label">
                    <input
                      type="file"
                      id="avatar"
                      name="avatar"
                      onChange={uploadImgFileHandler}
                      required
                      className="create-project-form__input create-project-form__input--file"
                    />
                  </label>

                  <p id="uidnote" className="form__instructions">
                    Max 2MB, .png only
                  </p>
                  <label htmlFor="social">
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
                    <button
                      type="submit"
                      onClick={(e) => {
                        handleAwsUpload(e, "image");
                        setShowRequestReview(true);
                      }}
                      className="form__btn-dotted form__btn-dotted--large mb-1p5"
                    >
                      Upload Photo
                    </button>
                    {showRequestReview ? (
                      <>
                        <p>Done uploading?</p>
                        <button
                          className="btn-cta mb-1"
                          style={{ margin: "0 auto", marginTop: "1rem" }}
                          onClick={(e) => {
                            handleSubmit("influencer submit draft", e);
                            setShowUploadSuccess(true);
                            setShowRequestReview(false);
                          }}
                        >
                          Request review
                        </button>
                      </>
                    ) : (
                      ""
                    )}
                    {showUploadSuccess ? (
                      <>
                        <p>
                          ✅ Successfully submitted draft! Please wait for the
                          brand to review. You may now close the page.
                        </p>
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                </form>
              ) : (
                ""
              )}
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};

export default ProjectModalPageOneInProgress;
