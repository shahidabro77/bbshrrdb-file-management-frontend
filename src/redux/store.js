// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import dashboardReducer from './dashboardSlice';
import receivedReducer from './receivedFileSlice';
import sentFileReducer from './sentFileSlice'; // Add this
import searchReducer from './searchFileSlice'; // 👈 Add this




import userAdminReducer from './userAdminSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        dashboard: dashboardReducer,
        received: receivedReducer,
        sentFile: sentFileReducer,
        search: searchReducer,
        userAdmin: userAdminReducer,
        // add more slices here later
    },
});

export default store;
