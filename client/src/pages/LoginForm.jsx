import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@apollo/client';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { LOGIN_MUTATION } from "../graphql/auth/authMutation"
import { setCredentials } from '../store/slices/authSlice'
import { useSelector } from 'react-redux';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {useEffect} from 'react';
import { GET_MY_PERMISSION } from '../graphql/permissions/permissionQueries';
import { client } from '../apollo/client';

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Invalid email format')
    .required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});



export const LoginForm= () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchema)
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [login, { loading, error }] = useMutation(LOGIN_MUTATION);

  const {user} = useSelector((state) => state.auth);

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const result = await login({
        variables: {
          signInInput: {
            email: data.email,
            password: data.password,
          },
        },
      });
      if (result.data) {

        dispatch(setCredentials(result.data.signIn.user));
        try {
          const permissionResult = await client.query({
            query: GET_MY_PERMISSION,
          });

          if (permissionResult.data?.getMyPermission) {

            localStorage.setItem('userPermissions', JSON.stringify(permissionResult.data.getMyPermission));
          }
        } catch (permError) {
          console.error('Error fetching permissions:', permError);
        }
        console.log("xxxxx");
        navigate('/profile');
      }
    } catch (err) {
      console.error('Login error:', err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <input
                {...register('email')}
                type="email"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p> 
              )}
            </div>
            <div>
              <input
                type="password"
                {...register('password')}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
                {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password.message}</p> 
              )}
            </div>
          </div>
{/* 
          {error && (
            <div className="text-red-600 text-sm">
              {error.message}
            </div>
          )} */}

          <div>
            <button
              type="submit"
              // disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {/* {loading ? 'Signing in...' : 'Sign in'} */}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};