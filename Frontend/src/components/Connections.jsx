// src/components/Connections.jsx
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";
import { Link } from "react-router-dom";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res.data.data));
    } catch (err) {
      console.error("Failed to fetch connections:", err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return null;

  const filteredConnections = connections.filter((connection) => {
    const fullName = `${connection.firstName} ${connection.lastName}`.toLowerCase();
    return fullName.includes(searchQuery.toLowerCase());
  });

  // Empty State
  if (connections.length === 0)
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="mb-8 relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-32 h-32 bg-blue-500/10 rounded-full blur-2xl animate-pulse"></div>
            </div>
            <div className="relative text-8xl mb-4 animate-bounce">🤝</div>
          </div>

          <h2 className="text-3xl font-bold text-slate-200 mb-4">
            No Connections Yet
          </h2>
          <p className="text-slate-400 text-lg leading-relaxed mb-8">
            Start swiping on the feed to connect with amazing developers!
          </p>

          <Link
            to="/"
            className="inline-block px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            Discover Developers
          </Link>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 py-8 px-4">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h1 className="text-4xl font-bold text-slate-200 mb-2">
              My Connections
            </h1>
            <p className="text-slate-400">
              You have <span className="text-blue-400 font-semibold">{connections.length}</span> connection{connections.length !== 1 ? 's' : ''}
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-80">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search connections..."
              className="w-full pl-12 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
            />
          </div>
        </div>
      </div>

      {/* Connections Grid */}
      <div className="max-w-6xl mx-auto">
        {filteredConnections.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-slate-400 text-lg">No connections found matching "{searchQuery}"</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredConnections.map((connection) => (
              <div
                key={connection._id}
                className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl overflow-hidden border border-slate-700 shadow-xl hover:shadow-blue-500/10 transition-all duration-300 hover:scale-105 group"
              >
                {/* Card Image */}
                <div className="relative h-48 overflow-hidden bg-gradient-to-b from-slate-800 to-slate-900">
                  <img
                    src={connection.photoUrl || `https://ui-avatars.com/api/?name=${connection.firstName}+${connection.lastName}&size=400&background=334155&color=fff&bold=true`}
                    alt={`${connection.firstName} ${connection.lastName}`}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      e.target.src = `https://ui-avatars.com/api/?name=${connection.firstName}+${connection.lastName}&size=400&background=334155&color=fff&bold=true`;
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent"></div>
                  
                  {/* Online Status */}
                  <div className="absolute top-4 right-4 px-3 py-1 bg-teal-500/90 backdrop-blur-sm rounded-full flex items-center space-x-1">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <span className="text-white text-xs font-semibold">Online</span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-1">
                    {connection.firstName} {connection.lastName}
                  </h3>

                  {connection.age && connection.gender && (
                    <div className="flex items-center space-x-2 text-slate-400 mb-4">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <span className="text-sm">{connection.age} • {connection.gender}</span>
                    </div>
                  )}

                  {connection.about && (
                    <p className="text-slate-400 text-sm line-clamp-2 mb-4">
                      {connection.about}
                    </p>
                  )}

                  {/* Buttons */}
                  <div className="flex gap-3">
                    <Link
                      to={`/chat/${connection._id}`}
                      className="flex-1 py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                      <span>Chat</span>
                    </Link>

                    <button className="p-3 bg-slate-700 hover:bg-slate-600 border border-slate-600 text-slate-300 hover:text-blue-400 rounded-xl transition-all duration-200">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Connections;
