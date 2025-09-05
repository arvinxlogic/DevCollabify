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
      <div className="text-white text-xl">Loading...</div>
    </div>
  );

  if (!user) return null;

  if (feed && feed.length <= 0)
    return (
      <div className="min-h-screen bg-gray-900 flex justify-center items-center">
        <h1 className="text-white text-2xl">No new users found!</h1>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-900">
      {feed && (
        <div className="flex justify-center py-10">
          <UserCard user={feed[0]} />
        </div>
      )}
    </div>
  );
};

export default Feed;