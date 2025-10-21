// src/components/NavBar.jsx - WITH PREMIUM INDICATOR
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";
import { useState, useEffect } from "react";

const NavBar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPremium, setIsPremium] = useState(false);

  // Check Premium Status
  useEffect(() => {
    const checkPremium = async () => {
      try {
        const res = await axios.get(BASE_URL + "/premium/verify", {
          withCredentials: true,
        });
        setIsPremium(res.data.isPremium);
      } catch (err) {
        setIsPremium(false);
      }
    };
    
    if (user) {
      checkPremium();
    }
  }, [user]);

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
    <nav className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-lg border-b border-slate-700 shadow-lg">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <span className="text-3xl transform group-hover:rotate-12 transition-transform duration-300">
              👨🏻‍💻
            </span>
            <span className="text-2xl font-bold text-slate-200">
              DevConnect
            </span>
          </Link>

          {user && (
            <>
              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-1">
                <Link
                  to="/"
                  className="px-4 py-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-all duration-200"
                >
                  Feed
                </Link>
                <Link
                  to="/connections"
                  className="px-4 py-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-all duration-200"
                >
                  Connections
                </Link>
                <Link
                  to="/requests"
                  className="px-4 py-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-all duration-200"
                >
                  Requests
                </Link>
                <Link
                  to="/premium"
                  className="px-4 py-2 text-amber-400 hover:text-amber-300 hover:bg-amber-500/10 rounded-lg transition-all duration-200 flex items-center space-x-1"
                >
                  <span>Premium</span>
                  <span className="text-lg">⭐</span>
                </Link>
              </div>

              {/* User Section */}
              <div className="hidden md:flex items-center space-x-4">
                {/* Premium Badge */}
                {isPremium && (
                  <div className="px-3 py-1 bg-amber-500/10 border border-amber-500/30 rounded-full flex items-center space-x-1">
                    <span className="text-lg">⭐</span>
                    <span className="text-amber-400 text-xs font-semibold">PREMIUM</span>
                  </div>
                )}
                
                <span className="text-sm text-slate-400">
                  Hey, <span className="text-blue-400 font-semibold">{user.firstName}</span>!
                </span>
                
                <div className="flex items-center space-x-3">
                  <Link to="/profile" className="relative group">
                    <img
                      src={user.photoUrl}
                      alt={user.firstName}
                      className="w-10 h-10 rounded-full object-cover border-2 border-blue-500/30 group-hover:border-blue-500 transition-all duration-300"
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/150?text=" + user.firstName?.charAt(0);
                      }}
                    />
                    <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-teal-500 rounded-full border-2 border-slate-900"></span>
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-all duration-200 transform hover:scale-105"
                  >
                    Logout
                  </button>
                </div>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={toggleMenu}
                className="md:hidden p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors duration-200"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </>
          )}

          {!user && (
            <div className="flex items-center space-x-4">
              <Link to="/login" className="px-6 py-2 text-white hover:text-blue-400 transition-colors duration-200">
                Login
              </Link>
              <Link to="/login" className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all duration-200 transform hover:scale-105">
                Sign Up
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu */}
        {user && isMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-800 animate-slideDown">
            <div className="flex flex-col space-y-2">
              <div className="flex items-center space-x-3 px-4 py-3 bg-slate-800/50 rounded-lg mb-2">
                <img
                  src={user.photoUrl}
                  alt={user.firstName}
                  className="w-12 h-12 rounded-full object-cover border-2 border-blue-500/30"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/150?text=" + user.firstName?.charAt(0);
                  }}
                />
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <p className="text-white font-semibold">{user.firstName} {user.lastName}</p>
                    {isPremium && <span className="text-lg">⭐</span>}
                  </div>
                  <p className="text-xs text-slate-400">{user.emailId}</p>
                  {isPremium && (
                    <span className="text-xs text-amber-400 font-semibold">Premium Member</span>
                  )}
                </div>
              </div>

              <Link to="/profile" onClick={closeMenu} className="px-4 py-3 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-all duration-200">
                Profile
              </Link>
              <Link to="/" onClick={closeMenu} className="px-4 py-3 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-all duration-200">
                Feed
              </Link>
              <Link to="/connections" onClick={closeMenu} className="px-4 py-3 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-all duration-200">
                Connections
              </Link>
              <Link to="/requests" onClick={closeMenu} className="px-4 py-3 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-all duration-200">
                Requests
              </Link>
              <Link to="/premium" onClick={closeMenu} className="px-4 py-3 text-amber-400 hover:text-amber-300 hover:bg-amber-500/10 rounded-lg transition-all duration-200 flex items-center space-x-2">
                <span>Premium</span>
                <span className="text-lg">⭐</span>
              </Link>
              <button onClick={() => { closeMenu(); handleLogout(); }} className="mx-4 mt-2 px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-all duration-200">
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
