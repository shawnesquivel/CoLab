import React, { useState, useEffect, useRef } from "react";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";
import AuthContext from "../context/AuthProvider";

import { useNavigate, Link } from "react-router-dom";
import pageOneImg from "../assets/updateprofile.png";
import pageTwoImg from "../assets/update-profile-photo.png";
import pageThreeImg from "../assets/update-profile-mediakit.png";
import greySquare from "../assets/mediakit-grey.png";
import "../styles/updateprofile.scss";
const FormData = require("form-data");

const GETUSER_URL = "/api/getuser";
const UPDATEPROFILE_URL = "/api/updateprofile";
const UPLOADPROFILEPIC_URL = "/api/uploadimage";
const UPDATE_AVATAR_URL = "api/updateavatar";
const GETIMAGE_URL = "/api/getimage";

const UpdateProfile = () => {
  // Use authContext to get the current logged in user ? ?
  const { auth } = useAuth(AuthContext);
  const navigate = useNavigate(); // to use the navigate hook

  // backend data holds user data
  const [backendData, setBackendData] = useState({
    status: "still fetching user data",
  });

  const [awsImage, setAwsImage] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [formButtonText, setFormButtonText] = useState("Change Profile");
  // Page One
  const [instagram, setInstagram] = useState("");
  const [tiktok, setTiktok] = useState("");
  const [youtube, setYoutube] = useState("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [role, setRole] = useState("Influencer");
  const [dateOfBirth, setDateOfBirth] = useState("2000-01-31");
  const [keywords, setKeywords] = useState(["lifestyle"]);

  // Page 2
  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  // Pages
  const [pageOne, showPageOne] = useState(true);
  const [pageTwo, showPageTwo] = useState(false);
  const [pageThree, showPageThree] = useState(false);

  // get image data from backend on pageload
  const [imgData, setImgData] = useState([]);

  const [errMsg, setErrMsg] = useState("");
  const [err, setErr] = useState(false);

  // Fetch User Data on Page Load
  const fetchUser = async () => {
    const user = auth?.user;
    // test axios
    // const response = await axios.get("https://yesno.wtf/api");

    const payload = JSON.stringify({
      token: localStorage.getItem("token"),
    });

    const response = await axios.post(GETUSER_URL, payload, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    setBackendData(response.data.userProfile);
  };

  useEffect(() => {
    fetchUser().catch(console.error);
  }, []);

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
    // get secure url from server
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
        "Content-Type": "",
      },
      // withCredentials: true,
      body: selectedFile,
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

      setMediaKit(pdfURL);

      updateUserMediaKit(pdfURL);
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

      if (response.status === 200) {
      } else {
        alert(response.status);
      }
      showPageOne(false);
      showPageTwo(false);
      showPageThree(true);
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
        mediaKit,
      });
      console.log("Update Profile Payload", payload);
      const response = await axios.post(UPDATE_AVATAR_URL, payload, {
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

  // Given the image ID, retrieve the image from database
  // const getImageFromID = async (imageID) => {
  //   try {
  //     console.log("getting the image: ", imageID);
  //     const payload = JSON.stringify({
  //       token: localStorage.getItem("token"),
  //       imageID,
  //     });
  //     const res = await axios.post(GETIMAGE_URL, payload, {
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       withCredentials: true,
  //     });
  //     console.log("Success: Got the image:", res);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  return (
    <>
      {/* Display back end images */}
      {/* {imgData?.map((obj) => {
          const base64String = btoa(
            new Uint8Array(obj.img.data.data).reduce(function (data, byte) {
              return data + String.fromCharCode(byte);
            }, "")
          );
          return (
            <img
              src={`data:image/png;base64,${base64String}`}
              alt=""
              width="300"
            />
          );
        })} */}

      <section className="update-profile">
        <div className="update-profile__container-left">
          <h1 className="update-profile__header">
            Hey, <br /> {backendData?.firstName}
          </h1>
          <p className="update-profile__description mb-1p5">
            Please complete your profile so we can match you with the right
            brands.
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
                <label htmlFor="tiktok" className="update-profile-form__label">
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
                <label htmlFor="youtube" className="update-profile-form__label">
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
                    <p aria-live="assertive" className="update-profile__error">
                      {errMsg}
                    </p>
                  ) : (
                    ""
                  )}
                  <div className="flex-col-center">
                    <button
                      type="button"
                      onClick={updateProfileLinks}
                      className="update-profile__btn-cta"
                    >
                      Update Profile
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
                enctype="multipart/form-data"
              >
                <label htmlFor="avatar"></label>
                <input
                  type="file"
                  id="avatar"
                  name="avatar"
                  onChange={uploadImgFileHandler}
                  required
                />

                <p id="uidnote" className="login-form__instructions">
                  Max 2MB, .png only
                </p>
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
                      className="update-profile__profile-pic"
                      src={awsImage}
                      alt="aws avatar"
                    />
                  ) : (
                    ""
                  )}
                  {backendData.avatar ? (
                    <img
                      className="update-profile__profile-pic"
                      src={backendData.avatar}
                      alt="aws avatar"
                    />
                  ) : (
                    ""
                  )}
                  <button
                    type="submit"
                    onClick={(e) => handleAwsUpload(e, "image, type")}
                    className="update-profile__btn-cta"
                  >
                    Upload Photo
                  </button>
                  <button
                    type="button"
                    className="update-profile__btn-cta"
                    onClick={() => {
                      showPageTwo(false);
                      showPageThree(true);
                    }}
                  >
                    Next Page
                  </button>

                  {errMsg ? (
                    <p aria-live="assertive" className="update-profile__error">
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

          {pageThree ? (
            <>
              {" "}
              <p className="update-profile__description mb-1 text--bold">
                Upload Files
              </p>
              <form
                className="update-profile-form"
                enctype="multipart/form-data"
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
                  {backendData.mediaKit ? (
                    <p className="mb-1">
                      Latest Upload: {backendData.mediaKit}
                    </p>
                  ) : (
                    ""
                  )}
                  <button
                    type="submit"
                    onClick={() => {}}
                    className="update-profile__btn-cta"
                  >
                    Upload Photo
                  </button>
                  <button
                    type="button"
                    className="update-profile__btn-cta"
                    onClick={() => {
                      showPageTwo(false);
                      showPageThree(true);
                    }}
                  >
                    Next Page
                  </button>

                  {errMsg ? (
                    <p aria-live="assertive" className="update-profile__error">
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
    </>
  );
};

export default UpdateProfile;
