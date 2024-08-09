import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../api/axios";
import westlakeNestUrl from "../api/axios";

// Thunks
export const listUsers = createAsyncThunk("api/users/listUsers", async () => {
  const response = await westlakeNestUrl.get("/api/users");
  return response.data;
});

export const getUser = createAsyncThunk("users/getUser", async (id) => {
  const response = await westlakeNestUrl.get(`/users/${id}`);
  return response.data;
});

export const createUser = createAsyncThunk("users/createUser", async (user) => {
  console.log("SENDING CREATE LOAD");
  const response = await westlakeNestUrl.post("api/users/create", user);
  return response.data;
});

export const updateUser = createAsyncThunk(
  "users/updateUser",
  async ({ id, user }) => {
    const response = await westlakeNestUrl.put(`/users/${id}`, user);
    return response.data;
  }
);

export const deleteUser = createAsyncThunk("users/deleteUser", async (id) => {
  await westlakeNestUrl.delete(`/users/${id}`);
  return id;
});

// Initial state
const initialState = {
  list: [], // Changed from `users` to `list`
  user: null,
  status: "idle",
  error: null,
};

// Slice
const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    clearCurrentUser(state) {
      state.user = null;
    },
    setCurrentUser(state, action) {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(listUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(listUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload; // Updated to set `list`
      })
      .addCase(listUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(getUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list.push(action.payload); // Updated to push to `list`
      })
      .addCase(createUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(updateUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.list.findIndex(
          (user) => user.id === action.payload.id
        );
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = state.list.filter((user) => user.id !== action.payload);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

// Export actions
export const { clearCurrentUser, setCurrentUser } = userSlice.actions;

export default userSlice.reducer;
