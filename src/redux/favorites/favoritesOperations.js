import { createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../firebase/firebase";
import {
  collection,
  getDocs,
  setDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { getDatabase, ref, get } from "firebase/database";

export const fetchFavorites = createAsyncThunk(
  "favorites/fetchFavorites",
  async (userId, { rejectWithValue }) => {
    if (!userId) {
      return rejectWithValue("User ID is missing");
    }

    try {
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

export const saveFavorite = createAsyncThunk(
  "favorites/saveFavorite",
  async ({ userId, nannyId }, { dispatch, rejectWithValue }) => {
    if (!userId) {
      return rejectWithValue("User not logged in");
    }

    try {
      const nannyRef = ref(getDatabase(), `nannies/${nannyId}`);
      const nannySnapshot = await get(nannyRef);

      const nanny = nannySnapshot.val();

      const favoriteRef = doc(db, `users/${userId}/favorites`, nannyId);
      await setDoc(favoriteRef, nanny);

      dispatch(fetchFavorites(userId));

      return nanny;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const removeFavorite = createAsyncThunk(
  "favorites/removeFavorite",
  async ({ userId, nannyId }, { dispatch }) => {
    if (!userId) throw new Error("User not logged in");

    await deleteDoc(doc(db, `users/${userId}/favorites`, nannyId));
    dispatch(fetchFavorites(userId));
    return nannyId;
  }
);

export const clearFavorites = createAsyncThunk(
  "favorites/clearFavorites",
  async (_, { getState }) => {
    const { userId } = getState().favorites;
    return userId;
  }
);
