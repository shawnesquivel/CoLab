import React, { useState, useEffect } from "react";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";
import AuthContext from "../context/AuthProvider";

import { Link } from "react-router-dom";
import pageOneImg from "../assets/updateprofile.png";
import pageTwoImg from "../assets/update-profile-photo.png";
import pageThreeImg from "../assets/update-profile-mediakit.png";
import greySquare from "../assets/mediakit-grey.png";
import greyCircle from "../assets/greycircle.jpg";
import Links from "./Links";

import "../styles/updateprofile.scss";
import useFetchUserAndProjects from "../hooks/useFetchUserAndProjects";

const UPDATEPROFILE_URL = "/api/updateprofile";
const UPDATE_AVATAR_URL = "api/updateavatar";
const UPDATE_MEDIAKIT_URL = "api/updatemediakit";

const UpdateProfile = () => {
  // Use authContext to get the current logged in user ? ?
  const { auth } = useAuth(AuthContext);
  const { user } = useFetchUserAndProjects();
  // If the user is a brand, show page 2 first
  useEffect(() => {
    if (auth.roles.includes(3000)) {
      showPageOne(false);
      showPageTwo(true);
    }
  }, [auth.roles]);
  // backend data holds user data
  // const [backendData, setBackendData] = useState({
  //   status: "still fetching user data",
  // });

  const [awsImage, setAwsImage] = useState("");

  // Page One
  const [instagram, setInstagram] = useState("");
  const [tiktok, setTiktok] = useState("");
  const [youtube, setYoutube] = useState("");

  const [keywords, setKeywords] = useState(["lifestyle"]);

  // Page 2
  const [selectedFile, setSelectedFile] = useState("");
  const [isFilePicked, setIsFilePicked] = useState(false);

  // Pages
  const [pageOne, showPageOne] = useState(true);
  const [pageTwo, showPageTwo] = useState(false);
  const [pageThree, showPageThree] = useState(false);

  const [successMsg, setSuccessMsg] = useState("");
  const [uploadAvatarSuccess, setUploadAvatarSuccess] = useState(false);
  // get image data from backend on pageload

  const [errMsg, setErrMsg] = useState("");

  // Add social media links and niche to profile
  const updateProfileLinks = async (e) => {
    e.preventDefault();
    console.log("Form Data:", instagram, tiktok, youtube, keywords);

    try {
      const payload = JSON.stringify({
        token: localStorage.getItem("token"),
        instagram,
        tiktok,
        youtube,
        keywords,
      });
      console.log("Update Profile Payload", payload);
      const response = await axios.post(UPDATEPROFILE_URL, payload, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      console.log("Response Received", response.data);

      if (response.status === 200) {
      } else {
        alert(response.status);
      }
      showPageOne(false);
      showPageTwo(true);
    } catch (err) {
      console.log(err);
    }
  };

  // Keyword HTML
  const handleKeyDown = async (e) => {
    if (e.key !== "Enter") return;
    const value = e.target.value;
    if (!value.trim()) return;
    setKeywords([...keywords, value]);
    console.log(keywords);
    e.target.value = "";
  };

  const removeKeyword = (deleteIndex) => {
    setKeywords(keywords.filter((keyword, index) => index !== deleteIndex));
  };

  // New amazon S3
  const handleAwsUpload = async (e, type) => {
    e.preventDefault();
    let amazonURL;
    let file;
    // get secure url from server
    if (type === "image") {
      file = selectedFile;
    }
    if (type === "pdf") {
      file = mediaKit;
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

      updateUserAvatar(imageURL);
    }

    if (type === "pdf") {
      const pdfURL = amazonURL.split("?")[0];
      console.log(pdfURL);

      updateUserMediaKit(pdfURL);

      setSuccessMsg("✅ File was uploaded!");
    }

    // add any extra information to server
  };

  const uploadImgFileHandler = (e) => {
    console.log("file was chosen", e.target.files[0]);
    // const formData = new FormData();
    // formData.append("avatar", e.target.files[0]);
    // console.log(...formData);
    setSelectedFile(e.target.files[0]);
    setIsFilePicked(true);
  };

  // After the image ID is received, update the user
  const updateUserAvatar = async (imageID) => {
    console.log("Image ID", imageID);
    try {
      const payload = JSON.stringify({
        token: localStorage.getItem("token"),
        avatar: imageID,
      });
      console.log("Update Profile Payload", payload);
      const response = await axios.post(UPDATE_AVATAR_URL, payload, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      console.log(
        "Avatar was added to profile",
        response.data.userProfile.avatar
      );
      setUploadAvatarSuccess(true);
      if (response.status === 200) {
      } else {
        alert(response.status);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const [mediaKit, setMediaKit] = useState("");
  const uploadMediaKitHandler = (e) => {
    console.log("File was chosen", e.target.files[0]);
    setMediaKit(e.target.files[0]);
  };

  const updateUserMediaKit = async (mediaKit) => {
    try {
      const payload = JSON.stringify({
        token: localStorage.getItem("token"),
        mediaKit: mediaKit,
      });
      console.log("Update Profile Payload", payload);
      const response = await axios.post(UPDATE_MEDIAKIT_URL, payload, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      console.log(
        "Media kit added to profile",
        response.data.userProfile.mediaKit
      );

      if (response.status === 200) {
      } else {
        alert(response.status);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <main className="app-outer">
        <div className="app-inner--narrow">
          <Links />

          <section className="update-profile">
            <div className="update-profile__container-left">
              <h1 className="heading heading--large">
                Hey, <br /> {user?.firstName}
              </h1>
              <p className="update-profile__description mb-1p5">
                {auth.roles.includes(2000)
                  ? "Please complete your profile so we can match you with the right brands."
                  : `Please upload a logo for ${user?.company}.`}
              </p>
              {pageOne ? (
                <>
                  {" "}
                  <p className="update-profile__description mb-1p5 text--bold">
                    Build Your Profile
                  </p>
                  <form className="update-profile-form" noValidate>
                    <label
                      htmlFor="instagram"
                      className="update-profile-form__label"
                    >
                      Instagram URL
                    </label>
                    <input
                      onChange={(e) => {
                        setInstagram(e.target.value);
                      }}
                      type="text"
                      id="instagram"
                      autoComplete="off"
                      value={instagram}
                      required
                      placeholder="instagram url"
                      className="update-profile-form__input"
                    />
                    <label
                      htmlFor="tiktok"
                      className="update-profile-form__label"
                    >
                      tiktok URL
                    </label>
                    <input
                      onChange={(e) => {
                        setTiktok(e.target.value);
                      }}
                      type="text"
                      id="tiktok"
                      autoComplete="off"
                      value={tiktok}
                      required
                      placeholder="tiktok url"
                      className="update-profile-form__input"
                    />
                    <label
                      htmlFor="youtube"
                      className="update-profile-form__label"
                    >
                      YouTube URL
                    </label>
                    <input
                      onChange={(e) => {
                        setYoutube(e.target.value);
                      }}
                      type="text"
                      id="youtube"
                      autoComplete="off"
                      value={youtube}
                      required
                      placeholder="youtube url"
                      className="update-profile-form__input"
                    />

                    <label htmlFor="keywords">Your niche</label>
                    <input
                      onKeyDown={handleKeyDown}
                      type="text"
                      className="update-profile-form__input"
                      placeholder="type keyword then hit enter"
                    />
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
                    </div>
                    <div className="flex-col-center">
                      {errMsg ? (
                        <p
                          aria-live="assertive"
                          className="update-profile__error"
                        >
                          {errMsg}
                        </p>
                      ) : (
                        ""
                      )}
                      <div className="btn-container btn-container--col">
                        <button
                          type="button"
                          onClick={updateProfileLinks}
                          className={
                            instagram && tiktok && youtube && keywords
                              ? "btn-cta btn-cta--active"
                              : "btn-cta btn-cta--inactive"
                          }
                        >
                          Next
                        </button>
                        <button
                          type="button"
                          className="btn-skip"
                          onClick={() => {
                            showPageOne(false);
                            showPageTwo(true);
                          }}
                        >
                          Skip
                        </button>
                      </div>
                    </div>
                  </form>
                </>
              ) : (
                ""
              )}
              {/* Upload Profile Picture  */}
              {pageTwo ? (
                <>
                  {" "}
                  <p className="update-profile__description mb-1p5 text--bold">
                    Upload Profile Picture
                  </p>
                  <form
                    className="update-profile-form"
                    encType="multipart/form-data"
                  >
                    <label htmlFor="avatar" className="form__label">
                      Upload File
                    </label>
                    <input
                      type="file"
                      id="avatar"
                      name="avatar"
                      onChange={uploadImgFileHandler}
                      required
                      className="update-profile-form__input--file"
                    />

                    <p id="uidnote" className="login-form__instructions">
                      Max 2MB, .png only
                    </p>
                    {selectedFile?.size > 2e6 ? (
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
                    )}
                    {!uploadAvatarSuccess ? (
                      <div className="flex-col-center">
                        <button
                          type="submit"
                          onClick={(e) => handleAwsUpload(e, "image")}
                          disabled={!selectedFile ? "disabled" : ""}
                          className={
                            selectedFile
                              ? "btn-cta btn-cta--active"
                              : "btn-cta btn-cta--inactive"
                          }
                        >
                          Upload Photo
                        </button>
                        {auth.roles.includes(3000) ? (
                          <button
                            type="button"
                            className="btn-cta btn-cta--inactive"
                          >
                            <Link
                              to="/dashboard"
                              className="text--light dashboard-link"
                            >
                              Go to Dashboard
                            </Link>
                          </button>
                        ) : (
                          ""
                        )}
                        {auth.roles.includes(2000) ? (
                          <button
                            type="button"
                            className="btn-skip"
                            onClick={() => {
                              showPageTwo(false);
                              showPageThree(true);
                            }}
                          >
                            Skip
                          </button>
                        ) : (
                          ""
                        )}

                        {errMsg ? (
                          <p
                            aria-live="assertive"
                            className="update-profile__error"
                          >
                            {errMsg}
                          </p>
                        ) : (
                          ""
                        )}
                      </div>
                    ) : (
                      <>
                        <div className="flex-col-center">
                          {user.avatar ? (
                            <img
                              className="update-profile__profile-pic"
                              src={awsImage}
                              alt="aws avatar"
                            />
                          ) : (
                            <img
                              className="update-profile__profile-pic"
                              src={greyCircle}
                              alt="blank avatar"
                            />
                          )}
                          <p className="update-profile__success">
                            Your avatar was successfully updated!
                          </p>
                        </div>
                        <div className="btn-container btn-container--center">
                          {auth.roles.includes(2000) ? (
                            <button
                              type="button"
                              className="btn-cta"
                              onClick={() => {
                                showPageTwo(false);
                                showPageThree(true);
                              }}
                            >
                              Next
                            </button>
                          ) : (
                            ""
                          )}

                          {auth.roles.includes(3000) ? (
                            <button type="button" className="btn-cta">
                              <Link
                                to="/dashboard"
                                className="link link--white"
                              >
                                Go to Dashboard
                              </Link>
                            </button>
                          ) : (
                            ""
                          )}
                        </div>
                      </>
                    )}
                  </form>
                </>
              ) : (
                ""
              )}

              {pageThree ? (
                <>
                  {" "}
                  <p className="update-profile__description mb-p5 text--bold">
                    Upload Files
                  </p>
                  <form
                    className="update-profile-form"
                    encType="multipart/form-data"
                  >
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
                    <label
                      htmlFor="mediakit"
                      className="update-profile__description mb-1"
                    >
                      Media Kit
                    </label>
                    <div className="flex-col-center">
                      <img
                        src={greySquare}
                        alt="grey black square"
                        className="update-profile-form__media-kit"
                      />
                      <input
                        type="file"
                        id="mediakit"
                        name="mediakit"
                        onChange={uploadMediaKitHandler}
                        className="update-profile-form__input--file"
                      />

                      <p id="uidnote" className="login-form__instructions">
                        PDF, Max 2MB
                      </p>
                      {user.mediaKit ? (
                        <a
                          href={user.mediaKit}
                          className="update-profile-form__media-kit update-profile-form__media-kit--link mb-1"
                        >
                          Download Media Kit
                        </a>
                      ) : (
                        ""
                      )}
                      <p className="update-profile__success">
                        {successMsg ? `${successMsg}` : ""}
                      </p>
                      {successMsg ? (
                        <>
                          <button type="button" className="btn-cta">
                            <Link to="/dashboard" className="link link--white">
                              Go to Dashboard
                            </Link>
                          </button>
                        </>
                      ) : (
                        <button
                          type="submit"
                          onClick={(e) => handleAwsUpload(e, "pdf")}
                          className={
                            mediaKit
                              ? "btn-cta btn-cta--active"
                              : "btn-cta btn-cta--inactive"
                          }
                        >
                          Upload Media Kit
                        </button>
                      )}

                      {errMsg ? (
                        <p
                          aria-live="assertive"
                          className="update-profile__error"
                        >
                          {errMsg}
                        </p>
                      ) : (
                        ""
                      )}
                    </div>
                  </form>
                </>
              ) : (
                ""
              )}
            </div>
            {pageOne ? (
              <img
                src={pageOneImg}
                alt="black model with curly hair with left arm raised with a blue dress short hanging over her shoulders wearing a white tanktop"
                className="update-profile__img-right"
              />
            ) : (
              ""
            )}
            {pageTwo ? (
              <img
                src={pageTwoImg}
                alt="blonde woman in a blue dress and heels turning torso backwards"
                className="update-profile__img-right"
              />
            ) : (
              ""
            )}
            {pageThree ? (
              <img
                src={pageThreeImg}
                alt="tanned man in a bucket hat, mint crewneck, and silver chain grabbing his hat and looking at camera with sun on face"
                className="update-profile__img-right"
              />
            ) : (
              ""
            )}
          </section>
        </div>
      </main>
    </>
  );
};

export default UpdateProfile;
