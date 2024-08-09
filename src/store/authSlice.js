import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import westlakeNestUrl from '../api/axios';

export const loginUser = createAsyncThunk('auth/loginUser', async (credentials) => {
  const response = await westlakeNestUrl.post('/api/auth/login', credentials);
  return response.data;
});

export const registerUser = createAsyncThunk('auth/registerUser', async (user) => {
  const response = await westlakeNestUrl.post('api/auth/register', user);
  return response.data;
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.access_token;
        state.currentUser = action.payload.user;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.access_token;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;



