import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const addUserReducer = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.push(action.payload);
      return state;
    },
    currentUser: (state, action) => {
      state = action.payload;
      return state;
    },
  },
});

export const { addUser, currentUser } = addUserReducer.actions;
export const { reducer } = addUserReducer;
