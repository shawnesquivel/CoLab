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
  PM: 1000,
  Coder: 2000,
  Tester: 3000,
  Admin: 4000,
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
        <Route element={<RequireAuth allowedRoles={[1000]} />}>
          <Route path="home" element={<HomePage />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={[ROLES.PM]} />}>
          <Route path="editor" element={<Editor />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
          <Route path="admin" element={<Admin />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={[ROLES.Coder]} />}>
          <Route path="lounge" element={<Lounge />} />
        </Route>

        {/* Else  */}
        <Route path="*" element={<ErrorPage />} />
      </Route>
    </Routes>
  );
};

export default App;
