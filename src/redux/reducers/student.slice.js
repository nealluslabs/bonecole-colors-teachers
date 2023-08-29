import { createSlice } from '@reduxjs/toolkit';

const initialState = {
       students: [],
       teachers: [],
       results: [],
       error: '',
       message: '',
      isLoading: false,
};

const studentSlice = createSlice({
  name: 'student',
  initialState,
  reducers: {
    savetudentResult: (state, action) => {
        state.results = action.payload;
        state.error = '';
        state.message = '';
      },
    fetchStudents: (state, action) => {
        state.students = action.payload;
        state.error = '';
        state.message = '';
      },
    fetchTeachers: (state, action) => {
        state.teachers = action.payload;
        state.error = '';
        state.message = '';
      },
  },
});

const { actions, reducer } = studentSlice;

export const {
  fetchStudents,
  fetchTeachers,
  savetudentResult,
} = actions;

export default reducer;


