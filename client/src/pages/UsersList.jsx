import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_ALL_USERS } from "../graphql/users/userQueries";
// import Loading from "../components/Loading";
// import Error from "../components/Error";
import {useNavigate} from 'react-router-dom'
import { useDispatch } from "react-redux";
import { useState } from "react";

const UsersList = () => {
  const { loading, error, data } = useQuery(GET_ALL_USERS);

  const dispatch=useDispatch();
  const [permissions,setPermissions]=useState([]);
  const navigate=useNavigate();

  useEffect(()=>{
    const storedPermissions = localStorage.getItem('userPermissions');
    console.log("inside use Effect of myProfile ")
    if (storedPermissions) {
      setPermissions(JSON.parse(storedPermissions));
    }
  },[])


const hasPermission=(featureName,permissionType)=>{
    const feature=permissions.find(p=>p.feature.name==featureName)

    if(!feature) return false

    switch(permissionType){
      case 'update':
      return feature.canUpdate
    }
  }

  return (
    <>
    {/* id | email| password name phone address  isDeleted  created_at update_at roleId | */}



    <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl">All Users</h1>
        </div>
        <div className="bg-white p-4 rounded shadow-md">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="px-4 py-2">id</th>
                <th className="px-4 py-2">email</th>
                <th className="px-4 py-2">name</th>
                <th className="px-4 py-2">phone</th>
                <th className="px-4 py-2">Address</th>
                <th className="px-4 py-2">Role</th>
                <th className="px-4 py-2">Actions</th>
                <></>
              </tr>
            </thead>
            <tbody>
              {data?.users.map((user) => (
                <tr key={user.id} className="border-t">
                  <td className="px-4 py-2">{user.id??"Not added"}</td>
                  <td className="px-4 py-2">{user.email??"Not added"}</td>
                  <td className="px-4 py-2">{user.name??"Not added"}</td>
                  <td className="px-4 py-2">{user.phone??"Not added"}</td>
                  <td className="px-4 py-2">{user.address??"Not added"}</td>
                  <td className="px-4 py-2">{user.role.role}</td>

                  <td className="px-4 py-2">
                    {hasPermission('users','update')&&<button
                      onClick={() => navigate(`/editUser/${user.id}`)}
                      className="bg-blue-500 text-white p-2 rounded mr-2"
                    >
                      Edit
                    </button>
                    }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
</>

  );

};

export default UsersList;