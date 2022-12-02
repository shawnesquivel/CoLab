import React from "react";

import useFetchUserAndProjects from "../hooks/useFetchUserAndProjects";

const Test = () => {
  // Encapsulate all the logic into a custom hook, useFetchUserAndProjects!
  const user = useFetchUserAndProjects();

  return (
    <div>
      <h1>Testing useFetchUser</h1>
      <p>User Data: {user.username}</p>
    </div>
  );
};

export default Test;

// import useLocalStorage from "../hooks/useLocalStorage";
// import useUpdateLogger from "../hooks/useUpdateLogger";
//  {/* <h1>Test Custom Hooks</h1>
//       <h2>Test useLocalStorage</h2>
//       <input
//         ref={inputRef}
//         style={{
//           fontSize: "5rem",
//           height: "200px",
//           width: "50%",
//           margin: "1rem 1rem",
//         }}
//         type="text"
//         onChange={(e) => setName(e.target.value)}
//       />
//       <p>
//         My name is {name}, but it used to be: {prevName.current}
//       </p>
//       <button style={{ marginBottom: "5rem" }} onClick={focus}>
//         Focus
//       </button> */}
