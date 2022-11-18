import { Route, Routes } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import ErrorPage from "./components/ErrorPage";
import ChangePassword from "./components/ChangePassword";
import UpdateProfile from "./components/UpdateProfile";
import Layout from "./components/Layout";
import Unauthorized from "./components/Unauthorized";
import Links from "./components/Links";
import Dashboard from "./components/Dashboard";
import RequireAuth from "./components/RequireAuth";

const ROLES = {
  Admin: 1000,
  Influencer: 2000,
  Brand: 3000,
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
        <Route path="unauthorized" element={<Unauthorized />} />

        {/* Private Routes (role based) */}
        <Route
          element={
            <RequireAuth
              allowedRoles={[ROLES.Admin, ROLES.Influencer, ROLES.Brand]}
            />
          }
        >
          <Route path="updateprofile" element={<UpdateProfile />} />
        </Route>

        <Route
          element={
            <RequireAuth
              allowedRoles={[ROLES.Admin, ROLES.Influencer, ROLES.Brand]}
            />
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
        </Route>

        {/* <Route
          element={<RequireAuth allowedRoles={[ROLES.Admin, ROLES.Brand]} />}
        >
          <Route path="createproject" element={<CreateProject />} />
        </Route> */}

        {/* <Route
          element={
            <RequireAuth allowedRoles={[ROLES.Influencer, ROLES.Brand]} />
          }
        >
          <Route path="upcoming" element={<UpcomingCollabs />} />
        </Route> */}

        {/* <Route element={<RequireAuth allowedRoles={[ROLES.Influencer]} />}>
          <Route path="invites" element={<CollabInvites />} />
        </Route> */}

        {/* Else  */}
        <Route path="*" element={<ErrorPage />} />
      </Route>
    </Routes>
  );
};

export default App;
