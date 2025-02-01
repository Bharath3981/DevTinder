import { useState } from "react";
import { login } from "../Helpers/restHelper";
import { useDispatch } from "react-redux";
import { addUser } from "../Helpers/Slices/userSlice";
import { toastHelper } from "../Helpers/toastHelper";
import { useNavigate } from "react-router-dom";
import Signup from "./Signup";

const Login = () => {
  const [emailId, setEmailId] = useState("pidaparthi@gmail.com");
  const [password, setPassword] = useState("Sumanth@123");
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //Handle login
  const handleLogin = async () => {
    let responseStatus = false;
    try {
      const response = await login(emailId, password);
      responseStatus = response.ok;
      const parseRes = await response.json();
      if (responseStatus) {
        dispatch(addUser(parseRes.data));
        navigate("/");
      }
      toastHelper(responseStatus, parseRes);
    } catch (error) {
      toastHelper(false, error);
    }
  };

  //Open modal
  const toggleSignup = (value) => {
    setShowModal(value);
  };

  return (
    <>
      <div className="flex justify-center mt-32">
        {!showModal && (
          <div className="card bg-base-300 w-96 shadow-xl">
            <div className="card-body">
              <h2 className="card-title justify-center">Login</h2>
              <div>
                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text">Email Id</span>
                  </div>
                  <input
                    type="text"
                    value={emailId}
                    onChange={(e) => setEmailId(e.target.value)}
                    placeholder="Email Id"
                    className="input input-bordered w-full max-w-xs input-sm"
                  />
                </label>
              </div>
              <div>
                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text">Password</span>
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="input input-bordered w-full max-w-xs input-sm"
                  />
                </label>
              </div>
              <div className="card-actions justify-end mt-3">
                <a
                  className="link link-accent"
                  onClick={() => toggleSignup(true)}
                >
                  Signup
                </a>
                <button className="btn btn-primary btn-outline btn-sm">
                  Reset
                </button>
                <button
                  onClick={handleLogin}
                  className="btn btn-primary btn-sm"
                >
                  Login
                </button>
              </div>
            </div>
          </div>
        )}
        {showModal && <Signup toggleSignup={toggleSignup} />}
      </div>
    </>
  );
};

export default Login;
