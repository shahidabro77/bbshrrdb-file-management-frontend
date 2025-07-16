import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../api';

// Sidebar items by role for React sidebar
export const SIDEBAR_ITEMS = {
  'admin section': [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/received_file', label: 'Received File' },
    { href: '/sent_file', label: 'Sent File' },
    { href: '/search_file', label: 'Search File' },
    { href: '/qr_code', label: 'QR Code' },
    { href: '/user_management', label: 'User Management' },
    { href: '/profile_settings', label: 'Profile Settings' },
  ],
  'secretary bbshrrdb': [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/received_file', label: 'Received File' },
    { href: '/sent_file', label: 'Sent File' },
    { href: '/search_file', label: 'Search File' },
    { href: '/qr_code', label: 'QR Code' },
    { href: '/user_management', label: 'User Management' },
    { href: '/profile_settings', label: 'Profile Settings' },
  ],
  'accounts section': [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/received_file', label: 'Received File' },
    { href: '/sent_file', label: 'Sent File' },
    { href: '/search_file', label: 'Search File' },
    { href: '/profile_settings', label: 'Profile Settings' },
  ],
  'training section': [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/received_file', label: 'Received File' },
    { href: '/sent_file', label: 'Sent File' },
    { href: '/search_file', label: 'Search File' },
    { href: '/profile_settings', label: 'Profile Settings' },
  ],
  'training director': [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/received_file', label: 'Received File' },
    { href: '/sent_file', label: 'Sent File' },
    { href: '/search_file', label: 'Search File' },
    { href: '/profile_settings', label: 'Profile Settings' },
  ],
  'private sector': [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/received_file', label: 'Received File' },
    { href: '/sent_file', label: 'Sent File' },
    { href: '/search_file', label: 'Search File' },
    { href: '/profile_settings', label: 'Profile Settings' },
  ],
  'public sector': [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/received_file', label: 'Received File' },
    { href: '/sent_file', label: 'Sent File' },
    { href: '/search_file', label: 'Search File' },
    { href: '/profile_settings', label: 'Profile Settings' },
  ],
  'it section': [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/received_file', label: 'Received File' },
    { href: '/sent_file', label: 'Sent File' },
    { href: '/search_file', label: 'Search File' },
    { href: '/profile_settings', label: 'Profile Settings' },
  ],
  'procurment section': [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/received_file', label: 'Received File' },
    { href: '/sent_file', label: 'Sent File' },
    { href: '/search_file', label: 'Search File' },
    { href: '/profile_settings', label: 'Profile Settings' },
  ],
};
// Role constants for frontend usage
export const ROLES = [
  'accounts section',
  'admin section',
  'it section',
  'private sector',
  'procurment section',
  'public sector',
  'secretary bbshrrdb',
  'training director',
  'training section',
];

const tokenKey = 'jwtToken';
const userKey = 'userObject';

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
      localStorage.setItem(userKey, JSON.stringify(userRes.data));

      return {
        token,
        user: userRes.data,
      };
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'Login failed');
    }
  }
);

// Registration thunk
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (formData, thunkAPI) => {
    try {
      const res = await axios.post('/auth/register', formData);
      // Optionally, auto-login after registration:
      // const loginRes = await axios.post('/auth/login', { email: formData.email, password: formData.password });
      // const token = loginRes.data.token;
      // localStorage.setItem(tokenKey, token);
      // setAuthToken(token);
      // const userRes = await axios.get('/auth/me');
      // return { token, user: userRes.data };
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'Registration failed');
    }
  }
);

export const logoutUser = createAsyncThunk('auth/logoutUser', async () => {
  localStorage.removeItem(tokenKey);
  setAuthToken(null);
});


const initialState = {
  token: localStorage.getItem(tokenKey) || null,
  user: (() => {
    try {
      const stored = localStorage.getItem(userKey);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  })(),
  loading: false,
  error: null,
  registrationSuccess: false,
};

setAuthToken(initialState.token);


const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetRegistration: (state) => {
      state.registrationSuccess = false;
      state.error = null;
    },
  },
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
      .addCase(registerUser.pending, state => {
        state.loading = true;
        state.error = null;
        state.registrationSuccess = false;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.registrationSuccess = true;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.registrationSuccess = false;
        state.error = action.payload;
      })
      .addCase(logoutUser.fulfilled, state => {
        state.token = null;
        state.user = null;
        localStorage.removeItem(userKey);
      });
  },
});

export const { resetRegistration } = authSlice.actions;
export default authSlice.reducer;
