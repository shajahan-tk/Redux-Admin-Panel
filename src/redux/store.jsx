// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import adminUserReducer from './adminUserSlice';

const store = configureStore({
  reducer: {
    adminUser: adminUserReducer,
  },
});

export default store;
