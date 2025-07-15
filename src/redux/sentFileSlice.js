// src/store/sentFileSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchSentFiles, createSentFile } from '../api/sentFileApi';

export const getSentFiles = createAsyncThunk(
  'sentFile/getAll',
  async (_, thunkAPI) => {
    try {
      return await fetchSentFiles();
    } catch (err) {
      return thunkAPI.rejectWithValue('Failed to fetch sent files');
    }
  }
);

export const postSentFile = createAsyncThunk(
  'sentFile/create',
  async (formData, thunkAPI) => {
    try {
      return await createSentFile(formData);
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.error || 'Failed to send file'
      );
    }
  }
);

const sentFileSlice = createSlice({
  name: 'sentFile',
  initialState: {
    files: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getSentFiles.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSentFiles.fulfilled, (state, action) => {
        state.loading = false;
        state.files = action.payload.data;
      })
      .addCase(getSentFiles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(postSentFile.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postSentFile.fulfilled, (state, action) => {
        state.loading = false;
        state.files.unshift(action.payload.data); // optimistically update list
      })
      .addCase(postSentFile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default sentFileSlice.reducer;
