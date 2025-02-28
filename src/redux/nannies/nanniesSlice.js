import { createSlice } from "@reduxjs/toolkit";
import { fetchNannies } from "./nanniesOperations";

const initialState = {
  nannies: [],
  status: "idle",
  error: null,
};

const nanniesSlice = createSlice({
  name: "nannies",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNannies.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchNannies.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.nannies = action.payload;
      })
      .addCase(fetchNannies.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default nanniesSlice.reducer;
