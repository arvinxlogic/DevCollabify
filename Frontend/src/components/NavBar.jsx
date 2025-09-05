import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";

const NavBar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      return navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="navbar bg-black border-b border-gray-800 shadow-lg">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl text-white hover:bg-gray-900">
          👩‍💻 DevTinder
        </Link>
      </div>
      {user && (
        <div className="flex-none gap-2">
          <div className="form-control text-gray-300">Welcome, {user.firstName}</div>
          <div className="dropdown dropdown-end mx-5 flex">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar hover:bg-gray-900"
            >
              <div className="w-10 rounded-full ring-2 ring-gray-700">
                <img alt="user photo" src={user.photoUrl} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-black border border-gray-800 rounded-box z-[1] mt-3 w-52 p-2 shadow-xl"
            >
              <li>
                <Link to="/profile" className="justify-between text-white hover:bg-gray-900">
                  Profile
                  <span className="badge badge-accent">New</span>
                </Link>
              </li>
              <li>
                <Link to="/connections" className="text-white hover:bg-gray-900">Connections</Link>
              </li>
              <li>
                <Link to="/requests" className="text-white hover:bg-gray-900">Requests</Link>
              </li>
              <li>
                <Link to="/premium" className="text-white hover:bg-gray-900">Premium</Link>
              </li>
              <li>
                <a onClick={handleLogout} className="text-red-400 hover:bg-gray-900">Logout</a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
export default NavBar;