import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getReceivedFiles, createReceivedFile } from '../api/receivedFileApi';

export const fetchReceivedFiles = createAsyncThunk(
  'received/fetchAll',
  async (_, thunkAPI) => {
    try {
      const res = await getReceivedFiles();
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.error || 'Fetch failed');
    }
  }
);

export const addReceivedFile = createAsyncThunk(
  'received/create',
  async (formData, thunkAPI) => {
    try {
      const res = await createReceivedFile(formData);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.error || 'Create failed');
    }
  }
);

const receivedFileSlice = createSlice({
  name: 'received',
  initialState: {
    loading: false,
    files: [],
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchReceivedFiles.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReceivedFiles.fulfilled, (state, action) => {
        state.loading = false;
        state.files = action.payload;
      })
      .addCase(fetchReceivedFiles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default receivedFileSlice.reducer;
