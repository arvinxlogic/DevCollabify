import { Outlet, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useEffect, useRef } from "react";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user);
  const fetchingRef = useRef(false);

  const fetchUser = async () => {
    if (userData || fetchingRef.current) return;
    
    fetchingRef.current = true;
    
    try {
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(res.data));
    } catch (err) {
      if (err.response?.status === 401 || err.response?.status === 400) {
        if (location.pathname !== "/login") {
          navigate("/login");
        }
        return;
      }
      console.error("Fetch user error:", err);
    } finally {
      fetchingRef.current = false;
    }
  };

  useEffect(() => {
    if (location.pathname !== "/login") {
      fetchUser();
    }
  }, []);

  return (
    <div className="bg-gray-900 min-h-screen">
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Body;