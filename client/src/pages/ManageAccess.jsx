import React, { useState } from "react";
import { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_ALL_PERMISSIONS } from "../graphql/permissions/permissionQueries";

const ManageAccess = () => {

  const [editingAccess, setEditingAccess] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [permissions,setPermissions]=useState([]);

  const {getAllPermissions,loading, error}=useQuery(GET_ALL_PERMISSIONS,{
    onCompleted:(data)=>{
      setPermissions(data.permissions)
    },
    onError:(error)=>{
      console.log("error",error)
    } 
  })
  
  const handleEdit = (id) => {
    console.log(id);
    const accessToEdit = permissions.find((permission) => permission.id === id);
    setEditingAccess(accessToEdit);
    setIsModalOpen(true);
  };
 
  const handleDelete = (id) => {
    setAccessList(accessList.filter((access) => access.id !== id));
    // Call API to delete access
  };

  const handleUpdateAccess = (updatedAccess) => {
    setAccessList(
      accessList.map((access) =>
        access.id === updatedAccess.id ? updatedAccess : access
      )
    );
    setIsModalOpen(false);
    setEditingAccess(null);
    // Call API to update access
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Manage Access</h1>
      <div className="bg-white p-4 rounded shadow-md">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">Role</th>
              <th className="px-4 py-2">Feature</th>
              <th className="px-4 py-2">Can Read</th>
              <th className="px-4 py-2">Can Update</th>
              <th className="px-4 py-2">Can Delete</th>
              <th className="px-4 py-2">Can Create</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {
                permissions && permissions.map((permission) => (
                    <tr key={permission.id} className="border-t">
                        <td className="px-4 py-2">{permission.role.role}</td>
                        <td className="px-4 py-2">{permission.feature.name}</td>
                        <td className="px-4 py-2">
                            <input
                                type="checkbox"
                                checked={permission.canRead}
                                disabled
                                className="form-checkbox h-5 w-5 text-blue-600"
                            />
                        </td>
                        <td className="px-4 py-2">
                            <input
                                type="checkbox"
                                checked={permission.canUpdate}
                                disabled
                                className="form-checkbox h-5 w-5 text-blue-600"
                            />
                        </td>
                        <td className="px-4 py-2">
                            <input
                                type="checkbox"
                                checked={permission.canDelete}
                                disabled
                                className="form-checkbox h-5 w-5 text-blue-600"
                            />
                        </td>
                        <td className="px-4 py-2">
                            <input
                                type="checkbox"
                                checked={permission.canCreate}
                                disabled
                                className="form-checkbox h-5 w-5 text-blue-600"
                            />
                        </td>
                        <td className="px-4 py-2">
                            <button
                                onClick={() => handleEdit(permission.id)}
                                className="bg-blue-500 text-white p-2 rounded mr-2"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDelete(permission.id)}
                                className="bg-red-500 text-white p-2 rounded"
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                ))
            }
          </tbody>



        </table>
      </div>

      {isModalOpen && editingAccess && (
        <div className="fixed inset-0  bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl mb-4">Edit {editingAccess.role} Permissions</h2>
            <div className="space-y-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={editingAccess.canRead}
                  onChange={(e) =>
                    setEditingAccess({
                      ...editingAccess,
                      canRead: e.target.checked,
                    })
                  }
                  className="form-checkbox h-5 w-5 text-blue-600"
                />
                <span className="ml-2">Can Read</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={editingAccess.canUpdate}
                  onChange={(e) =>
                    setEditingAccess({
                      ...editingAccess,
                      canUpdate: e.target.checked,
                    })
                  }
                  className="form-checkbox h-5 w-5 text-blue-600"
                />
                <span className="ml-2">Can Update</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={editingAccess.canDelete}
                  onChange={(e) =>
                    setEditingAccess({
                      ...editingAccess,
                      canDelete: e.target.checked,
                    })
                  }
                  className="form-checkbox h-5 w-5 text-blue-600"
                />
                <span className="ml-2">Can Delete</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={editingAccess.canCreate}
                  onChange={(e) =>
                    setEditingAccess({
                      ...editingAccess,
                      canCreate: e.target.checked,
                    })
                  }
                  className="form-checkbox h-5 w-5 text-blue-600"
                />
                <span className="ml-2">Can Create</span>
              </label>
            </div>
            <div className="mt-6 flex justify-end space-x-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={() => handleUpdateAccess(editingAccess)}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageAccess;