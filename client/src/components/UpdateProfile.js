import React, { useState, useEffect } from "react";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";

const GETUSER_URL = "/api/getuser";

const UpdateProfile = () => {
  // Use authContext to get the current logged in user ? ?
  const { auth } = useAuth();
  // STATE
  const [backendData, setBackendData] = useState({
    status: "still fetching data",
  });

  const [showForm, setShowForm] = useState(false);
  const [formButtonText, setFormButtonText] = useState("Change Profile");
  useEffect(() => {
    if (showForm) {
      setFormButtonText("Hide");
    } else {
      setFormButtonText("Change Profile");
    }
  }, [showForm]);

  // const [errMsg, setErrMsg] = useState("");
  // const [err, setErr] = useState(false);

  // AXIOS
  // Axios GET Request - Fetch user data
  const fetchUser = async () => {
    const user = auth?.user;
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

    console.log(response.data.userProfile);
    setBackendData(response.data.userProfile);
  };

  useEffect(() => {
    fetchUser().catch(console.error);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <>
      <section>
        {/* wrap this all in ternary, so if the user is not found, we don't display anything */}
        <h1>{backendData.status}</h1>
        <h1>Profile Information</h1>
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
        <p>{backendData?.currentProjects}</p>
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
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              autoComplete="off"
              placeholder={backendData.username}
            />
          </form>
        ) : (
          ""
        )}
      </section>
    </>
  );
};

export default UpdateProfile;
