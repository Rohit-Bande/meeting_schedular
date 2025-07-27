import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import students from "../data/students.json";
import { allocateMeetings } from "../utiles/utils";

export const fetchStudents = createAsyncThunk(
  "scheduler/fetchStudents",
  async () => students
);

const slice = createSlice({
  name: "scheduler",
  initialState: {
    students: [],
    selectedDates: [],
    schedule: {},
    attendance: {},
  },
  reducers: {
    selectDates: (state, action) => {
      state.selectedDates = action.payload;
    },
    scheduleMeetings: (state) => {
      const { schedule, attendance } = allocateMeetings(
        state.students,
        state.selectedDates
      );
      state.schedule = schedule;
      state.attendance = attendance;
    },
    addMeeting: (state, action) => {
      const { date, student } = action.payload;
      state.schedule[date] = state.schedule[date] || [];
      state.attendance[date] = state.attendance[date] || {};

      state.schedule[date].push(student);
      state.attendance[date][student.student_name] =
        student.attendanceStatus || "present";
    },
    editMeeting: (state, action) => {
      const { date, studentName, updatedData } = action.payload;
      const updatedSchedule = state.schedule[date]?.map((student) =>
        student.student_name === studentName
          ? { ...student, ...updatedData }
          : student
      );
      state.schedule[date] = updatedSchedule;

      if (!state.attendance[date]) {
        state.attendance[date] = {};
      }

      state.attendance[date][studentName] = updatedData.attendanceStatus;
    },
    deleteMeeting: (state, action) => {
      const { date, studentName } = action.payload;
      state.schedule[date] =
        state.schedule[date]?.filter((m) => m.student_name !== studentName) ||
        [];
      delete state.attendance[date]?.[studentName];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchStudents.fulfilled, (state, action) => {
      state.students = action.payload;
    });
  },
});

export const {
  selectDates,
  scheduleMeetings,
  addMeeting,
  editMeeting,
  deleteMeeting,
} = slice.actions;

export default slice.reducer;
