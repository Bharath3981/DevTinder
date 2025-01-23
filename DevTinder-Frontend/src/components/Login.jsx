import { useState } from "react";
import { login } from "../Helpers/restHelper";
import { useDispatch } from "react-redux";
import { addUser } from "../Helpers/userSlice";
import { toastHelper } from "../Helpers/toastHelper";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [emailId, setEmailId] = useState("bharath@gmail.com");
  const [password, setPassword] = useState("Bharath@123");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //Handle login
  const handleLogin = async () => {
    let responseStatus = false;
    const response = await login(emailId, password);
    responseStatus = response.ok;
    const parseRes = await response.json();
    if (responseStatus) {
      dispatch(addUser(parseRes.data));
      navigate("/");
    } else {
      console.log("Error: ", parseRes);
    }
    toastHelper(responseStatus, parseRes);
  };
  return (
    <div className="flex justify-center mt-32">
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
            <button className="btn btn-primary btn-outline btn-sm">
              Reset
            </button>
            <button onClick={handleLogin} className="btn btn-primary btn-sm">
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
