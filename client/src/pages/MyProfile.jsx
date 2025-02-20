import { useQuery } from "@apollo/client";
import React, { useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { GET_MY_PROFILE } from "../graphql/users/userQueries";
import { useState } from "react";
import AddBusinessModal from "../components/AddBusinessModal";
import AddKycDetailsModal from "../components/AddKycDetailsModal";
import AddDocumentModal from "../components/AddDocumentModal";

const MyProfile = () => {
  console.log("inside my profile");
const [isAddModalOpen, setIsAddModalOpen] = useState(false);
const [isDocumentModalOpen,setIsDocumentModalOpen]=useState(false);

  const { data, loading, error } = useQuery(GET_MY_PROFILE, {
    fetchPolicy: 'cache-first'
  });
  console.log(data)
  const navigate = useNavigate();

  useEffect(() => {
    console.log("inside useeffect")
    if (!data) {
      navigate("/signin");
    }
  }, [data, navigate]);

  return (
    <>
    {data && data.user &&
    <div className="p-4">
      <div className="bg-white p-4 rounded shadow-md">
        <p>Name: {data.user.name}</p>
        <p>Email: {data.user.email}</p>
        <p>Phone: {data.user.phone}</p>
        <p>Address:{data.user.address??"Not on profile"}</p>
        <button
          onClick={() => navigate("/editProfile")}
          className="bg-blue-500 text-white p-2 rounded mt-4 hover:cursor-pointer"
        >
          Edit Profile
        </button>
        {data && data.user && (
          <button
            onClick={() => navigate("/businessDetails")}
            className="bg-blue-500 text-white p-2 rounded mt-4 ml-4 hover:cursor-pointer"
          >
             View Business Details
          </button>
        )}
                  <button
            onClick={() => navigate("/kycDetails")}
            className="bg-blue-500 text-white p-2 rounded mt-4 ml-4 hover:cursor-pointer"
          >
             View Kyc 
          </button>
          <button
            onClick={() => navigate("/documentDetails")}
            className="bg-blue-500 text-white p-2 rounded mt-4 ml-4 hover:cursor-pointer"
          >
            View documents
          </button>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-green-500 text-white p-2 rounded mt-4 ml-4 hover:cursor-pointer"
          >
            Add more businesses
          </button>
          <button
            onClick={() => setIsDocumentModalOpen(true)}
            className="bg-green-500 text-white p-2 rounded mt-4 ml-4 hover:cursor-pointer"
          >
            Add documents

          </button>
      <AddBusinessModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
      <AddDocumentModal
        isOpen={isDocumentModalOpen}
        onClose={() => setIsDocumentModalOpen(false)}
      />

      </div>
    </div>
}
    </>
  );
};

export default MyProfile;