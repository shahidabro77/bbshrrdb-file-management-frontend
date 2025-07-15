// src/redux/userAdminSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../api';

export const fetchUsers = createAsyncThunk(
  'userAdmin/fetchUsers',
  async (_, thunkAPI) => {
    try {
      const res = await axios.get('/users');
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.error || 'Failed to fetch users');
    }
  }
);

export const toggleUserStatus = createAsyncThunk(
  'userAdmin/toggleUserStatus',
  async ({ userId, is_active }, thunkAPI) => {
    try {
      const res = await axios.put(`/users/${userId}/status`, { is_active });
      return { userId, is_active, message: res.data.message };
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.error || 'Failed to update user status');
    }
  }
);

const userAdminSlice = createSlice({
  name: 'userAdmin',
  initialState: {
    users: [],
    loading: false,
    error: null,
    message: null,
  },
  reducers: {
    clearMessage: (state) => {
      state.message = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchUsers.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(toggleUserStatus.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(toggleUserStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        // Update user status in state
        const idx = state.users.findIndex(u => u.user_id === action.payload.userId);
        if (idx !== -1) state.users[idx].is_active = action.payload.is_active;
      })
      .addCase(toggleUserStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearMessage } = userAdminSlice.actions;
export default userAdminSlice.reducer;
