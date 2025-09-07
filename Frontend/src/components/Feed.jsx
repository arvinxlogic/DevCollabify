import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { useEffect, useRef } from "react";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const fetchingRef = useRef(false);

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

  if (user && !feed) return (
    <div className="min-h-screen bg-gray-900 flex justify-center items-center">
      <div className="text-center">
        <div className="loading loading-spinner loading-lg text-blue-500 mb-4"></div>
        <div className="text-white text-xl mb-2">Finding great developers...</div>
        <div className="text-gray-400 text-sm">This might take a moment</div>
      </div>
    </div>
  );

  if (!user) return null;

  if (feed && feed.length <= 0)
    return (
      <div className="min-h-screen bg-gray-900 flex justify-center items-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="text-6xl mb-4">🔍</div>
          <h1 className="text-white text-2xl mb-3 font-semibold">No new developers found</h1>
          <p className="text-gray-400 text-sm mb-6">
            We've shown you all available profiles. Check back later for new members!
          </p>
          <button 
            onClick={() => window.location.reload()} 
            className="btn bg-blue-600 hover:bg-blue-700 text-white border-none"
          >
            Refresh Feed
          </button>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-900">
      {feed && (
        <div className="flex justify-center py-10 px-4">
          <div className="w-full max-w-md">
            {/* Feed counter */}
            <div className="text-center mb-6">
              <div className="badge badge-neutral text-xs">
                {feed.length} profile{feed.length !== 1 ? 's' : ''} remaining
              </div>
            </div>
            
            <UserCard user={feed[0]} />
            
            {/* Tips section */}
            {/* <div className="mt-8 bg-gray-800 border border-gray-700 rounded-lg p-4">
              <h3 className="text-white font-semibold mb-2 text-sm">💡 Pro Tips</h3>
              <ul className="text-gray-400 text-xs space-y-1">
                <li>• Review profiles carefully before connecting</li>
                <li>• Look for common interests and skills</li>
                <li>• Personalize your connection approach</li>
              </ul>
            </div> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default Feed;