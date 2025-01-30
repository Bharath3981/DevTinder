import { Outlet } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import { getProfile } from "../Helpers/restHelper";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../Helpers/Slices/userSlice";
import { ToastContainer } from "react-toastify";
import { toastHelper } from "../Helpers/toastHelper";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = lazy(() => import("./Navbar"));
const Footer = lazy(() => import("./Footer"));

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
        dispatch(addUser(parseRes.data));
        //navigate("/");
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
      <Suspense fallback={<div>Loading...</div>}>
        <Navbar />
        <Outlet />
        <Footer />
      </Suspense>
    </>
  );
};

export default Body;
