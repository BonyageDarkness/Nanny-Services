import { createSlice } from "@reduxjs/toolkit";
import {
  fetchFavorites,
  saveFavorite,
  removeFavorite,
  clearFavorites,
} from "./favoritesOperations";

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: {
    favorites: [],
    userId: null,
  },
  reducers: {
    toggleFavorite: (state, action) => {
      const nanny = action.payload;
      const existingIndex = state.favorites.findIndex(
        (fav) => fav.id === nanny.id
      );

      if (existingIndex >= 0) {
        state.favorites.splice(existingIndex, 1);
      } else {
        state.favorites.push(nanny);
      }
    },
    addFavoriteLocal: (state, action) => {
      state.favorites.push(action.payload);
    },
    removeFavoriteLocal: (state, action) => {
      state.favorites = state.favorites.filter(
        (fav) => fav.id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        console.log(
          "📥 Redux: загружаем избранное из Firestore",
          action.payload
        );
        state.favorites = action.payload.favorites || [];
        state.userId = action.payload.userId;
      })

      .addCase(saveFavorite.fulfilled, (state, action) => {
        state.favorites.push(action.payload);
      })
      .addCase(removeFavorite.fulfilled, (state, action) => {
        state.favorites = state.favorites.filter(
          (fav) => fav.id !== action.payload
        );
      })
      .addCase(clearFavorites.fulfilled, (state, action) => {
        console.log("🚪 Выход из аккаунта. Очищаем локальное избранное.");
        if (state.userId === action.payload) {
          state.favorites = [];
        }
        state.userId = null;
      });
  },
});

export const { toggleFavorite, addFavoriteLocal, removeFavoriteLocal } =
  favoritesSlice.actions;
export const selectFavorites = (state) => state.favorites.favorites;
export default favoritesSlice.reducer;
