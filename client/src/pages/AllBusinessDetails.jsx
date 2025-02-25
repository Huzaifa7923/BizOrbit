import { useQuery } from "@apollo/client";
import React, { useState } from "react";
import { GET_ALL_BUSINESS, GET_BUSINESS } from "../graphql/business/businessQueries";
import EditBusinessModal from "../components/EditBusinessModal";
import AddBusinessModal from "../components/AddBusinessModal";
import { useMutation, useLazyQuery } from '@apollo/client';
import { useEffect } from "react";


const AllBusinessDetails = () => {
    const [selectedBusiness, setSelectedBusiness] = useState(null);
    
    const { data, loading, error } = useQuery(GET_ALL_BUSINESS, {
      fetchPolicy: 'cache-first'
    });
    const [permissions,setPermissions]=useState([]);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    const handleEdit = (business) => {
      setSelectedBusiness(business);
    };

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


    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
  
    return (
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl">All Businesses</h1>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Add New Business
          </button>
        </div>
        <div className="bg-white p-4 rounded shadow-md">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="px-4 py-2">Business Name</th>
                <th className="px-4 py-2">GST Number</th>
                <th className="px-4 py-2">PAN Number</th>
                <th className="px-4 py-2">Address</th>
                <th className="px-4 py-2">Pin Code</th>
                <th className="px-4 py-2">Created At</th>
                <th className="px-4 py-2">Updated At</th>
                <th className="px-4 py-2">Actions</th>
                <th className="px-4 py-2">By</th>
              </tr>
            </thead>
            <tbody>
              {data?.businesses.map((business) => (
                <tr key={business.gst_number} className="border-t">
                  <td className="px-4 py-2">{business.business_name}</td>
                  <td className="px-4 py-2">{business.gst_number}</td>
                  <td className="px-4 py-2">{business.pan_number}</td>
                  <td className="px-4 py-2">{business.address}</td>
                  <td className="px-4 py-2">{business.pin_code}</td>

                  <td className="px-4 py-2">
                    {new Date(business.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2">
                    {new Date(business.updated_at).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2">
                    {hasPermission('business','update')&&<button
                      onClick={() => handleEdit(business)}
                      className="bg-blue-500 text-white p-2 rounded mr-2"
                    >
                      Edit
                    </button>
                    }
                  </td>
                  <td className="px-4 py-2">{business.user.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
  
        {selectedBusiness && (
          <EditBusinessModal
            business={selectedBusiness}
            isOpen={!!selectedBusiness}
            onClose={() => setSelectedBusiness(null)}
          />
        )}
              <AddBusinessModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
              />
  
      </div>
    );
}

export default AllBusinessDetails