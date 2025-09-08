import { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [age, setAge] = useState(user.age || "");
  const [gender, setGender] = useState(user.gender || "");
  const [about, setAbout] = useState(user.about || "");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const [showToast, setShowToast] = useState(false);

  const saveProfile = async () => {
    setError("");
    setIsLoading(true);
    
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        { firstName, lastName, photoUrl, age, gender, about },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 4000);
    } catch (err) {
      setError(err.response.data);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 py-10">
      <div className="flex justify-center">
        <div className="flex justify-center mx-10 gap-8">
          <div className="card bg-black/80 backdrop-blur-sm border border-gray-700/50 w-96 shadow-2xl">
            <div className="card-body">
              <h2 className="card-title justify-center text-white text-2xl mb-6">Edit Profile</h2>
              <div className="space-y-4">
                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text text-gray-300 font-medium">First Name</span>
                  </div>
                  <input
                    type="text"
                    value={firstName}
                    className="input input-bordered bg-gray-800/50 border-gray-600 text-white w-full focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </label>
                
                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text text-gray-300 font-medium">Last Name</span>
                  </div>
                  <input
                    type="text"
                    value={lastName}
                    className="input input-bordered bg-gray-800/50 border-gray-600 text-white w-full focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </label>
                
                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text text-gray-300 font-medium">Photo URL</span>
                  </div>
                  <input
                    type="text"
                    value={photoUrl}
                    className="input input-bordered bg-gray-800/50 border-gray-600 text-white w-full focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                    onChange={(e) => setPhotoUrl(e.target.value)}
                  />
                </label>
                
                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text text-gray-300 font-medium">Age</span>
                  </div>
                  <input
                    type="number"
                    value={age}
                    className="input input-bordered bg-gray-800/50 border-gray-600 text-white w-full focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                    onChange={(e) => setAge(e.target.value)}
                  />
                </label>
                
                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text text-gray-300 font-medium">Gender</span>
                  </div>
                  <select
                    value={gender}
                    className="select select-bordered bg-gray-800/50 border-gray-600 text-white w-full focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <option value="" disabled className="text-gray-400">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </label>
                
                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text text-gray-300 font-medium">About</span>
                  </div>
                  <textarea
                    value={about}
                    rows="3"
                    className="textarea textarea-bordered bg-gray-800/50 border-gray-600 text-white w-full focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all resize-none"
                    onChange={(e) => setAbout(e.target.value)}
                    placeholder="Tell us about yourself..."
                  />
                </label>
              </div>
              
              {error && (
                <div className="alert alert-error bg-red-900/20 border border-red-500/30 text-red-300 mt-4">
                  <span>{error}</span>
                </div>
              )}
              
              <div className="card-actions justify-center mt-6">
                <button 
                  className="btn bg-blue-600 hover:bg-blue-700 border-none text-white w-full transition-all duration-200 disabled:opacity-50"
                  onClick={saveProfile}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <span className="loading loading-spinner loading-sm"></span>
                      Saving...
                    </>
                  ) : (
                    'Save Profile'
                  )}
                </button>
              </div>
            </div>
          </div>
          <UserCard
            user={{ firstName, lastName, photoUrl, age, gender, about }}
          />
        </div>
      </div>
      
      {/* Success Toast */}
      {showToast && (
        <div className="toast toast-top toast-center z-50">
          <div className="alert bg-green-600 text-white border-green-500 shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Profile updated successfully!</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProfile;