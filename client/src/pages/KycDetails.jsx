import React from "react";
import { GET_KYC } from "../graphql/kyc/kycQueries";
import { useQuery } from "@apollo/client";
import { useState } from "react";
import AddKycDetailsModal from "../components/AddKycDetailsModal";

const KycDetails = () => {

  const {data,loading,error}=useQuery(GET_KYC);
  const [isAddKycModalOpen, setIsAddKycModalOpen] = useState(false);

  const handleEdit = (id) => {
    console.log("Edit KYC with id:", id);
    // Navigate to edit page or open a modal
  };

  const handleDelete = (id) => {
    console.log("Delete KYC with id:", id);
    // Call API to delete KYC
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">All KYC Details</h1>
      <div className="bg-white p-4 rounded shadow-md">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">Aadhaar Number</th>
              <th className="px-4 py-2">PAN Number</th>
              <th className="px-4 py-2">KYC Status</th>
              <th className="px-4 py-2">Created At</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data && data.myKyc && data.myKyc.length==1 ? data.myKyc.map((kyc) => (
              <tr key={kyc.id} className="border-t">
                <td className="px-4 py-2">{kyc.aadhaarNumber}</td>
                <td className="px-4 py-2">{kyc.panNumber}</td>
                <td className="px-4 py-2">{kyc.kycStatus}</td>
                <td className="px-4 py-2">
                  {new Date(kyc.createdAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleEdit(kyc.id)}
                    className="bg-blue-500 text-white p-2 rounded mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(kyc.id)}
                    className="bg-red-500 text-white p-2 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            )):(
              <button
              onClick={() => setIsAddKycModalOpen(true)}
              className="bg-green-500 text-white p-2 rounded mt-4 ml-4 hover:cursor-pointer "
            >
              Add Kyc Details
            </button>
            )
          }
          </tbody>
        </table>
        <AddKycDetailsModal
        isOpen={isAddKycModalOpen}
        onClose={() => setIsAddKycModalOpen(false)}
      />
      </div>
    </div>
  );
};

export default KycDetails;