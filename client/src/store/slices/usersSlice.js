import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: [],// will also have 
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
  },
});

export const { setCredentials, logout } = usersSlice.actions;
export default usersSlice.reducer;