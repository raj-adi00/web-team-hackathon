// store/features/counterSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CounterState {
  adminPage: boolean;
}

const initialState: CounterState = { adminPage: false };

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    change: (state) => {
      state.adminPage = !state.adminPage;
    },
  },
});

export const { change } = adminSlice.actions;
export default adminSlice.reducer;
