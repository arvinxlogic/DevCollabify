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
    <div className="navbar bg-black border-b border-gray-800 shadow-lg sticky top-0 z-50 backdrop-blur-sm">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl text-white hover:bg-gray-900 transition-all duration-200 hover:scale-105">
          👨🏻‍💻 DevConnect
        </Link>
      </div>
      {user && (
        <div className="flex-none gap-2">
          <div className="hidden sm:block form-control text-gray-300 px-3">
            Welcome, <span className="text-blue-400 font-semibold">{user.firstName}</span>
          </div>
          <div className="dropdown dropdown-end mx-5 flex">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar hover:bg-gray-900 relative group"
            >
              <div className="w-10 rounded-full ring-2 ring-gray-700 group-hover:ring-blue-500 transition-all duration-200">
                <img 
                  alt="user photo" 
                  src={user.photoUrl} 
                  className="rounded-full object-cover"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/40/4b5563/ffffff?text=U';
                  }}
                />
              </div>
              {/* Online status indicator */}
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-black"></div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-black border border-gray-800 rounded-box z-[1] mt-3 w-52 p-2 shadow-2xl"
            >
              <li>
                <Link to="/profile" className="justify-between text-white hover:bg-gray-900 hover:text-blue-400 transition-colors">
                  Profile
                  <span className="badge badge-accent text-xs">Edit</span>
                </Link>
              </li>
              <li>
                <Link to="/connections" className="text-white hover:bg-gray-900 hover:text-blue-400 transition-colors">
                  Connections
                </Link>
              </li>
              <li>
                <Link to="/requests" className="text-white hover:bg-gray-900 hover:text-blue-400 transition-colors">
                  Requests
                </Link>
              </li>
              <li>
                <Link to="/premium" className="text-white hover:bg-gray-900 hover:text-yellow-400 transition-colors">
                  Premium ⭐
                </Link>
              </li>
              <li className="border-t border-gray-700 mt-2 pt-2">
                <a onClick={handleLogout} className="text-red-400 hover:bg-gray-900 hover:text-red-300 transition-colors cursor-pointer">
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
export default NavBar;