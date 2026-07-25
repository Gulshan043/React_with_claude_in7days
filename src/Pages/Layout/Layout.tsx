import { Outlet } from "react-router-dom";
import Menu from "../../components/Menu/Menu";
import Navbar from "../../components/Navbar/Navbar";
import "./Layout.scss";

const Layout = () => {
  return (
    <div className="main flex h-screen flex-col bg-slate-950">
      <Navbar />
      <div className="container flex flex-1 overflow-hidden">
        <div className="menu_container h-full">
          <Menu />
        </div>
        <div className="content_container h-full flex-1 overflow-y-auto p-6 text-slate-100">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
    