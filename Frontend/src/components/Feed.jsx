import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { useEffect } from "react";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const user = useSelector((store) => store.user); // Add this
  const dispatch = useDispatch();

  const getFeed = async () => {
    if (feed || !user) return; // Only fetch if user exists
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res?.data?.data));
    } catch (err) {
      // Handle error silently or redirect to login
      console.log("Feed fetch failed:", err.response?.status);
    }
  };

  useEffect(() => {
    getFeed();
  }, [user]); // Add user dependency

  // Show login prompt if no user
  if (!user) {
    return <div>Please log in to see the feed</div>;
  }

  if (!feed) return <div>Loading...</div>;

  if (feed.length <= 0)
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
