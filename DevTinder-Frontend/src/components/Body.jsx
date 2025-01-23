import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { ToastContainer } from "react-toastify";

const Body = () => {
  return (
    <>
      <ToastContainer />
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default Body;
