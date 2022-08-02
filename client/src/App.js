import Register from "./components/Register";
import Login from "./components/Login";
import ErrorPage from "./components/ErrorPage";
import ChangePassword from "./components/ChangePassword";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

const App = () => {
  return (
    <main className="App">
      <h1>Debuggr.</h1>
      <Router>
        <nav>
          {/* <Link to="/"> Home </Link> */}
          <Link to="/"> Register </Link>
          <Link to="/login"> Login </Link>
          <Link to="/changepassword"> Change Password </Link>
        </nav>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/changepassword" element={<ChangePassword />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Router>
    </main>
  );
};

export default App;
