import React from "react";
import { useQuery } from "@apollo/client";
import { GET_DOCUMENTS } from "../graphql/documents/documentsQueries";



const DocumentDetails = () => {

  const {data,loading,error}=useQuery(GET_DOCUMENTS);


  const handleEdit = (id) => {
    console.log("Edit document with id:", id);
    // Navigate to edit page or open a modal
  };

  const handleDelete = (id) => {
    console.log("Delete document with id:", id);
    // Call API to delete document
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">All Documents</h1>
      <div className="bg-white p-4 rounded shadow-md">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">Document Type</th>
              <th className="px-4 py-2">File URL</th>
              <th className="px-4 py-2">Uploaded Date</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data && data.myDocuments.map((doc) => (
              <tr key={doc.id} className="border-t">
                <td className="px-4 py-2">{doc.docType}</td>
                <td className="px-4 py-2">
                  <a href={doc.fileUrl} target="_blank" rel="noopener noreferrer">
                    View Document
                  </a>
                </td>
                <td className="px-4 py-2">
                  {new Date(doc.uploadedDate).toLocaleDateString()}
                </td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleEdit(doc.id)}
                    className="bg-blue-500 text-white p-2 rounded mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(doc.id)}
                    className="bg-red-500 text-white p-2 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DocumentDetails;