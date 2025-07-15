import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { searchFiles } from '../api/searchFileApi';

export const fetchSearchedFiles = createAsyncThunk(
  'search/fetchFiles',
  async (params, thunkAPI) => {
    try {
      const response = await searchFiles(params);
      return response.files; // assuming { success: true, files: [...] }
    } catch (err) {
      return thunkAPI.rejectWithValue('Search failed');
    }
  }
);

const searchFileSlice = createSlice({
  name: 'search',
  initialState: {
    files: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearSearchResults: state => {
      state.files = [];
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchSearchedFiles.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSearchedFiles.fulfilled, (state, action) => {
        state.loading = false;
        state.files = action.payload;
      })
      .addCase(fetchSearchedFiles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearSearchResults } = searchFileSlice.actions;
export default searchFileSlice.reducer;
