import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";
import { useState } from "react";

const NavBar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      return navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-gray-900/95 backdrop-blur-md border-b border-gray-700/50 shadow-xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-2 text-xl font-bold text-white hover:text-blue-400 transition-all duration-300"
          >
            <span className="text-2xl">👨🏻‍💻</span>
            <span>DevConnect</span>
          </Link>

          {user && (
            <>
              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-6">
                <div className="text-gray-300 text-sm">
                  Hey, <span className="text-blue-400 font-medium">{user.firstName}!</span>
                </div>
                
                <div className="flex items-center space-x-1">
                  <Link 
                    to="/profile" 
                    className="px-3 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800 transition-all duration-200"
                  >
                    Profile
                  </Link>
                  <Link 
                    to="/connections" 
                    className="px-3 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800 transition-all duration-200"
                  >
                    Connections
                  </Link>
                  <Link 
                    to="/requests" 
                    className="px-3 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800 transition-all duration-200"
                  >
                    Requests
                  </Link>
                  <Link 
                    to="/premium" 
                    className="px-3 py-2 rounded-lg text-yellow-400 hover:text-yellow-300 hover:bg-yellow-400/10 transition-all duration-200 font-medium"
                  >
                    Premium ⭐
                  </Link>
                </div>
                
                {/* User Section */}
                <div className="flex items-center space-x-3 pl-3 border-l border-gray-700">
                  <div className="relative">
                    <img 
                      alt="user photo" 
                      src={user.photoUrl} 
                      className="w-9 h-9 rounded-full object-cover ring-2 ring-gray-600 hover:ring-blue-500 transition-all duration-200"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/36/6b7280/ffffff?text=' + user.firstName[0];
                      }}
                    />
                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-900"></div>
                  </div>
                  
                  <button 
                    onClick={handleLogout}
                    className="px-3 py-2 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-400/10 transition-all duration-200 text-sm font-medium"
                  >
                    Logout
                  </button>
                </div>
              </div>

              {/* Mobile hamburger button */}
              <div className="md:hidden flex items-center space-x-3">
                <div className="relative">
                  <img 
                    alt="user photo" 
                    src={user.photoUrl} 
                    className="w-8 h-8 rounded-full object-cover ring-2 ring-gray-600"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/32/6b7280/ffffff?text=' + user.firstName[0];
                    }}
                  />
                </div>
                <button
                  onClick={toggleMenu}
                  className="p-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800 focus:outline-none transition-all duration-200"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    {isMenuOpen ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    )}
                  </svg>
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {user && isMenuOpen && (
        <div className="md:hidden bg-gray-900/98 backdrop-blur-sm border-t border-gray-700/50">
          <div className="px-4 pt-2 pb-4 space-y-1">
            <div className="px-3 py-3 text-gray-300 border-b border-gray-700/50 mb-3">
              <span className="text-sm">Welcome back,</span>
              <div className="text-blue-400 font-medium">{user.firstName}!</div>
            </div>
            
            {[
              { to: "/profile", label: "Profile" },
              { to: "/connections", label: "Connections" },
              { to: "/requests", label: "Requests" },
              { to: "/premium", label: "Premium ⭐", special: true }
            ].map(({ to, label, special }) => (
              <Link 
                key={to}
                to={to} 
                className={`block px-3 py-3 rounded-lg transition-all duration-200 ${
                  special 
                    ? "text-yellow-400 hover:text-yellow-300 hover:bg-yellow-400/10 font-medium" 
                    : "text-gray-300 hover:text-white hover:bg-gray-800"
                }`}
                onClick={closeMenu}
              >
                {label}
              </Link>
            ))}
            
            <div className="pt-3 border-t border-gray-700/50">
              <button 
                onClick={() => {
                  handleLogout();
                  closeMenu();
                }}
                className="w-full text-left px-3 py-3 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-400/10 transition-all duration-200"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;