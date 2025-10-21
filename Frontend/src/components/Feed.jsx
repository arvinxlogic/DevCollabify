// src/components/Feed.jsx - PROFESSIONAL REDESIGN
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
  const [isAnimating, setIsAnimating] = useState(false);
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
    if (currentIndex >= feed.length || isAnimating) return;

    setIsAnimating(true);
    const currentUser = feed[currentIndex];
    const status = direction === "right" ? "interested" : "ignored";

    // Animate card away - NO BOUNCE BACK
    setDragPosition({
      x: direction === "right" ? 1500 : -1500,
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

    // Move to next card - card completely disappears before next one shows
    setTimeout(() => {
      setCurrentIndex((prev) => prev + 1);
      setDragPosition({ x: 0, y: 0 });
      setIsAnimating(false);
    }, 400);
  };

  const handleDragStart = (e) => {
    if (isAnimating) return;
    setIsDragging(true);
    const clientX = e.type === "mousedown" ? e.clientX : e.touches[0].clientX;
    const clientY = e.type === "mousedown" ? e.clientY : e.touches[0].clientY;
    setStartPosition({ x: clientX, y: clientY });
  };

  const handleDragMove = (e) => {
    if (!isDragging || isAnimating) return;
    const clientX = e.type === "mousemove" ? e.clientX : e.touches[0].clientX;
    const clientY = e.type === "mousemove" ? e.clientY : e.touches[0].clientY;
    const deltaX = clientX - startPosition.x;
    const deltaY = clientY - startPosition.y;
    setDragPosition({ x: deltaX, y: deltaY });
  };

  const handleDragEnd = () => {
    if (!isDragging || isAnimating) return;
    setIsDragging(false);

    if (Math.abs(dragPosition.x) > 150) {
      handleSwipe(dragPosition.x > 0 ? "right" : "left");
    } else {
      setDragPosition({ x: 0, y: 0 });
    }
  };

  // Loading State
  if (user && !feed)
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="relative inline-block">
            <div className="w-20 h-20 border-4 border-slate-700 border-t-blue-500 rounded-full animate-spin"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <span className="text-3xl">👨🏻‍💻</span>
            </div>
          </div>
          <p className="mt-6 text-xl font-semibold text-slate-200">Loading Feed...</p>
          <p className="mt-2 text-sm text-slate-400">Finding awesome developers for you</p>
        </div>
      </div>
    );

  // Empty Feed State
  if (!feed || feed.length === 0 || currentIndex >= feed.length)
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="mb-8 relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-32 h-32 bg-blue-500/10 rounded-full blur-2xl animate-pulse"></div>
            </div>
            <div className="relative text-8xl mb-4 animate-bounce">🎯</div>
          </div>
          
          <h2 className="text-3xl font-bold text-slate-200 mb-4">
            You're All Caught Up!
          </h2>
          <p className="text-slate-400 text-lg leading-relaxed mb-8">
            We've shown you all available profiles. Check back later for new members!
          </p>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700 rounded-xl p-4">
              <p className="text-blue-400 text-2xl font-bold">100%</p>
              <p className="text-slate-400 text-sm">Profiles Viewed</p>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700 rounded-xl p-4">
              <p className="text-teal-400 text-2xl font-bold">✓</p>
              <p className="text-slate-400 text-sm">All Done</p>
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => window.location.reload()}
              className="w-full py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              Refresh Feed
            </button>
            <button
              onClick={() => (window.location.href = "/connections")}
              className="w-full py-3 px-6 bg-slate-700 hover:bg-slate-600 border border-slate-600 text-slate-200 font-semibold rounded-xl transition-all duration-200"
            >
              View Connections
            </button>
          </div>
        </div>
      </div>
    );

  const currentUser = feed[currentIndex];
  const rotation = dragPosition.x / 20;
  const opacity = isAnimating ? 0 : 1 - Math.abs(dragPosition.x) / 500;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 py-8 px-4 flex flex-col">
      {/* Header */}
      <div className="max-w-lg mx-auto mb-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-slate-200 mb-2">
            Discover Developers
          </h1>
          <div className="flex items-center justify-center space-x-4 mt-4">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-teal-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-slate-400">
                <span className="text-blue-400 font-semibold">{feed.length - currentIndex}</span> remaining
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Swipeable Card Stack */}
      <div className="max-w-lg mx-auto w-full mb-6">
        <div className="relative" style={{ height: '600px' }}>
          {/* Next Card Preview */}
          {currentIndex + 1 < feed.length && !isAnimating && (
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
              transition: isDragging || !isAnimating ? "none" : "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
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
            {/* Swipe Indicators */}
            {dragPosition.x > 50 && (
              <div className="absolute top-8 right-8 z-20 bg-teal-600 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-bold text-lg transform rotate-12 shadow-2xl border border-teal-500 flex items-center space-x-2">
                <span>CONNECT</span>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            )}
            {dragPosition.x < -50 && (
              <div className="absolute top-8 left-8 z-20 bg-slate-600 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-bold text-lg transform -rotate-12 shadow-2xl border border-slate-500 flex items-center space-x-2">
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

      {/* Action Buttons */}
      <div className="max-w-lg mx-auto w-full" style={{ zIndex: 20, position: 'relative' }}>
        <div className="flex justify-center items-center space-x-6">
          <button
            onClick={() => handleSwipe("left")}
            disabled={isAnimating}
            className="group px-8 py-4 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded-xl shadow-xl border border-slate-600 flex items-center space-x-3 transform hover:scale-105 transition-all duration-200 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>PASS</span>
          </button>

          <button
            onClick={() => handleSwipe("right")}
            disabled={isAnimating}
            className="group px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-xl flex items-center space-x-3 transform hover:scale-105 transition-all duration-200 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span>CONNECT</span>
            <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>

        <p className="text-center text-slate-500 text-sm mt-6">
          ← Swipe or click to Pass • Swipe or click to Connect →
        </p>
      </div>
    </div>
  );
};

export default Feed;
