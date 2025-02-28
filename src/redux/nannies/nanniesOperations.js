import { createAsyncThunk } from "@reduxjs/toolkit";
import { getDatabase, ref, get } from "firebase/database";

export const fetchNannies = createAsyncThunk(
  "nannies/fetchNannies",
  async (_, thunkAPI) => {
    try {
      const database = getDatabase();
      const snapshot = await get(ref(database, "nannies"));

      if (snapshot.exists()) {
        const data = Object.values(snapshot.val()); // Преобразуем объект в массив

        return data;
      } else {
        return [];
      }
    } catch (error) {
      console.error("Error fetching nannies:", error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
