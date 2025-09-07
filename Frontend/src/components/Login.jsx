import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [formData, setFormData] = useState({
    emailId: "",
    password: "",
    firstName: "",
    lastName: ""
  });
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { emailId, password, firstName, lastName } = formData;
    
    if (!emailId || !password || (!isLoginForm && (!firstName || !lastName))) {
      setError("Please fill in all required fields");
      return;
    }
    
    setIsLoading(true);
    setError("");
    
    try {
      const endpoint = isLoginForm ? "/login" : "/signup";
      const payload = isLoginForm 
        ? { emailId, password }
        : { firstName, lastName, emailId, password };
        
      const res = await axios.post(BASE_URL + endpoint, payload, { withCredentials: true });
      
      dispatch(addUser(isLoginForm ? res.data : res.data.data));
      navigate(isLoginForm ? "/" : "/profile");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-white mb-2">
            {isLoginForm ? "Welcome Back" : "Create Account"}
          </h1>
          <p className="text-gray-400">
            {isLoginForm ? "Sign in to your account" : "Join our community"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLoginForm && (
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                disabled={isLoading}
                required
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                disabled={isLoading}
                required
              />
            </div>
          )}

          <input
            type="email"
            name="emailId"
            placeholder="Email Address"
            value={formData.emailId}
            onChange={handleInputChange}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
            disabled={isLoading}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
            disabled={isLoading}
            required
          />

          {error && (
            <div className="bg-red-900/50 border border-red-800 text-red-300 px-3 py-2 rounded-md text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Loading..." : isLoginForm ? "Sign In" : "Create Account"}
          </button>
        </form>

        <div className="text-center mt-6">
          <button
            onClick={() => {
              setIsLoginForm(!isLoginForm);
              setError("");
            }}
            className="text-gray-400 hover:text-blue-400 text-sm transition-colors"
            disabled={isLoading}
          >
            {isLoginForm ? "Need an account? Sign up" : "Have an account? Sign in"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;