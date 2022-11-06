import { Outlet, Link } from "react-router-dom";
import Links from "./Links";
import { useState } from "react";
const Layout = () => {
  return (
    <main className="App-outer">
      <div className="App-inner">
        <Links />
        <Outlet />
      </div>
    </main>
  );
};

export default Layout;
