import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  toggleFavorite,
  selectFavorites,
} from "../redux/favorites/favoritesSlice";
import Header from "../components/header/Header";
import Filter from "../components/filters/Filters";
import NannyList from "../components/nannylist/NannyList";
import styles from "./Favorites.module.css";

const FavoritesPage = () => {
  const dispatch = useDispatch();
  const favorites = useSelector(selectFavorites);
  const [filter, setFilter] = useState("Show all");

  const filteredFavorites = () => {
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
            favorites={favorites}
            toggleFavorite={(nanny) => dispatch(toggleFavorite(nanny))}
          />
        ) : (
          <p className={styles.noItems}>No favorites yet.</p>
        )}
      </main>
    </div>
  );
};

export default FavoritesPage;
