import React, { useState, useEffect, useRef } from "react";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";
import AuthContext from "../context/AuthProvider";

import { useNavigate, Link } from "react-router-dom";
import pageOneImg from "../assets/updateprofile.png";
import pageTwoImg from "../assets/update-profile-photo.png";
import pageThreeImg from "../assets/update-profile-mediakit.png";
import headshot from "../assets/headshot.png";
import "../styles/updateprofile.scss";

const GETUSER_URL = "/api/getuser";
const UPDATEPROFILE_URL = "/api/updateprofile";
const UPLOADPROFILEPIC_URL = "/api/uploadimage";

const UpdateProfile = () => {
  // Use authContext to get the current logged in user ? ?
  const { auth } = useAuth(AuthContext);
  const navigate = useNavigate(); // to use the navigate hook

  // backend data holds user data
  const [backendData, setBackendData] = useState({
    status: "still fetching user data",
  });

  // get image data
  const [imgData, setImgData] = useState([]);
  useEffect(() => {
    console.log("getting the images");
    axios
      .get("/uploadimage")
      .then((res) => {
        setImgData(res.data);
        console.log(imgData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    console.log(imgData);
  }, [imgData]);

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

  // Pages
  const [pageOne, showPageOne] = useState(true);
  const [pageTwo, showPageTwo] = useState(true);
  const [pageThree, showPageThree] = useState(false);

  // useEffect(() => {
  //   if (showForm) {
  //     setFormButtonText("Hide");
  //   } else {
  //     setFormButtonText("Update your profile");
  //   }
  // }, [showForm]);

  const [errMsg, setErrMsg] = useState("");
  const [err, setErr] = useState(false);

  // Axios GET Request - Fetch user data
  const fetchUser = async () => {
    const user = auth?.user;
    console.log(auth);
    // test axios
    // const response = await axios.get("https://yesno.wtf/api");

    const payload = JSON.stringify({
      token: localStorage.getItem("token"),
    });

    console.log(payload);
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

  const updateProfile = async (e) => {
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

  // To do: fix this - 404 axios error, cannot find endpoint
  const handleUploadProfilePic = async (e) => {
    e.preventDefault();
    if (!isFilePicked) {
      alert("you have not uploaded a file!");
      return;
    }

    try {
      const payload = JSON.stringify({
        name: "profile picture",
        testImage: selectedFile,
      });
      console.log("Update Profile Payload", payload);
      const response = await axios.post(UPLOADPROFILEPIC_URL, payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      console.log("Response Received", response.data);

      // if (response.status === 200) {
      // } else {
      //   alert(response.status);
      // }
      // showPageOne(false);
      // showPageTwo(true);
    } catch (err) {
      console.log(err);
    }
  };

  const uploadFileHandler = (e) => {
    setSelectedFile(e.target.files[0]);
    setIsFilePicked(true);
  };

  return (
    <>
      {/* Old  */}
      {/* <section>
        <h2>{backendData.status}</h2>
        <h2>Profile Information</h2>
        <br /> <br />
        <h2>Welcome, {backendData?.firstName}</h2>
        <img src={backendData?.profilePicURL} alt="" />
        <h3>Username</h3>
        <p>{backendData?.username}</p>
        <h3>Company/Brand</h3>
        <p>{backendData?.company}</p>
        <h3>Change your password</h3>
        <button
          onClick={() => {
            navigate("/changepassword");
          }}
          className="register__btn-cta"
        >
          Change Password
        </button>
        <div className="update-profile-options">
          <button className="update-profile-btn">Upload Media Kit</button>
          <button className="update-profile-btn">
            <a href={backendData?.socialMediaLinks?.instagram}>Instagram</a>
          </button>
          <button
            className="update-profile-btn"
            onClick={() => {
              setShowForm(!showForm);
            }}
          >
            {formButtonText}
          </button>
        </div>

      </section> */}

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
              <form className="update-profile-form" novalidate>
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
                      onClick={updateProfile}
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
                <label htmlFor="profilepic"></label>
                <input
                  type="file"
                  id="profilepic"
                  onChange={uploadFileHandler}
                  required
                />

                <p id="uidnote" className="login-form__instructions">
                  Max 2MB, .png only
                </p>
                {isFilePicked ? (
                  <div>
                    <p>Name: {selectedFile.name}</p>
                    <p>Type: {selectedFile.type}</p>
                    <p>Size: {selectedFile.size / 100000} MB</p>
                    <p>
                      lastModifiedDate:{" "}
                      {selectedFile.lastModifiedDate.toLocaleDateString()}
                    </p>
                  </div>
                ) : (
                  <p>Select a file to show details</p>
                )}

                <div className="flex-col-center">
                  <img
                    src={headshot}
                    className="update-profile__profile-pic"
                    alt="user profile"
                  />
                  <button
                    type="submit"
                    onClick={handleUploadProfilePic}
                    className="update-profile__btn-cta"
                  >
                    Upload Photo
                  </button>
                  <button
                    type="button"
                    className="update-profile__btn-cta"
                    onClick={() => {
                      showPageThree(true);
                    }}
                  >
                    Skip
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
