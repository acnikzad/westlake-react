import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../api/axios";
import westlakeNestUrl from "../api/axios";

// Thunks
export const listStudents = createAsyncThunk(
  "students/listStudents",
  async () => {
    const response = await westlakeNestUrl.get("/students");
    return response.data;
  }
);

export const getStudent = createAsyncThunk(
  "students/getStudent",
  async (id) => {
    const response = await westlakeNestUrl.get(`/students/${id}`);
    return response.data;
  }
);

export const createStudent = createAsyncThunk(
  "students/createStudent",
  async (student) => {
    const response = await westlakeNestUrl.post(
      "/api/students/create",
      student
    );
    return response.data;
  }
);

export const updateStudent = createAsyncThunk(
  "students/updateStudent",
  async ({ id, student }) => {
    const response = await westlakeNestUrl.patch(`/students/${id}`, student);
    return response.data;
  }
);

export const deleteStudent = createAsyncThunk(
  "students/deleteStudent",
  async (id) => {
    await westlakeNestUrl.delete(`/students/${id}`);
    return id;
  }
);

// Initial state
const initialState = {
  students: [],
  student: null,
  status: "idle",
  error: null,
};

// Slice
const studentSlice = createSlice({
  name: "students",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(listStudents.pending, (state) => {
        state.status = "loading";
      })
      .addCase(listStudents.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.students = action.payload;
      })
      .addCase(listStudents.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(getStudent.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getStudent.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.student = action.payload;
      })
      .addCase(getStudent.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createStudent.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createStudent.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.students.push(action.payload);
      })
      .addCase(createStudent.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(updateStudent.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateStudent.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.students.findIndex(
          (student) => student.id === action.payload.id
        );
        state.students[index] = action.payload;
      })
      .addCase(updateStudent.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteStudent.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteStudent.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.students = state.students.filter(
          (student) => student.id !== action.payload
        );
      })
      .addCase(deleteStudent.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default studentSlice.reducer;
