import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";
import { useState } from "react";

const UserCard = ({ user }) => {
  const { _id, firstName, lastName, photoUrl, age, gender, about } = user;
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleSendRequest = async (status, userId) => {
    setIsLoading(true);
    try {
      const res = await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(userId));
    } catch (err) {
      console.error("Request failed:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="card bg-black border border-gray-800 w-96 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:border-gray-700 group">
      <figure className="px-4 pt-4 relative overflow-hidden">
        {!imageError ? (
          <img 
            src={photoUrl} 
            alt={`${firstName} ${lastName}`} 
            className="rounded-xl w-full h-80 object-cover transition-transform duration-300 group-hover:scale-105"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="rounded-xl w-full h-80 bg-gray-800 flex items-center justify-center">
            <div className="text-gray-400 text-center">
              <div className="text-6xl mb-2">👤</div>
              <p className="text-sm">Photo unavailable</p>
            </div>
          </div>
        )}
        {/* Gradient overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
      </figure>
      
      <div className="card-body">
        <h2 className="card-title text-white text-xl font-bold">
          {firstName + " " + lastName}
          {/* Verified badge simulation */}
          <div className="badge badge-primary badge-sm ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
            ✓
          </div>
        </h2>
        
        {age && gender && (
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <span>📍</span>
            <span>{age}, {gender}</span>
          </div>
        )}
        
        <p className="text-gray-300 text-sm leading-relaxed line-clamp-3">
          {about || "No description available"}
        </p>
        
        {/* Skills/Tags placeholder - you can expand this */}
        {/* <div className="flex flex-wrap gap-1 mt-2">
          <span className="badge badge-outline badge-sm text-blue-400 border-blue-400">Developer</span>
          <span className="badge badge-outline badge-sm text-green-400 border-green-400">Tech</span>
        </div> */}
        
        <div className="card-actions justify-center my-4 gap-4">
          <button
            className="btn bg-gray-800 text-white border-gray-700 hover:bg-gray-700 hover:border-gray-600 px-8 transition-all duration-200 disabled:opacity-50"
            onClick={() => handleSendRequest("ignored", _id)}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              <>
                {/* <span className="mr-2"></span> */}
                Pass
              </>
            )}
          </button>
          
          <button
            className="btn bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white border-none px-8 transition-all duration-200 hover:scale-105 hover:shadow-lg disabled:opacity-50"
            onClick={() => handleSendRequest("interested", _id)}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              <>
                {/* <span className="mr-2">💼</span> */}
                Connect
              </>
            )}
          </button>
        </div>
        
        {/* Connection success message could go here */}
        {isLoading && (
          <div className="text-center text-sm text-gray-400 animate-pulse">
            Sending request...
          </div>
        )}
      </div>
    </div>
  );
};

export default UserCard;