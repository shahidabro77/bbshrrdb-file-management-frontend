// src/store/dashboardSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchDashboardStats,
  fetchRecentFiles,
  fetchChartData,
} from '../api/dashboardApi';

export const getDashboardStats = createAsyncThunk(
  'dashboard/getStats',
  async (_, thunkAPI) => {
    try {
      return await fetchDashboardStats();
    } catch (err) {
      return thunkAPI.rejectWithValue('Failed to load stats');
    }
  }
);

export const getRecentFiles = createAsyncThunk(
  'dashboard/getFiles',
  async (_, thunkAPI) => {
    try {
      return await fetchRecentFiles();
    } catch (err) {
      return thunkAPI.rejectWithValue('Failed to load files');
    }
  }
);

export const getChartData = createAsyncThunk(
  'dashboard/getCharts',
  async (_, thunkAPI) => {
    try {
      return await fetchChartData();
    } catch (err) {
      return thunkAPI.rejectWithValue('Failed to load chart data');
    }
  }
);

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: {
    stats: null,
    files: [],
    charts: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getDashboardStats.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDashboardStats.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload;
      })
      .addCase(getDashboardStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getRecentFiles.fulfilled, (state, action) => {
        state.files = action.payload;
      })
      .addCase(getRecentFiles.rejected, (state, action) => {
        state.error = action.payload;
      })

      .addCase(getChartData.fulfilled, (state, action) => {
        state.charts = action.payload;
      })
      .addCase(getChartData.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default dashboardSlice.reducer;
