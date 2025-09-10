import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";
import { Link } from "react-router-dom";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();
  
  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res.data.data));
    } catch (err) {
      // Handle Error Case
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return;

  if (connections.length === 0) return (
    <div className="min-h-screen bg-gray-900 flex justify-center items-center">
      <h1 className="text-white text-2xl">No Connections Found</h1>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900 py-10">
      <h1 className="text-center text-white text-3xl font-bold mb-8">Connections</h1>
      <div className="max-w-4xl mx-auto">
        {connections.map((connection) => {
          const { _id, firstName, lastName, photoUrl, age, gender, about } = connection;
          return (
            <div
              key={_id}
              className="flex m-4 p-6 rounded-lg bg-black border border-gray-800 shadow-xl"
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
             <Link to={'/chat/'+_id}>
             <button className="self-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded">Chat</button>
             </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Connections;
