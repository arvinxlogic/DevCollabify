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
      dispatch(removeRequest(_id));
    } catch (err) {}
  };
  
  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      dispatch(addRequests(res.data.data));
    } catch (err) {}
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return;

  if (requests.length === 0)
    return (
      <div className="min-h-screen bg-gray-900 flex justify-center items-center">
        <h1 className="text-white text-2xl">No Requests Found</h1>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-900 py-10">
      <h1 className="text-center text-white text-3xl font-bold mb-8">Connection Requests</h1>
      <div className="max-w-4xl mx-auto">
        {requests.map((request) => {
          const { _id, firstName, lastName, photoUrl, age, gender, about } = request.fromUserId;
          return (
            <div
              key={_id}
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