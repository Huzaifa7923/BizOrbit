import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../store/slices/authSlice";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { UPDATE_USER } from "../../graphql/users/userMutations";


const EditProfile = () => {


    const {user} = useSelector((state) => state.auth);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(()=>{
        if(!user){
            navigate('/signin');
        }
    },[user,navigate])

  const [email, setEmail] = useState(user.email);

  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [name, setName] = useState(user.name);
  const [phone, setPhone] = useState(user.phone??"");
  const [address, setAddress] = useState(user.address??"");


  const [updateUser, { loading, error }] = useMutation(UPDATE_USER, {
    onCompleted: (data) => {
      console.log("to update ")
    console.log(data.updateMyProfile)
      dispatch(setCredentials(data.updateMyProfile));
      navigate("/profile"); // Redirect to the profile page
    },
    onError: (error) => {
      console.error("Error creating user:", error.message);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const updateUserInput = { password }; // Always required
    if (email && email !== user.email) updateUserInput.email = email;
    if (name && name !== user.name) updateUserInput.name = name;
    if (phone && phone !== user.phone) updateUserInput.phone = phone;
    if (address && address !== user.address) updateUserInput.address = address;
    if (newPassword) updateUserInput.newPassword = newPassword;

    updateUser({
      variables: { updateUserInput },
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

        <input
          type="password"
          placeholder="Enter password to update profile"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required={true}
          className="mb-4 p-2 border rounded w-full"
        />

        <input
          type="password"
          placeholder="Create new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="mb-4 p-2 border rounded w-full"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white p-2 rounded w-full"
        >

          {loading ? "Signing Up..." : "Save"}
        </button>
        {error && <p className="text-red-500 mt-4">{error.message}</p>}
      </form>
    </div>
  );
};

export default EditProfile;