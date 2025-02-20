import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useMutation } from '@apollo/client';
import { CREATE_KYC } from '../graphql/kyc/kycMutation';
import {GET_KYC} from '../graphql/kyc/kycQueries' 

const schema = yup.object().shape({
    aadhaarNumber: yup.number().required('Aadhaar number is required'),
  panNumber: yup.string().required('PAN number is required'),
});

const AddKycDetailsModal = ({ onClose, isOpen }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const [createKyc, { loading }] = useMutation(CREATE_KYC, {
    onCompleted: () => {
      onClose();
    },
    refetchQueries: [{ query: GET_KYC }]
  });

  const onSubmit = (data) => {
    console.log("clicked")
    createKyc({
      variables: {
        createKycInput: data
      }
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-xl mb-4">Add Kyc Details</h2>
        <form onSubmit={handleSubmit(onSubmit)}>

          <div className="mb-4">
            PAN Number
            <input
              {...register('panNumber')}
              placeholder="PAN Number"
              className="w-full p-2 border rounded"
            />
            {errors.panNumber && (
              <p className="text-red-500 text-sm">{errors.panNumber.message}</p>
            )}
          </div>

          <div className="mb-4">
            Aadhaar Number
            <input
              {...register('aadhaarNumber')}
              placeholder="Aadhaar Number"
              className="w-full p-2 border rounded"
            />
            {errors.aadhaarNumber && (
              <p className="text-red-500 text-sm">{errors.aadhaarNumber.message}</p>
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
              className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-blue-300"
            >
              {loading ? 'Adding...' : 'Add Details'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddKycDetailsModal;
