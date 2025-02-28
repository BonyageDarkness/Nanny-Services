import { configureStore } from "@reduxjs/toolkit";
import nanniesReducer from "./nannies/nanniesSlice";
import favoritesReducer from "./favorites/favoritesSlice";

export const store = configureStore({
  reducer: {
    nannies: nanniesReducer,
    favorites: favoritesReducer,
  },
});
