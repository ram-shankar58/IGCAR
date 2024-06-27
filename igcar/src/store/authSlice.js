import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loginUser as loginAPI, checkBackendConnection } from '../utils/APIRequest';

export const loginUser = createAsyncThunk('auth/loginUser', async ({ email, password }, thunkAPI) => {
  const response = await loginAPI(email, password);
  return response;
});

export const checkConnection = createAsyncThunk('auth/checkConnection', async (_, thunkAPI) => {
  const isConnected = await checkBackendConnection();
  return isConnected;
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: JSON.parse(localStorage.getItem('user')) || null,
    status: 'idle',
    error: null,
    isConnected: true,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      localStorage.removeItem('user');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
        localStorage.setItem('user', JSON.stringify(action.payload));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(checkConnection.fulfilled, (state, action) => {
        state.isConnected = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
