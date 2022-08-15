import React from "react";

const UpdateProfile = () => {
  // Use authContext to get the current logged in user

  // Make axios request to backend to get the user's data

  return (
    <>
      <section>
        <h1>Welcome, Influencer!</h1>
        <h3>Username</h3>
        <p>shawnsqcvl</p>
        <h3>Password</h3>
        <p>---------</p>
        <h3>Date of Birth</h3>
        <h3>Current Projects</h3>
        <button>Upload Media Kit</button>
        <button>Instagram</button>
      </section>
    </>
  );
};

export default UpdateProfile;
