import React, { useState } from "react";

function TestForm({ headingText }) {
  const [state, setState] = useState({
    name: "Blank",
    age: 5,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const updateName = (e) => {
    e.preventDefault();
    setState({ ...state, name: e.target.value });
  };

  const updateAge = (e) => {
    e.preventDefault();
    setState({ ...state, age: e.target.value });
  };

  return (
    <div className="App">
      <p data-testid="welcome-banner">Welcome {state.name} </p>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={state.name} onChange={updateName} />
        </label>
        <label>
          Age:
          <input type="text" value={state.age} onChange={updateAge} />
        </label>
      </form>

      <h1>{headingText ? headingText : "a turquoise frog"}</h1>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default TestForm;
