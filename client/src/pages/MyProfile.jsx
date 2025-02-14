import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const MyProfile = () => {
  console.log("inside my profile");
  const { user } = useSelector((state) => state.auth);
  console.log(user)


  const navigate = useNavigate();

  useEffect(() => {
    console.log("inside useeffect")
    if (!user) {
      navigate("/signin");
    }
  }, [user, navigate]);

  return (
    <>
    <div className="p-4">
      <div className="bg-white p-4 rounded shadow-md">
        <p>Name: {user.name}</p>
        <p>Email: {user.email}</p>
        <p>Phone: {user.phone}</p>
        <p>Address:{user.address??"Not on profile"}</p>
        <button
          onClick={() => navigate("/editProfile")}
          className="bg-blue-500 text-white p-2 rounded mt-4"
        >
          Edit Profile
        </button>
        {user.isAdmin && (
          <button
            onClick={() => navigate("/users")}
            className="bg-green-500 text-white p-2 rounded mt-4 ml-4"
          >
            View All Users
          </button>
        )}
      </div>
    </div>
    </>
  );
};

export default MyProfile;