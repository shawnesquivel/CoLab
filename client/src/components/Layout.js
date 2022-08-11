import { Outlet, Link } from "react-router-dom";
import Links from "./Links";

const Layout = () => {
  return (
    <main className="App">
      <h1>Layout</h1>
      <Links />

      <Outlet />
    </main>
  );
};

export default Layout;
