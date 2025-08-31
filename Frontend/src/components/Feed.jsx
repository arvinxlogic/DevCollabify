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
  const fetchingRef = useRef(false); // Prevent duplicate calls

  const getFeed = async () => {
    // Prevent duplicate calls and ensure user exists
    if (feed || !user || fetchingRef.current) return;
    
    fetchingRef.current = true;
    
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res?.data?.data));
    } catch (err) {
      // Only log significant errors, ignore auth errors in development
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

  // Show loading if user exists but no feed yet
  if (user && !feed) return <div className="flex justify-center my-10">Loading...</div>;

  // Don't show anything if no user (let Body.jsx handle redirect)
  if (!user) return null;

  if (feed && feed.length <= 0)
    return <h1 className="flex justify-center my-10">No new users found!</h1>;

  return (
    feed && (
      <div className="flex justify-center my-10">
        <UserCard user={feed[0]} />
      </div>
    )
  );
};

export default Feed;