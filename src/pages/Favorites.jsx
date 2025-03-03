import { useState, useEffect } from "react";
import Header from "../components/header/Header";
import Filter from "../components/filters/Filters";
import NannyList from "../components/nannylist/NannyList";
import styles from "./Favorites.module.css";
import { useAuth } from "../context/AuthContext";

const FavoritesPage = () => {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [filter, setFilter] = useState("Show all");

  // Загружаем избранные няни при загрузке страницы
  useEffect(() => {
    if (user) {
      const savedFavorites =
        JSON.parse(localStorage.getItem(`favorites_${user.uid}`)) || [];
      setFavorites(savedFavorites);
    }
  }, [user]);

  // Функция удаления няни из избранного
  const updateFavorites = (nannyId) => {
    setFavorites((prevFavorites) => {
      const updatedFavorites = prevFavorites.filter(
        (nanny) => nanny.id !== nannyId
      );

      // ✅ Синхронизируем localStorage
      localStorage.setItem(
        `favorites_${user.uid}`,
        JSON.stringify(updatedFavorites)
      );

      return updatedFavorites;
    });
  };

  // Фильтрация избранных нянь
  const filteredFavorites = () => {
    if (!favorites.length) return [];

    switch (filter) {
      case "A to Z":
        return [...favorites].sort((a, b) => a.name.localeCompare(b.name));
      case "Z to A":
        return [...favorites].sort((a, b) => b.name.localeCompare(a.name));
      case "Less than 10$":
        return favorites.filter((nanny) => nanny.price_per_hour < 10);
      case "Greater than 10$":
        return favorites.filter((nanny) => nanny.price_per_hour > 10);
      case "Popular":
        return favorites.filter((nanny) => nanny.rating > 4.5);
      case "Not popular":
        return favorites.filter((nanny) => nanny.rating <= 4.5);
      default:
        return favorites;
    }
  };

  return (
    <div>
      <Header
        variant="dark"
        positionClass={`${styles.favoritesHeader} ${styles.centeredNav}`}
      />

      <main className={styles.favoritesContainer}>
        <Filter filter={filter} setFilter={setFilter} />

        {filteredFavorites().length > 0 ? (
          <NannyList
            displayedNannies={filteredFavorites()}
            updateFavorites={updateFavorites}
          />
        ) : (
          <p className={styles.noItems}>No favorites yet.</p>
        )}
      </main>
    </div>
  );
};

export default FavoritesPage;
