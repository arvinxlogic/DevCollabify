// src/components/Requests.jsx
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestSlice";
import { useEffect, useState } from "react";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();
  const [processingId, setProcessingId] = useState(null);

  const reviewRequest = async (status, _id) => {
    setProcessingId(_id);
    try {
      const res = await axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(_id));
    } catch (err) {
      console.error("Error reviewing request:", err);
      fetchRequests();
    } finally {
      setProcessingId(null);
    }
  };

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/request/received", {
        withCredentials: true,
      });
      dispatch(addRequests(res.data.data));
    } catch (err) {
      console.error("Failed to fetch requests:", err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return null;

  // Empty State
  if (requests.length === 0)
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="mb-8 relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl animate-pulse"></div>
            </div>
            <div className="relative text-8xl mb-4 animate-bounce">📬</div>
          </div>

          <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-4">
            No Pending Requests
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed mb-8">
            You don't have any connection requests at the moment. Keep discovering new developers!
          </p>

          <a
            href="/"
            className="inline-block px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg shadow-cyan-500/50"
          >
            Discover Developers
          </a>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black py-8 px-4">
      {/* Header */}
      <div className="max-w-4xl mx-auto mb-8">
        <div className="text-center md:text-left">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2">
            Connection Requests
          </h1>
          <p className="text-gray-400">
            You have <span className="text-cyan-400 font-semibold">{requests.length}</span> pending request{requests.length !== 1 ? 's' : ''}
          </p>
        </div>
      </div>

      {/* Requests List */}
      <div className="max-w-4xl mx-auto space-y-4">
        {requests.map((request) => (
          <div
            key={request._id}
            className="bg-gradient-to-br from-gray-900 to-black rounded-2xl overflow-hidden border border-cyan-500/20 shadow-xl hover:shadow-cyan-500/20 transition-all duration-300"
          >
            <div className="p-6">
              <div className="flex flex-col md:flex-row gap-6">
                {/* Profile Image */}
                <div className="flex-shrink-0">
                  <div className="relative">
                    <img
                      src={
                        request.fromUserId?.photoUrl ||
                        `https://ui-avatars.com/api/?name=${request.fromUserId?.firstName}+${request.fromUserId?.lastName}&size=200&background=0891b2&color=fff&bold=true`
                      }
                      alt={`${request.fromUserId?.firstName} ${request.fromUserId?.lastName}`}
                      className="w-24 h-24 md:w-32 md:h-32 rounded-xl object-cover border-2 border-cyan-500/30"
                      onError={(e) => {
                        e.target.src = `https://ui-avatars.com/api/?name=${request.fromUserId?.firstName}+${request.fromUserId?.lastName}&size=200&background=0891b2&color=fff&bold=true`;
                      }}
                    />
                    {/* Online Badge */}
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full border-4 border-black"></div>
                  </div>
                </div>

                {/* User Info */}
                <div className="flex-1">
                  <div className="mb-4">
                    <h3 className="text-2xl font-bold text-white mb-1">
                      {request.fromUserId?.firstName} {request.fromUserId?.lastName}
                    </h3>
                    
                    {request.fromUserId?.age && request.fromUserId?.gender && (
                      <div className="flex items-center space-x-2 text-gray-400 mb-3">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <span className="text-sm">
                          {request.fromUserId.age} • {request.fromUserId.gender}
                        </span>
                      </div>
                    )}

                    {request.fromUserId?.about && (
                      <p className="text-gray-400 text-sm leading-relaxed">
                        {request.fromUserId.about}
                      </p>
                    )}
                  </div>

                  {/* Skills Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 rounded-full text-xs font-medium">
                      React
                    </span>
                    <span className="px-3 py-1 bg-blue-500/10 border border-blue-500/30 text-blue-400 rounded-full text-xs font-medium">
                      Node.js
                    </span>
                    <span className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 rounded-full text-xs font-medium">
                      JavaScript
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={() => reviewRequest("rejected", request._id)}
                      disabled={processingId === request._id}
                      className="flex-1 px-6 py-3 bg-gray-800 hover:bg-gray-700 border border-gray-700 hover:border-red-500/50 text-gray-300 hover:text-red-400 rounded-xl font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                    >
                      {processingId === request._id ? (
                        <>
                          <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          <span>Processing...</span>
                        </>
                      ) : (
                        <>
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                          <span>Reject</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => reviewRequest("accepted", request._id)}
                      disabled={processingId === request._id}
                      className="flex-1 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg shadow-cyan-500/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
                    >
                      {processingId === request._id ? (
                        <>
                          <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          <span>Processing...</span>
                        </>
                      ) : (
                        <>
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span>Accept</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Requests;
