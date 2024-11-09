import { createSlice } from '@reduxjs/toolkit';

const initialAdmins = JSON.parse(localStorage.getItem('formData'))?.filter(user => user.title === 'Add Admin') || [];
const initialUsers = JSON.parse(localStorage.getItem('formData'))?.filter(user => user.title === 'Add User') || [];

const adminUserSlice = createSlice({
  name: 'adminUser',
  initialState: {
    admins: initialAdmins,
    users: initialUsers,
  },
  reducers: {
    addAdmin: (state, action) => {
      state.admins.push(action.payload);
    },
    addUser: (state, action) => {
      state.users.push(action.payload);
    },
    removeAdmin: (state, action) => {
      state.admins = state.admins.filter(admin => admin.username !== action.payload);
    },
    removeUser: (state, action) => {
      state.users = state.users.filter(user => user.username !== action.payload);
    },
  },
});

export const { addAdmin, addUser, removeAdmin, removeUser } = adminUserSlice.actions;
export default adminUserSlice.reducer;
