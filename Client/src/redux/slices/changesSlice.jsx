import { createSlice } from '@reduxjs/toolkit';

const changesSlice = createSlice({
  name: 'changes',
  initialState: {
    value: false,
  },
  reducers: {
    toggleChanges: (state) => {
      state.value = !state.value; // Toggle the value of changes
    },
  },
});

export const { toggleChanges } = changesSlice.actions;

export default changesSlice.reducer;
