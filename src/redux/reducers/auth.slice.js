import { createSlice } from '@reduxjs/toolkit';

const initialState = {
       user: null,
       school:{},
       error: '',
       message: '',
      isLoading: false,
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
        state.user = action.payload;
        state.error = '';
        state.message = '';
      },
      saveSchool:(state, action)=>{
        state.school = action.payload;
      },
    loginFailed: (state, action) => {
        state.error = action.payload;
        state.user = null;
      },
      signupFailed: (state, action) => {
        state.error = action.payload;
        state.user = null;
      },
      storeUserData: (state, action) => {
        state.user = action.payload;
      },
    clearUser: (state) => {
      return {
        ...initialState,
      };
    },
    logoutFxn: state => {

    },
  },
});

const { actions, reducer } = loginSlice;

export const {
 loginSuccess,
 saveSchool,
 loginFailed,
 signupFailed,
 storeUserData,
 clearUser,
 logoutFxn,
} = actions;

export default reducer;


