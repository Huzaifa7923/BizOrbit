import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../graphql/auth/authMutation";
import { useDispatch } from "react-redux";
import { setCredentials } from "../store/slices/authSlice";
import { useSelector } from "react-redux";
import { useEffect } from "react";


const SignUpForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {user} = useSelector((state) => state.auth);
  useEffect(()=>{
    if(user){
        navigate('/profile');
    }
},[user,navigate])



  const [createUser, { loading, error }] = useMutation(CREATE_USER, {
    onCompleted: (data) => {
    console.log(data.createUser.user)
      dispatch(setCredentials(data.createUser.user));
      navigate("/profile"); // Redirect to the profile page
    },
    onError: (error) => {
      console.error("Error creating user:", error.message);
    },
  });



  const handleSubmit = (e) => {
    e.preventDefault();
    createUser({
      variables: {
        createUserInput: {
          email,
          password,
          name,
          phone,
          address,
        },
      },
    });
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
        <h2 className="text-2xl mb-4">Sign Up</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-4 p-2 border rounded w-full"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-4 p-2 border rounded w-full"
        />
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mb-4 p-2 border rounded w-full"
        />
        <input
          type="text"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="mb-4 p-2 border rounded w-full"
        />
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="mb-4 p-2 border rounded w-full"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white p-2 rounded w-full"
        >
          {loading ? "Signing Up..." : "Sign Up"}
        </button>
        {error && <p className="text-red-500 mt-4">{error.message}</p>}
      </form>
    </div>
  );
};

export default SignUpForm;