import { useState } from "react";
import axios from "axios";

const TestLogin = () => {
  const [err, setErr] = useState(false);
  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");

  const [userData, setUserData] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("button was clicked");

    try {
      const res = await axios.get(
        "https://jsonplaceholder.typicode.com/users/1"
      );
      setUserData(res.data);
      console.log(res);
    } catch (error) {
      console.log(err);
    }
  };
  return (
    <div className="container">
      <span>{userData?.name}</span>
      <form action="">
        <input
          type="text"
          placeholder="username"
          value={user}
          onChange={(e) => setUser(e.target.value)}
        />
        <input
          type="text"
          placeholder="password"
          value={pwd}
          onChange={(e) => setPwd(e.target.value)}
        />
        <button
          type="submit"
          disabled={!user && !pwd ? true : false}
          onClick={handleSubmit}
        >
          Submit
        </button>
        <p style={{ visibility: err ? "visible" : "hidden" }}>
          Something went wrong
        </p>
      </form>
    </div>
  );
};
export default TestLogin;
