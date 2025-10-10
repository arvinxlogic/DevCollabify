// src/components/Feed.jsx - FIXED VERSION
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { useEffect, useRef, useState } from "react";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const fetchingRef = useRef(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);

  const getFeed = async () => {
    if (feed || !user || fetchingRef.current) return;

    fetchingRef.current = true;
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res?.data?.data));
    } catch (err) {
      if (err.response?.status !== 401) {
        console.log("Feed fetch failed:", err.response?.status);
      }
    } finally {
      fetchingRef.current = false;
    }
  };

  useEffect(() => {
    if (user) {
      getFeed();
    }
  }, [user]);

  const handleSwipe = async (direction) => {
    if (currentIndex >= feed.length) return;

    const currentUser = feed[currentIndex];
    const status = direction === "right" ? "interested" : "ignored";

    // Animate card away
    setDragPosition({
      x: direction === "right" ? 1000 : -1000,
      y: 0,
    });

    // Send request to backend
    try {
      await axios.post(
        BASE_URL + "/request/send/" + status + "/" + currentUser._id,
        {},
        { withCredentials: true }
      );
    } catch (err) {
      console.error("Request failed:", err);
    }

    // Move to next card after animation
    setTimeout(() => {
      setCurrentIndex((prev) => prev + 1);
      setDragPosition({ x: 0, y: 0 });
    }, 300);
  };

  // Mouse/Touch handlers
  const handleDragStart = (e) => {
    setIsDragging(true);
    const clientX = e.type === "mousedown" ? e.clientX : e.touches[0].clientX;
    const clientY = e.type === "mousedown" ? e.clientY : e.touches[0].clientY;
    setStartPosition({ x: clientX, y: clientY });
  };

  const handleDragMove = (e) => {
    if (!isDragging) return;
    const clientX = e.type === "mousemove" ? e.clientX : e.touches[0].clientX;
    const clientY = e.type === "mousemove" ? e.clientY : e.touches[0].clientY;
    const deltaX = clientX - startPosition.x;
    const deltaY = clientY - startPosition.y;
    setDragPosition({ x: deltaX, y: deltaY });
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);

    // If dragged more than 150px, trigger swipe
    if (Math.abs(dragPosition.x) > 150) {
      handleSwipe(dragPosition.x > 0 ? "right" : "left");
    } else {
      // Reset position
      setDragPosition({ x: 0, y: 0 });
    }
  };

  // Loading State
  if (user && !feed)
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="relative inline-block">
            <div className="w-20 h-20 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <span className="text-3xl">👨🏻‍💻</span>
            </div>
          </div>
          <p className="mt-6 text-xl font-semibold text-white">Loading Feed...</p>
          <p className="mt-2 text-sm text-gray-400">Finding awesome developers for you</p>
        </div>
      </div>
    );

  // Empty Feed State
  if (!feed || feed.length === 0 || currentIndex >= feed.length)
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="mb-8 relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl animate-pulse"></div>
            </div>
            <div className="relative text-8xl mb-4 animate-bounce">🎯</div>
          </div>
          
          <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-4">
            You're All Caught Up!
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed mb-8">
            We've shown you all available profiles. Check back later for new members!
          </p>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-gray-900/50 backdrop-blur-xl border border-cyan-500/20 rounded-xl p-4">
              <p className="text-cyan-400 text-2xl font-bold">100%</p>
              <p className="text-gray-400 text-sm">Profiles Viewed</p>
            </div>
            <div className="bg-gray-900/50 backdrop-blur-xl border border-blue-500/20 rounded-xl p-4">
              <p className="text-blue-400 text-2xl font-bold">✓</p>
              <p className="text-gray-400 text-sm">All Done</p>
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => window.location.reload()}
              className="w-full py-3 px-6 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg shadow-cyan-500/50"
            >
              Refresh Feed
            </button>
            <button
              onClick={() => (window.location.href = "/connections")}
              className="w-full py-3 px-6 bg-gray-800 hover:bg-gray-700 border border-gray-700 hover:border-cyan-500/50 text-gray-300 hover:text-white font-semibold rounded-xl transition-all duration-200"
            >
              View Connections
            </button>
          </div>
        </div>
      </div>
    );

  const currentUser = feed[currentIndex];
  const rotation = dragPosition.x / 20;
  const opacity = 1 - Math.abs(dragPosition.x) / 500;

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black py-8 px-4 flex flex-col">
      {/* Header */}
      <div className="max-w-lg mx-auto mb-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2">
            Discover Developers
          </h1>
          <div className="flex items-center justify-center space-x-4 mt-4">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-400">
                <span className="text-cyan-400 font-semibold">{feed.length - currentIndex}</span> remaining
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Swipeable Card Stack Container - FIXED HEIGHT */}
      <div className="max-w-lg mx-auto w-full mb-6">
        <div className="relative" style={{ height: '600px' }}>
          {/* Next Card Preview (Behind) */}
          {currentIndex + 1 < feed.length && (
            <div className="absolute inset-0 flex items-center justify-center" style={{ zIndex: 1 }}>
              <div className="w-full max-w-md transform scale-95 opacity-50">
                <UserCard user={feed[currentIndex + 1]} isPreview={true} />
              </div>
            </div>
          )}

          {/* Current Card */}
          <div
            ref={cardRef}
            className="absolute inset-0 flex items-center justify-center cursor-grab active:cursor-grabbing"
            style={{
              transform: `translateX(${dragPosition.x}px) translateY(${dragPosition.y}px) rotate(${rotation}deg)`,
              opacity: opacity,
              transition: isDragging ? "none" : "all 0.3s ease-out",
              zIndex: 10,
            }}
            onMouseDown={handleDragStart}
            onMouseMove={handleDragMove}
            onMouseUp={handleDragEnd}
            onMouseLeave={handleDragEnd}
            onTouchStart={handleDragStart}
            onTouchMove={handleDragMove}
            onTouchEnd={handleDragEnd}
          >
            {/* Professional Swipe Indicators */}
            {dragPosition.x > 50 && (
              <div className="absolute top-8 right-8 z-20 bg-gradient-to-r from-cyan-500 to-blue-600 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-bold text-lg transform rotate-12 shadow-2xl border border-cyan-400/50 flex items-center space-x-2">
                <span>CONNECT</span>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            )}
            {dragPosition.x < -50 && (
              <div className="absolute top-8 left-8 z-20 bg-gradient-to-r from-gray-700 to-gray-800 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-bold text-lg transform -rotate-12 shadow-2xl border border-gray-600/50 flex items-center space-x-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span>PASS</span>
              </div>
            )}

            <div className="w-full max-w-md">
              <UserCard user={currentUser} onSwipe={handleSwipe} />
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons - MOVED BELOW CARDS WITH PROPER Z-INDEX */}
      <div className="max-w-lg mx-auto w-full" style={{ zIndex: 20, position: 'relative' }}>
        <div className="flex justify-center items-center space-x-6">
          {/* Pass Button */}
          <button
            onClick={() => handleSwipe("left")}
            className="group px-8 py-4 bg-gradient-to-br from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-white rounded-xl shadow-xl hover:shadow-2xl border border-gray-600 flex items-center space-x-3 transform hover:scale-105 transition-all duration-200 font-semibold"
          >
            <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>PASS</span>
          </button>

          {/* Connect Button */}
          <button
            onClick={() => handleSwipe("right")}
            className="group px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white rounded-xl shadow-xl shadow-cyan-500/50 hover:shadow-2xl hover:shadow-cyan-500/60 flex items-center space-x-3 transform hover:scale-105 transition-all duration-200 font-semibold"
          >
            <span>CONNECT</span>
            <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>

        {/* Helper Text */}
        <p className="text-center text-gray-500 text-sm mt-6">
          ← Swipe or click to Pass • Swipe or click to Connect →
        </p>
      </div>
    </div>
  );
};

export default Feed;
