import { useQuery } from "@apollo/client";
import React, { useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { GET_MY_PROFILE } from "../graphql/users/userQueries";
import { useState } from "react";
import AddBusinessModal from "../components/AddBusinessModal";
import AddKycDetailsModal from "../components/AddKycDetailsModal";
import AddDocumentModal from "../components/AddDocumentModal";
import { useSelector } from "react-redux";

const MyProfile = () => {
console.log("inside my profile");

const [isAddModalOpen, setIsAddModalOpen] = useState(false);
const [isDocumentModalOpen,setIsDocumentModalOpen]=useState(false);
const [permissions,setPermissions]=useState([]);

const {user}=useSelector((state)=>state.auth)

  const { data, loading, error } = useQuery(GET_MY_PROFILE, {
    fetchPolicy: 'cache-first'
  });
  // console.log(data)
  const navigate = useNavigate();

   useEffect(()=>{
    const storedPermissions = localStorage.getItem('userPermissions');
    console.log("inside use Effect of myProfile ")
    if (storedPermissions) {
      setPermissions(JSON.parse(storedPermissions));
    }
  },[])

  useEffect(() => {
    console.log("inside useeffect of myProfile2")
    if (!user) {
      console.log('No user data found, redirecting to signin');
      navigate('/signin');
    }
  }, [data, navigate]);

  const hasPermission=(featureName,permissionType)=>{
    const feature=permissions.find(p=>p.feature.name==featureName)

    if(!feature) return false

    switch(permissionType){
      case 'create':
      return feature.canCreate

      case 'read':
      return feature.canRead
    }
  }



  return (
    <>
      {loading ? (
        <div>Loading........</div>
      ) : (
        data && data.user && (
          <div className="p-4">
            <div className="bg-white p-4 rounded shadow-md">
              <div className="space-y-2">
                <p>Name: {data.user.name}</p>
                <p>Email: {data.user.email}</p>
                <p>Phone: {data.user.phone}</p>
                <p>Address:{data.user.address??"Not on profile"}</p>
              </div>

              <div className="mt-4">
                  <div className="mb-8">
                   <div className="flex space-x-4">
                  
                   <button
                  onClick={() => navigate("/editProfile")}
                  className="bg-green-500 text-white p-2 rounded mt-4 ml-4 hover:cursor-pointer"
                >
                  Edit Profile
                </button>
                  </div>
                </div>
              </div>


              <div className="mt-4">
                {
                  hasPermission('users','read') &&
                  <div className="mb-8">
                  <h2 className="text-xl font-semibold mb-4"> Users</h2>

                   <div className="flex space-x-4">
                    <button
                      onClick={() => navigate("/users")}
                      className="bg-purple-500 text-white p-2 rounded"
                    >
                      View All Users
                    </button>

                  </div>
                </div>
                }
              </div>

              <div className="mt-4">
                {
                  <div className="mb-8">
                  <h2 className="text-xl font-semibold mb-4">Business Details</h2>

                   <div className="flex space-x-4">
                   {hasPermission ('business','create')&& <button
                      onClick={() => setIsAddModalOpen(true)}
                      className="bg-green-500 text-white p-2 rounded"
                    >
                      Create Business
                    </button>
                    }
                    {/* View all business details to be implemented */}
                    {hasPermission ('business','read') &&<button
                      onClick={() => navigate("/allBusiness")}
                      className="bg-purple-500 text-white p-2 rounded"
                    >
                      View All Businesses
                    </button>
                    }
                    <button
                      onClick={()=>navigate("/myBusiness")}
                      className="bg-green-500 text-white p-2 rounded"
                    >
                      View My Businesses
                    </button>
                    
                  </div>
                </div>
                }
              </div>

              <div className="mt-4">
                {
                  <div className="mb-8">
                  <h2 className="text-xl font-semibold mb-4">Documents Details</h2>

                   <div className="flex space-x-4">
                   {hasPermission ('document','create')&& <button
                      nClick={() => setIsDocumentModalOpen(true)}
                      className="bg-green-500 text-white p-2 rounded"
                    >
                      Add Documents
                    </button>
                    }
                  
                    <button
                      onClick={() => navigate("/documentDetails")}
                      className="bg-purple-500 text-white p-2 rounded"
                    >
                      View All Documents
                    </button>

                    <button
                      onClick={() => navigate("/documentDetails")}
                      className="bg-green-500 text-white p-2 rounded"
                    >
                      View My Documents
                    </button>

                  </div>
                </div>
                }
              </div>

              <div className="mt-4">
                {
                  hasPermission('kyc','read') &&
                  <div className="mb-8">
                  <h2 className="text-xl font-semibold mb-4">Kyc Details</h2>

                   <div className="flex space-x-4">
                    <button
                      onClick={() => navigate("/kycDetails")}
                      className="bg-purple-500 text-white p-2 rounded"
                    >
                      View Kyc
                    </button>

                  </div>
                </div>
                }
              </div>

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
        )
      )}
    </>
  )
}
export default MyProfile;