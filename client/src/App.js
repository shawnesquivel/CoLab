import { Route, Routes, Link } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import ErrorPage from "./components/ErrorPage";
import ChangePassword from "./components/ChangePassword";
import UpdateProfile from "./components/UpdateProfile";
import Layout from "./components/Layout";
import Unauthorized from "./components/Unauthorized";
import Admin from "./components/Admin";
import Lounge from "./components/Lounge";
import Editor from "./components/Editor";
import Links from "./components/Links";
import HomePage from "./components/HomePage";
import RequireAuth from "./components/RequireAuth";

const ROLES = {
  User: 1000,
  Editor: 2000,
  Admin: 3000,
};

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Public Routes */}
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="links" element={<Links />} />
        <Route path="changepassword" element={<ChangePassword />} />
        <Route path="updateprofile" element={<UpdateProfile />} />
        <Route path="unauthorized" element={<Unauthorized />} />

        {/* Private Routes (role based) */}
        <Route element={<RequireAuth />}>
          <Route path="home" element={<HomePage />} />
          <Route path="editor" element={<Editor />} />
          <Route path="admin" element={<Admin />} />
          <Route path="lounge" element={<Lounge />} />
        </Route>

        {/* Else  */}
        <Route path="*" element={<ErrorPage />} />
      </Route>
    </Routes>
  );
};

export default App;
