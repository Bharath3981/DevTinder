import { useState } from "react";
import PropTypes from "prop-types";
import UserCard from "./UserCard";
import { updateProfile } from "../Helpers/restHelper";
import { toastHelper } from "../Helpers/toastHelper";
import { useDispatch } from "react-redux";
import { addUser } from "../Helpers/Slices/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [gender, setGender] = useState(user.gender);
  const [age, setAge] = useState(user.age);
  const [about, setAbout] = useState(user.about);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const dispatch = useDispatch();

  //Implement method to update user profile
  const updateUserProfile = async () => {
    const profile = {
      firstName,
      lastName,
      gender,
      age,
      about,
      photoUrl,
    };
    //Call updateProfile method from restHelper
    try {
      let responseStatus = false;
      const response = await updateProfile(profile);
      responseStatus = response.ok;
      const parseRes = await response.json();
      if (responseStatus) {
        dispatch(addUser(parseRes.data));
      }
      toastHelper(responseStatus, parseRes);
    } catch (error) {
      toastHelper(false, error);
    }
  };

  return (
    <div>
      <div className="flex justify-center mt-32 gap-5">
        <div className="card bg-base-300 w-96 shadow-xl">
          <div className="card-body">
            <h2 className="card-title justify-center">Edit Profile</h2>
            <div>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">First Name</span>
                </div>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
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
                  className="input input-bordered w-full max-w-xs input-sm"
                />
              </label>
            </div>

            <div>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Photo URL</span>
                </div>
                <input
                  type="text"
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
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
                  type="text"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
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
                  <span className="label-text">About</span>
                </div>
                <input
                  type="text"
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                  className="input input-bordered w-full max-w-xs input-sm"
                />
              </label>
            </div>

            <div className="card-actions justify-end mt-3">
              <button className="btn btn-primary btn-outline btn-sm">
                Reset
              </button>
              <button
                className="btn btn-primary btn-sm"
                onClick={updateUserProfile}
              >
                Save
              </button>
            </div>
          </div>
        </div>
        <UserCard
          user={{
            firstName,
            lastName,
            gender,
            age,
            about,
            photoUrl,
            skills: user.skills,
          }}
          readOnly={true}
        ></UserCard>
      </div>
    </div>
  );
};
EditProfile.propTypes = {
  user: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    gender: PropTypes.string,
    age: PropTypes.number,
    about: PropTypes.string,
    photoUrl: PropTypes.string,
    skills: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};
export default EditProfile;
