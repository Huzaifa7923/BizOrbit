import React from "react";
import { useQuery } from "@apollo/client";
import { GET_ALL_USERS } from "../graphql/users/userQueries";
// import Loading from "../components/Loading";
// import Error from "../components/Error";
import {useNavigate} from 'react-router-dom'
import { useDispatch } from "react-redux";

const UsersList = () => {
  const { loading, error, data } = useQuery(GET_ALL_USERS);

  const dispatch=useDispatch();

  const navigate=useNavigate();
  

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">All Users</h1>
      <div className="bg-white p-4 rounded shadow-md">
        {data?.users.map((user) => (
          <div key={user.id} className="mb-4">
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            <p>Phone: {user.phone}</p>
            <button
              onClick={() => navigate(`/editUser/${user.id}`)}
              className="bg-blue-500 text-white p-2 rounded mt-2"
            >
              Edit User
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsersList;