import { createSlice } from '@reduxjs/toolkit';
import { act } from 'react';

const initialState = {
  users: [],// will also have 
  businesses:[]
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (
      state,
      action
    ) => {
      console.log(action)
      console.log(action.payload)
      state.users = action.payload.users;
    },
    clearUsers: (state) => {
      state.users = [];
    },
    setBusinessDetails:(
      state,
      action
    )=>{
      console.log("inside setBusinessDetails of usersSLice")
      state.businesses = action.payload;
    },
    clearBusinesses:(state)=>{
      state.businesses=[]
    }
  },
});

export const { setCredentials, logout,setBusinessDetails } = usersSlice.actions;
export default usersSlice.reducer;