import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useMutation } from '@apollo/client';
import { UPDATE_BUSINESS } from '../graphql/business/businessMutation';
import { GET_ALL_BUSINESS, GET_BUSINESS } from '../graphql/business/businessQueries';

const schema = yup.object().shape({
  business_name: yup.string().required('Business name is required'),
  gst_number: yup.string().required('GST number is required'),
  pan_number: yup.string().required('PAN number is required'),
  address: yup.string().required('Address is required'),
  pin_code: yup.string().required('PIN code is required'),
});

const EditBusinessModal = ({ business, onClose, isOpen }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      business_name: business?.business_name || '',
      gst_number: business?.gst_number || '',
      pan_number: business?.pan_number || '',
      address: business?.address || '',
      pin_code: business?.pin_code || '',
    }
  });

  const [updateBusiness, { loading }] = useMutation(UPDATE_BUSINESS, {
    onCompleted: () => {
      onClose();
    },
    refetchQueries: [{ query: GET_BUSINESS },{query:GET_ALL_BUSINESS}]
  });

  const onSubmit = (data) => {
    updateBusiness({
      variables: {
        updateBusinessInput: {
          id: Number(business.id),
          ...data
        }
      }
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-xl mb-4">Edit Business</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            Business Name
            <input
              {...register('business_name')}
              placeholder="Business Name"
              className="w-full p-2 border rounded"
            />
            {errors.business_name && (
              <p className="text-red-500 text-sm">{errors.business_name.message}</p>
            )}
          </div>

          <div className="mb-4">
            Gst number
            <input
              {...register('gst_number')}
              placeholder="GST Number"
              className="w-full p-2 border rounded"
            />
            {errors.gst_number && (
              <p className="text-red-500 text-sm">{errors.gst_number.message}</p>
            )}
          </div>

          <div className="mb-4">
            Pan number
            <input
              {...register('pan_number')}
              placeholder="PAN Number"
              className="w-full p-2 border rounded"
            />
            {errors.pan_number && (
              <p className="text-red-500 text-sm">{errors.pan_number.message}</p>
            )}
          </div>

          <div className="mb-4">
            Address
            <input
              {...register('address')}
              placeholder="Address"
              className="w-full p-2 border rounded"
            />
            {errors.address && (
              <p className="text-red-500 text-sm">{errors.address.message}</p>
            )}
          </div>

          <div className="mb-4">
            Pincode
            <input
              {...register('pin_code')}
              placeholder="PIN Code"
              className="w-full p-2 border rounded"
            />
            {errors.pin_code && (
              <p className="text-red-500 text-sm">{errors.pin_code.message}</p>
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
              disabled={loading}
              className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-blue-300"
            >
              {loading ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBusinessModal;