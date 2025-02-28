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
    favorites: [], // ✅ Храним список избранных
    userId: null, // ✅ Храним ID пользователя
  },
  reducers: {
    toggleFavorite: (state, action) => {
      const nanny = action.payload;
      const existingIndex = state.favorites.findIndex(
        (fav) => fav.id === nanny.id
      );

      if (existingIndex >= 0) {
        state.favorites.splice(existingIndex, 1); // ✅ Удаляем из избранного
      } else {
        state.favorites.push(nanny); // ✅ Добавляем в избранное
      }
    },
    addFavoriteLocal: (state, action) => {
      state.favorites.push(action.payload); // ✅ Локальное добавление
    },
    removeFavoriteLocal: (state, action) => {
      state.favorites = state.favorites.filter(
        (fav) => fav.id !== action.payload
      ); // ✅ Локальное удаление
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
        state.userId = action.payload.userId; // ✅ Привязываем избранное к пользователю
      })

      .addCase(saveFavorite.fulfilled, (state, action) => {
        console.log("✅ Добавлено в избранное:", action.payload);
        state.favorites.push(action.payload);
      })
      .addCase(removeFavorite.fulfilled, (state, action) => {
        console.log("❌ Удалено из избранного:", action.payload);
        state.favorites = state.favorites.filter(
          (fav) => fav.id !== action.payload
        );
      })
      .addCase(clearFavorites.fulfilled, (state, action) => {
        console.log("🚪 Выход из аккаунта. Очищаем локальное избранное.");
        if (state.userId === action.payload) {
          state.favorites = []; // ✅ Очищаем только если это ТЕКУЩИЙ пользователь
        }
        state.userId = null; // ✅ Отвязываем пользователя
      });
  },
});

export const { toggleFavorite, addFavoriteLocal, removeFavoriteLocal } =
  favoritesSlice.actions;
export const selectFavorites = (state) => state.favorites.favorites;
export default favoritesSlice.reducer;
