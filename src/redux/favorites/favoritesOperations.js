import { createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../firebase/firebase";
import {
  collection,
  getDocs,
  //getDoc,
  setDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { getDatabase, ref, get } from "firebase/database"; // Для Realtime Database

// ✅ Загружаем избранные из Firestore (Только текущего пользователя)
export const fetchFavorites = createAsyncThunk(
  "favorites/fetchFavorites",
  async (userId, { rejectWithValue }) => {
    if (!userId) {
      return rejectWithValue("User ID is missing");
    }

    try {
      // Запрос данных из коллекции "favorites" для пользователя
      const querySnapshot = await getDocs(
        collection(db, `users/${userId}/favorites`)
      );

      const favorites = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      return { favorites, userId };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Сохранение в избранное
// Сохраняем избранное в Firestore
export const saveFavorite = createAsyncThunk(
  "favorites/saveFavorite",
  async ({ userId, nannyId }, { dispatch, rejectWithValue }) => {
    if (!userId) {
      return rejectWithValue("User not logged in");
    }

    try {
      // Шаг 1: Подтягиваем данные о няне из Realtime Database
      const nannyRef = ref(getDatabase(), `nannies/${nannyId}`);
      const nannySnapshot = await get(nannyRef);

      const nanny = nannySnapshot.val(); // Данные няни из Realtime Database

      // Шаг 2: Сохраняем данные о няне в Firestore
      const favoriteRef = doc(db, `users/${userId}/favorites`, nannyId); // Путь в Firestore
      await setDoc(favoriteRef, nanny); // Сохранение данных

      // Шаг 3: Загружаем обновленные избранные данные
      dispatch(fetchFavorites(userId));

      return nanny;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// ✅ Удаляем из избранного
export const removeFavorite = createAsyncThunk(
  "favorites/removeFavorite",
  async ({ userId, nannyId }, { dispatch }) => {
    if (!userId) throw new Error("User not logged in");

    await deleteDoc(doc(db, `users/${userId}/favorites`, nannyId));
    dispatch(fetchFavorites(userId)); // ✅ Обновляем список
    return nannyId;
  }
);

// ✅ Полностью очищаем избранное при выходе
export const clearFavorites = createAsyncThunk(
  "favorites/clearFavorites",
  async (_, { getState }) => {
    const { userId } = getState().favorites;
    return userId; // ✅ Передаём ID пользователя, который выходит
  }
);
