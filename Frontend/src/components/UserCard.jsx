// UserCard.jsx
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  const { _id, firstName, lastName, photoUrl, age, gender, about } = user;
  const dispatch = useDispatch();

  const handleSendRequest = async (status, userId) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(userId));
    } catch (err) {}
  };

  return (
    <div className="card bg-black border border-gray-800 w-96 shadow-2xl">
      <figure className="px-4 pt-4">
        <img src={user.photoUrl} alt="photo" className="rounded-xl w-full h-80 object-cover" />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-white text-xl">{firstName + " " + lastName}</h2>
        {age && gender && <p className="text-gray-400">{age + ", " + gender}</p>}
        <p className="text-gray-300">{about}</p>
        <div className="card-actions justify-center my-4 gap-4">
          <button
            className="btn bg-gray-800 text-white border-gray-700 hover:bg-gray-700 px-8"
            onClick={() => handleSendRequest("ignored", _id)}
          >
            Ignore
          </button>
          <button
            className="btn bg-white text-black hover:bg-gray-200 border-none px-8"
            onClick={() => handleSendRequest("interested", _id)}
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};
export default UserCard;