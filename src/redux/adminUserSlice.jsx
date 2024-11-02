// src/redux/adminUserSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  admins: [],
  users: [],
};

const adminUserSlice = createSlice({
  name: 'adminUser',
  initialState,
  reducers: {
    addAdmin(state, action) {
      state.admins.push(action.payload);
    },
    addUser(state, action) {
      state.users.push(action.payload);
    },
    removeAdmin(state, action) {
      state.admins = state.admins.filter(admin => admin.username !== action.payload);
    },
    removeUser(state, action) {
      state.users = state.users.filter(user => user.username !== action.payload);
    },
  },
});

export const { addAdmin, addUser, removeAdmin, removeUser } = adminUserSlice.actions;
export default adminUserSlice.reducer;
