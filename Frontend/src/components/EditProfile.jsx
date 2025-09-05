import { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [age, setAge] = useState(user.age || "");
  const [gender, setGender] = useState(user.gender || "");
  const [about, setAbout] = useState(user.about || "");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const [showToast, setShowToast] = useState(false);

  const saveProfile = async () => {
    setError("");
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        { firstName, lastName, photoUrl, age, gender, about },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 py-10">
      <div className="flex justify-center">
        <div className="flex justify-center mx-10 gap-8">
          <div className="card bg-black border border-gray-800 w-96 shadow-2xl">
            <div className="card-body">
              <h2 className="card-title justify-center text-white text-2xl mb-4">Edit Profile</h2>
              <div>
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text text-gray-300">First Name</span>
                  </div>
                  <input
                    type="text"
                    value={firstName}
                    className="input input-bordered bg-gray-800 border-gray-700 text-white w-full max-w-xs focus:border-gray-500"
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </label>
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text text-gray-300">Last Name</span>
                  </div>
                  <input
                    type="text"
                    value={lastName}
                    className="input input-bordered bg-gray-800 border-gray-700 text-white w-full max-w-xs focus:border-gray-500"
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </label>
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text text-gray-300">Photo URL</span>
                  </div>
                  <input
                    type="text"
                    value={photoUrl}
                    className="input input-bordered bg-gray-800 border-gray-700 text-white w-full max-w-xs focus:border-gray-500"
                    onChange={(e) => setPhotoUrl(e.target.value)}
                  />
                </label>
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text text-gray-300">Age</span>
                  </div>
                  <input
                    type="text"
                    value={age}
                    className="input input-bordered bg-gray-800 border-gray-700 text-white w-full max-w-xs focus:border-gray-500"
                    onChange={(e) => setAge(e.target.value)}
                  />
                </label>
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text text-gray-300">Gender</span>
                  </div>
                  <input
                    type="text"
                    value={gender}
                    className="input input-bordered bg-gray-800 border-gray-700 text-white w-full max-w-xs focus:border-gray-500"
                    onChange={(e) => setGender(e.target.value)}
                  />
                </label>
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text text-gray-300">About</span>
                  </div>
                  <input
                    type="text"
                    value={about}
                    className="input input-bordered bg-gray-800 border-gray-700 text-white w-full max-w-xs focus:border-gray-500"
                    onChange={(e) => setAbout(e.target.value)}
                  />
                </label>
              </div>
              <p className="text-red-400">{error}</p>
              <div className="card-actions justify-center m-2">
                <button className="btn bg-white text-black hover:bg-gray-200 border-none w-full" onClick={saveProfile}>
                  Save Profile
                </button>
              </div>
            </div>
          </div>
          <UserCard
            user={{ firstName, lastName, photoUrl, age, gender, about }}
          />
        </div>
      </div>
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert bg-green-600 text-white border-green-500">
            <span>Profile saved successfully.</span>
          </div>
        </div>
      )}
    </div>
  );
};
export default EditProfile;