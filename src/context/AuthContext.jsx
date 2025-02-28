import { createContext, useState, useEffect, useContext } from "react";
import { auth } from "../firebase/firebase";
import {
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
} from "firebase/auth";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import {
  fetchFavorites,
  clearFavorites,
} from "../redux/favorites/favoritesOperations";
import { getDoc, doc } from "firebase/firestore";
import { firestoreDB } from "../firebase/firebase"; // Firestore база данных

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          // Загружаем имя пользователя из Firestore
          const userDoc = await getDoc(
            doc(firestoreDB, "users", currentUser.uid)
          );
          const userData = userDoc.exists() ? userDoc.data() : {};
          setUser({
            ...currentUser,
            displayName: userData.name || "User",
          });

          await dispatch(fetchFavorites(currentUser.uid));
        } catch (error) {
          console.error("❌ Ошибка загрузки профиля:", error.message);
        }
      } else {
        setUser(null);
        await dispatch(clearFavorites());
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("🔑 Успешный вход:", userCredential.user.uid);

      // Загружаем имя после входа
      const userDoc = await getDoc(
        doc(firestoreDB, "users", userCredential.user.uid)
      );
      const userData = userDoc.exists() ? userDoc.data() : {};

      setUser({
        ...userCredential.user,
        displayName: userData.name || "User",
      });

      await dispatch(fetchFavorites(userCredential.user.uid));
    } catch (error) {
      console.error("❌ Ошибка входа:", error.message);
      throw error;
    }
  };

  const logout = async () => {
    if (user) {
      await dispatch(clearFavorites(user.uid));
    }
    await signOut(auth);
    setUser(null); // Очистка данных пользователя
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAuth = () => useContext(AuthContext);
