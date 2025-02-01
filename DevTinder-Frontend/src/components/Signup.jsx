import { useState } from "react";
import PropTypes from "prop-types";
import { signup } from "../Helpers/restHelper";
import { toastHelper } from "../Helpers/toastHelper";

const Signup = ({ toggleSignup }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState(18);
  const [gender, setGender] = useState("male");
  const [photoUrl, setPhotoUrl] = useState("");
  const [skills, setSkills] = useState([]);
  const [about, setAbout] = useState("");
  const [city, setCity] = useState("");

  //Implement method to reset all fields
  const resetFields = () => {
    setFirstName("");
    setLastName("");
    setEmailId("");
    setPassword("");
    setAge(18);
    setGender("male");
    setPhotoUrl("");
    setSkills([]);
    setAbout("");
    setCity("");
  };

  //Implement method to save user
  const saveUser = async () => {
    const user = {
      firstName,
      lastName,
      emailId,
      about,
      password,
      city,
      age,
      gender,
      skills,
      photoUrl,
    };
    //Call signup method from restHelper
    try {
      let responseStatus = false;
      const response = await signup(user);
      responseStatus = response.ok;
      const parseRes = await response.json();
      if (responseStatus) {
        resetFields();
        toggleSignup(false);
      }
      toastHelper(responseStatus, parseRes);
    } catch (error) {
      toastHelper(false, error);
    }
  };

  return (
    <div className="flex justify-center mt-1">
      <div className="card bg-base-300 w-full shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center">Signup</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">First Name</span>
                </div>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="First Name"
                  className="input input-bordered w-full max-w-xs input-sm"
                />
              </label>
            </div>
            <div>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Last Name</span>
                </div>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Last Name"
                  className="input input-bordered w-full max-w-xs input-sm"
                />
              </label>
            </div>
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
            <div>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Age</span>
                </div>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="Age"
                  className="input input-bordered w-full max-w-xs input-sm"
                />
              </label>
            </div>
            <div>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Gender {gender}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <label className="cursor-pointer flex items-center">
                    <input
                      type="radio"
                      name="gender"
                      className="radio radio-sm"
                      value="male"
                      checked={gender === "male"}
                      onChange={(e) => setGender(e.target.value)}
                    />
                    <span className="label-text px-3">Male</span>
                  </label>
                  <label className="cursor-pointer flex items-center">
                    <input
                      type="radio"
                      name="gender"
                      className="radio radio-sm"
                      value="female"
                      checked={gender === "female"}
                      onChange={(e) => setGender(e.target.value)}
                    />
                    <span className="label-text pl-2">Fe-male</span>
                  </label>
                  <label className="cursor-pointer flex items-center">
                    <input
                      type="radio"
                      name="gender"
                      className="radio radio-sm"
                      value="others"
                      checked={gender === "others"}
                      onChange={(e) => setGender(e.target.value)}
                    />
                    <span className="label-text pl-2">Others</span>
                  </label>
                </div>
              </label>
            </div>
            <div>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Photo Url</span>
                </div>
                <input
                  type="text"
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                  placeholder="Photo Url"
                  className="input input-bordered w-full max-w-xs input-sm"
                />
              </label>
            </div>
            <div>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Skills</span>
                </div>
                <input
                  type="text"
                  value={skills}
                  onChange={(e) => {
                    const skillArray = e.target.value.split(",");
                    setSkills(skillArray);
                  }}
                  placeholder="Add skills with comma separated"
                  className="input input-bordered w-full max-w-xs input-sm"
                />
              </label>
            </div>
            <div>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">About</span>
                </div>
                <input
                  type="text"
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                  placeholder="About"
                  className="input input-bordered w-full max-w-xs input-sm"
                />
              </label>
            </div>
            <div>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">City</span>
                </div>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="City"
                  className="input input-bordered w-full max-w-xs input-sm"
                />
              </label>
            </div>
          </div>

          <div className="card-actions justify-end mt-3">
            <a className="link link-accent" onClick={() => toggleSignup(false)}>
              Login
            </a>
            <button
              className="btn btn-primary btn-outline btn-sm"
              onClick={() => resetFields()}
            >
              Reset
            </button>
            <button
              className="btn btn-primary btn-sm"
              onClick={() => saveUser()}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
Signup.propTypes = {
  toggleSignup: PropTypes.func.isRequired,
};

export default Signup;
