// src/redux/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../api';

const tokenKey = 'jwtToken';

const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }, thunkAPI) => {
    try {
      const res = await axios.post('/auth/login', { email, password });
      const token = res.data.token;

      localStorage.setItem(tokenKey, token);
      setAuthToken(token);

      // 👇 Fetch user info after login
      const userRes = await axios.get('/auth/me');

      return {
        token,
        user: userRes.data, // e.g., { id: 3, name: 'John Doe', email: '...' }
      };
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'Login failed');
    }
  }
);

export const logoutUser = createAsyncThunk('auth/logoutUser', async () => {
  localStorage.removeItem(tokenKey);
  setAuthToken(null);
});

const initialState = {
  token: localStorage.getItem(tokenKey) || null,
  user: null, // 👈 Store user profile here
  loading: false,
  error: null,
};

setAuthToken(initialState.token);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(loginUser.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.token = null;
        state.user = null;
        state.error = action.payload;
      })
      .addCase(logoutUser.fulfilled, state => {
        state.token = null;
        state.user = null;
      });
  },
});

export default authSlice.reducer;
