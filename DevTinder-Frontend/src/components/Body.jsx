import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { getProfile } from "../Helpers/restHelper";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../Helpers/Slices/userSlice";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import { toastHelper } from "../Helpers/toastHelper";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user);
  //Implement method to fetch logged in user details
  const getUser = async () => {
    let responseStatus = false;
    try {
      const response = await getProfile();
      responseStatus = response.ok;
      const parseRes = await response.json();
      if (responseStatus) {
        dispatch(addUser(parseRes));
        navigate("/");
      } else {
        navigate("/login");
        dispatch(removeUser(null));
      }
      toastHelper(responseStatus, parseRes);
    } catch (error) {
      toastHelper(false, error);
    }
  };
  useEffect(() => {
    if (userData === null) {
      getUser();
    }
  }, []);
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
