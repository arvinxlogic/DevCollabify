// src/components/UserCard.jsx - Updated version
import { useState } from "react";

const UserCard = ({ user, isPreview = false, onSwipe }) => {
  const { _id, firstName, lastName, photoUrl, age, gender, about } = user;
  const [imageError, setImageError] = useState(false);

  // If it's a preview card (next in stack), don't show buttons
  if (isPreview) {
    return (
      <div className="w-full max-w-md mx-auto pointer-events-none">
        <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl overflow-hidden border border-cyan-500/20">
          <div className="relative h-[500px] overflow-hidden bg-gradient-to-b from-gray-800 to-gray-900">
            <img
              src={imageError ? `https://ui-avatars.com/api/?name=${firstName}+${lastName}&size=400&background=0891b2&color=fff&bold=true` : photoUrl}
              alt={`${firstName} ${lastName}`}
              className="w-full h-full object-cover"
              onError={(e) => {
                setImageError(true);
                e.target.src = `https://ui-avatars.com/api/?name=${firstName}+${lastName}&size=400&background=0891b2&color=fff&bold=true`;
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h2 className="text-3xl font-bold text-white mb-1">
                {firstName} {lastName}
              </h2>
              {age && gender && (
                <p className="text-cyan-400 text-sm">{age} • {gender}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto select-none">
      <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl overflow-hidden border border-cyan-500/20 shadow-2xl shadow-cyan-500/10">
        {/* Image Section */}
        <div className="relative h-[500px] overflow-hidden bg-gradient-to-b from-gray-800 to-gray-900">
          <img
            src={imageError ? `https://ui-avatars.com/api/?name=${firstName}+${lastName}&size=400&background=0891b2&color=fff&bold=true` : photoUrl}
            alt={`${firstName} ${lastName}`}
            className="w-full h-full object-cover"
            onError={(e) => {
              setImageError(true);
              e.target.src = `https://ui-avatars.com/api/?name=${firstName}+${lastName}&size=400&background=0891b2&color=fff&bold=true`;
            }}
          />
          
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
          
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <h2 className="text-3xl font-bold text-white mb-1">
              {firstName} {lastName}
            </h2>
            {age && gender && (
              <div className="flex items-center space-x-2 text-cyan-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span className="text-sm font-medium">{age} • {gender}</span>
              </div>
            )}
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6 space-y-4">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-lg font-semibold text-white">About</h3>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              {about || "No description available"}
            </p>
          </div>

          <div>
            <div className="flex items-center space-x-2 mb-3">
              <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
              <h3 className="text-lg font-semibold text-white">Skills</h3>
            </div>
            <div className="flex flex-wrap gap-2">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
