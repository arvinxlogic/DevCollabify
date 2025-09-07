import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!emailId || !password) {
      setError("Please fill in all required fields");
      return;
    }
    
    setIsLoading(true);
    setError("");
    
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        { emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      return navigate("/");
    } catch (err) {
      setError(err?.response?.data || "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async () => {
    if (!firstName || !lastName || !emailId || !password) {
      setError("Please fill in all required fields");
      return;
    }
    
    setIsLoading(true);
    setError("");
    
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        { firstName, lastName, emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.data));
      return navigate("/profile");
    } catch (err) {
      setError(err?.response?.data || "Sign up failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const clearError = () => {
    if (error) setError("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-black flex justify-center items-center py-10 px-4">
      <div className="card bg-black/80 backdrop-blur-sm border border-gray-800 w-full max-w-md shadow-2xl">
        <div className="card-body p-8">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="text-4xl mb-3">🚀</div>
            <h2 className="text-2xl font-bold text-white mb-2">
              {isLoginForm ? "Welcome Back" : "Join DevConnect"}
            </h2>
            <p className="text-gray-400 text-sm">
              {isLoginForm 
                ? "Sign in to continue your networking journey" 
                : "Create your developer profile today"
              }
            </p>
          </div>

          <form onSubmit={(e) => e.preventDefault()}>
            {!isLoginForm && (
              <div className="grid grid-cols-2 gap-3 mb-4">
                <label className="form-control">
                  <div className="label">
                    <span className="label-text text-gray-300 text-sm">First Name *</span>
                  </div>
                  <input
                    type="text"
                    value={firstName}
                    className="input input-bordered bg-gray-800/50 border-gray-700 text-white text-sm focus:border-blue-500 focus:bg-gray-800"
                    placeholder="John"
                    onChange={(e) => {
                      setFirstName(e.target.value);
                      clearError();
                    }}
                    disabled={isLoading}
                  />
                </label>
                <label className="form-control">
                  <div className="label">
                    <span className="label-text text-gray-300 text-sm">Last Name *</span>
                  </div>
                  <input
                    type="text"
                    value={lastName}
                    className="input input-bordered bg-gray-800/50 border-gray-700 text-white text-sm focus:border-blue-500 focus:bg-gray-800"
                    placeholder="Doe"
                    onChange={(e) => {
                      setLastName(e.target.value);
                      clearError();
                    }}
                    disabled={isLoading}
                  />
                </label>
              </div>
            )}

            <label className="form-control mb-4">
              <div className="label">
                <span className="label-text text-gray-300 text-sm">Email Address *</span>
              </div>
              <input
                type="email"
                value={emailId}
                className="input input-bordered bg-gray-800/50 border-gray-700 text-white focus:border-blue-500 focus:bg-gray-800"
                placeholder="john@example.com"
                onChange={(e) => {
                  setEmailId(e.target.value);
                  clearError();
                }}
                disabled={isLoading}
              />
            </label>

            <label className="form-control mb-6">
              <div className="label">
                <span className="label-text text-gray-300 text-sm">Password *</span>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  className="input input-bordered bg-gray-800/50 border-gray-700 text-white focus:border-blue-500 focus:bg-gray-800 pr-12"
                  placeholder="Enter your password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                    clearError();
                  }}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white text-sm"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </label>

            {error && (
              <div className="alert alert-error bg-red-900/30 border-red-800 text-red-300 text-sm mb-4">
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              className="btn bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white border-none w-full mb-4 transition-all duration-200 disabled:opacity-50"
              onClick={isLoginForm ? handleLogin : handleSignUp}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>
                  {isLoginForm ? "Signing In..." : "Creating Account..."}
                </>
              ) : (
                isLoginForm ? "Sign In" : "Create Account"
              )}
            </button>

            <div className="text-center">
              <button
                type="button"
                className="text-gray-400 hover:text-blue-400 text-sm transition-colors underline"
                onClick={() => {
                  setIsLoginForm(!isLoginForm);
                  setError("");
                }}
                disabled={isLoading}
              >
                {isLoginForm
                  ? "Don't have an account? Sign up here"
                  : "Already have an account? Sign in here"
                }
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Login;