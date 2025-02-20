import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useMutation } from '@apollo/client';
import { GET_DOCUMENTS } from '../graphql/documents/documentsQueries';
import { gql } from '@apollo/client';

const schema = yup.object().shape({
  docType: yup.string().required('Document type is required'),
});

const AddDocumentModal = ({ onClose, isOpen }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const [uploadDocument, { loading }] = useMutation(gql`
    mutation UploadDocument($docType: String!, $file: Upload!) {
      uploadDocument(docType: $docType, file: $file) {
        id
        docType
        fileUrl
        uploadedDate
      }
    }
  `, {
    onCompleted: () => {
      onClose();
    },
    refetchQueries: [{ query: GET_DOCUMENTS }]
  });

  const onSubmit = async (data) => {
    if (!selectedFile) return;
    
    try {
      await uploadDocument({
        variables: {
          docType: data.docType,
          file: selectedFile
        }
      });
    } catch (error) {
      console.error('Error uploading document:', error);
    }
  };

  const handleFileChange = (e) => {
    console.log("xxxxxxxxxx");
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-xl mb-4">Upload Document</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block mb-2">Document Type</label>
            <select
              {...register('docType')}
              className="w-full p-2 border rounded"
            >
              <option value="">Select document type</option>
              <option value="pan">PAN</option>
              <option value="aadhaar">Aadhaar</option>
            </select>
            {errors.docType && (
              <p className="text-red-500 text-sm">{errors.docType.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block mb-2">Upload File</label>
            <input
              type="file"
              onChange={handleFileChange}
              className="w-full p-2 border rounded"
              accept=".pdf,.jpg,.jpeg,.png"
            />
            {errors.file && (
              <p className="text-red-500 text-sm">{errors.file.message}</p>
            )}
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || !selectedFile}
              className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-blue-300"
            >
              {loading ? 'Uploading...' : 'Upload'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDocumentModal;
