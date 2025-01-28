import { useState } from "react";

const Signup = () => {
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

  return (
    <div className="flex justify-center mt-10">
      <div className="card bg-base-300 w-[80%] shadow-xl">
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
            <button className="btn btn-primary btn-outline btn-sm">
              Reset
            </button>
            <button className="btn btn-primary btn-sm">Save</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
