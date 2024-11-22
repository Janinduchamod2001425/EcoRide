import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  feedInfo: localStorage.getItem("feedInfo")
    ? JSON.parse(localStorage.getItem("feedInfo"))
    : null,
};

const feedSlice = createSlice({
  name: "feedback",
  initialState,
  reducers: {
    submitFeedback: (state, action) => {
      state.feedInfo = action.payload;
      localStorage.setItem("feedInfo", JSON.stringify(action.payload));
    },
  },
});

export const { submitFeedback } = feedSlice.actions;

export default feedSlice.reducer;