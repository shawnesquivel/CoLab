import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <main className="App-outer">
      <div className="App-inner">
        <Outlet />
      </div>
    </main>
  );
};

export default Layout;
