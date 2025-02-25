import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/slices/authSlice";
import { useNavigate } from "react-router-dom";
import {useApolloClient} from '@apollo/client'
import { useQuery } from "@apollo/client";
import { GET_MY_PROFILE } from "../graphql/users/userQueries";

const Taskbar = () => {

  const {user}=useSelector((state)=>state.auth)

  console.log(user)

  const client = useApolloClient();

  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleLogout = async() => {
    dispatch(logout()); // Clear auth and users state
    localStorage.removeItem('userPermissions');
    await client.clearStore();
    
    navigate("/signin"); // Redirect to the sign-in page
  };

  return (
    <div className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <div className="flex space-x-4">
        <button
          onClick={() => navigate("/profile")}
          className="hover:bg-gray-700 px-4 py-2 rounded s"
        >
          {user?"My Profile":"Home"}
        </button>
      </div>
      <div className="flex items-center space-x-4">
        <span>Welcome {user && user?.name}</span>
        {user && <>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
        >
          Logout
        </button>
        </>
}
      </div>
    </div>
  );
};

export default Taskbar;