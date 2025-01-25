import { useSelector } from "react-redux";
import { logout } from "../Helpers/restHelper";
import { useDispatch } from "react-redux";
import { removeUser } from "../Helpers/Slices/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { toastHelper } from "../Helpers/toastHelper";

const Navbar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //Implement logout functionality
  const handleLogout = async () => {
    try {
      const response = await logout();
      const parseRes = await response.json();
      console.log(response, parseRes);
      if (response.ok) {
        dispatch(removeUser());
        navigate("/login");
      }
      toastHelper(response.ok, parseRes);
    } catch (error) {
      toastHelper(false, error);
    }
  };
  return (
    <>
      <div className="navbar bg-base-300">
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost text-xl">
            {" "}
            Dev Tinder
          </Link>
        </div>
        {user && (
          <div className="flex-none gap-2 mr-4">
            <p>
              Welcome {user.firstName} {user.lastName}
            </p>
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src={user?.photoUrl}
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                <li>
                  <Link to="/profile" className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </Link>
                </li>
                <li>
                  <a>Settings</a>
                </li>
                <li onClick={() => handleLogout()}>
                  <a>Logout</a>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;
