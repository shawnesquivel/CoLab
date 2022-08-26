import React, { useState, useEffect } from "react";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";
import AuthContext from "../context/AuthProvider";

const GETUSER_URL = "/api/getuser";
const UPDATEPROFILE_URL = "/api/updateprofile";

const UpdateProfile = () => {
  // Use authContext to get the current logged in user ? ?
  const { auth } = useAuth(AuthContext);
  // STATE
  const [backendData, setBackendData] = useState({
    status: "still fetching data",
  });

  const [showForm, setShowForm] = useState(false);
  const [formButtonText, setFormButtonText] = useState("Change Profile");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [role, setRole] = useState("Influencer");
  const [dateOfBirth, setDateOfBirth] = useState("2000-01-31");
  const [keywords, setKeywords] = useState(["lifestyle"]);

  useEffect(() => {
    if (showForm) {
      setFormButtonText("Hide");
    } else {
      setFormButtonText("Update your profile");
    }
  }, [showForm]);

  // const [errMsg, setErrMsg] = useState("");
  // const [err, setErr] = useState(false);

  // AXIOS
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data:", firstName, lastName, dateOfBirth, role, keywords);
    // Aug 26-27 2022: Create the submit function to backend

    // ADD YOUR CODE HERE
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

  return (
    <>
      <section>
        {/* wrap this all in ternary, so if the user is not found, we don't display anything */}
        <h2>{backendData.status}</h2>
        <h2>Profile Information</h2>
        <br /> <br />
        <h2>Welcome, {backendData?.firstName}</h2>
        <img src={backendData?.profilePicURL} alt="" />
        <h3>Username</h3>
        <p>{backendData?.username}</p>
        <h3>Password</h3>
        <p>*****</p>
        <h3>Date of Birth</h3>
        <p>{backendData?.dateOfBirth}</p>
        <h3>Current Projects</h3>
        {backendData?.currentProjects?.map((project, index) => (
          <>
            <p>{project.title}</p>
            <p>{project.status}</p>
            <p>{project.waitingForInfluencer}</p>
          </>
        ))}
        {/* <p>{backendData?.currentProjects}</p> */}
        <button>Upload Media Kit</button>
        <button>
          <a href={backendData?.socialMediaLinks?.instagram}>Instagram</a>
        </button>
        <button
          onClick={() => {
            setShowForm(!showForm);
          }}
        >
          {formButtonText}
        </button>
        {showForm ? (
          <form action="" onSubmit={handleSubmit}>
            <label htmlFor="firstname">First Name</label>
            <input
              type="text"
              id="firstname"
              autoComplete="off"
              placeholder={backendData.firstName}
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
            />
            <label htmlFor="lastname">Last Name</label>
            <input
              type="text"
              id="lastname"
              autoComplete="off"
              placeholder={backendData.lastName}
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
            />
            <label htmlFor="role">Role:</label>
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

            <label htmlFor="dateofbirth">Date of Birth</label>
            <input
              onChange={(e) => {
                setDateOfBirth(e.target.value);
              }}
              type="date"
              id="dateofbirth"
              autoComplete="off"
              value={dateOfBirth}
              required
            />
            <label htmlFor="keywords">
              Please describe your brand or personal brand. <br />
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
                placeholder="Add a new keyword"
              />
            </div>

            <button>Update Profile</button>
          </form>
        ) : (
          ""
        )}
      </section>
    </>
  );
};

export default UpdateProfile;
