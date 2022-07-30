// import React, { useState, useEffect } from "react";
import Register from "./Register";
const App = () => {
  // const [backendData, setBackendData] = useState([{}]);
  //
  // can use the relative route since we defined the proxy in the json
  // useEffect(() => {
  //   fetch("http://localhost:5000/api")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setBackendData(data);
  //     });
  // }, []);

  return (
    <main className="App">
      <Register />
    </main>
  );
};

export default App;
