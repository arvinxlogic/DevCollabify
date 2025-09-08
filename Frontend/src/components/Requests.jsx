import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestSlice";
import { useEffect } from "react";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();
  
  const reviewRequest = async (status, _id) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      
      // ✅ Remove request from local state immediately
      dispatch(removeRequest(_id));
      
      // ✅ Optional: Show success message
      console.log("Request " + status + " successfully");
      
    } catch (err) {
      console.error("Error reviewing request:", err);
      // ✅ Refresh requests if there's an error to sync state
      fetchRequests();
    }
  };
  
  const fetchRequests = async () => {
    try {
      // ✅ Fixed API endpoint to match backend route
      const res = await axios.get(BASE_URL + "/request/received", {
        withCredentials: true,
      });
      dispatch(addRequests(res.data.data));
    } catch (err) {
      console.error("Error fetching requests:", err);
    }
  };

  useEffect(() => {
    fetchRequests();
    
    // ✅ Optional: Add polling for real-time updates (every 30 seconds)
    const interval = setInterval(fetchRequests, 30000);
    
    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  if (!requests) return (
    <div className="min-h-screen bg-gray-900 flex justify-center items-center">
      <h1 className="text-white text-2xl">Loading requests...</h1>
    </div>
  );

  if (requests.length === 0)
    return (
      <div className="min-h-screen bg-gray-900 flex justify-center items-center">
        <div className="text-center">
          <h1 className="text-white text-2xl mb-4">No Connection Requests</h1>
          <button 
            onClick={fetchRequests}
            className="btn bg-white text-black hover:bg-gray-200"
          >
            Refresh
          </button>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-900 py-10">
      <div className="flex justify-between items-center max-w-4xl mx-auto mb-8">
        <h1 className="text-center text-white text-3xl font-bold">Connection Requests ({requests.length})</h1>
        <button 
          onClick={fetchRequests}
          className="btn btn-sm bg-gray-800 text-white border-gray-700 hover:bg-gray-700"
        >
          Refresh
        </button>
      </div>
      <div className="max-w-4xl mx-auto">
        {requests.map((request) => {
          const { _id, firstName, lastName, photoUrl, age, gender, about } = request.fromUserId;
          return (
            <div
              key={request._id} // ✅ Use request._id instead of user._id
              className="flex justify-between items-center m-4 p-6 rounded-lg bg-black border border-gray-800 shadow-xl"
            >
              <div>
                <img
                  alt="photo"
                  className="w-20 h-20 rounded-full object-cover ring-2 ring-gray-700"
                  src={photoUrl}
                />
              </div>
              <div className="text-left mx-4 flex-1">
                <h2 className="font-bold text-xl text-white">
                  {firstName + " " + lastName}
                </h2>
                {age && gender && <p className="text-gray-400">{age + ", " + gender}</p>}
                <p className="text-gray-300 mt-2">{about}</p>
              </div>
              <div className="flex gap-3">
                <button
                  className="btn bg-gray-800 text-white border-gray-700 hover:bg-gray-700"
                  onClick={() => reviewRequest("rejected", request._id)}
                >
                  Reject
                </button>
                <button
                  className="btn bg-white text-black hover:bg-gray-200 border-none"
                  onClick={() => reviewRequest("accepted", request._id)}
                >
                  Accept
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Requests;