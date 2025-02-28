import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNannies } from "../redux/nannies/nanniesOperations";
import {
  selectNannies,
  selectNanniesStatus,
  selectNanniesError,
} from "../redux/nannies/nanniesSelectors";
import {
  toggleFavorite,
  selectFavorites,
} from "../redux/favorites/favoritesSlice";
import Header from "../components/header/Header";
import Filter from "../components/filters/Filters";
import NannyList from "../components/nannylist/NannyList";
import styles from "./Nannies.module.css";

const NanniesPage = () => {
  const dispatch = useDispatch();
  const nannies = useSelector(selectNannies) || [];
  const status = useSelector(selectNanniesStatus);
  const error = useSelector(selectNanniesError);
  const favorites = useSelector(selectFavorites) || [];

  const [visibleCount, setVisibleCount] = useState(3);
  const [filter, setFilter] = useState("Show all");

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchNannies());
    }
  }, [dispatch, status]);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 3);
  };

  const filteredNannies = () => {
    switch (filter) {
      case "A to Z":
        return [...nannies].sort((a, b) => a.name.localeCompare(b.name));
      case "Z to A":
        return [...nannies].sort((a, b) => b.name.localeCompare(a.name));
      case "Less than 10$":
        return nannies.filter((nanny) => nanny.price_per_hour < 10);
      case "Greater than 10$":
        return nannies.filter((nanny) => nanny.price_per_hour > 10);
      case "Popular":
        return nannies.filter((nanny) => nanny.rating > 4.5);
      case "Not popular":
        return nannies.filter((nanny) => nanny.rating <= 4.5);
      default:
        return nannies;
    }
  };

  const displayedNannies = filteredNannies()?.slice(0, visibleCount) || [];

  if (status === "loading") return <p>Loading...</p>;
  if (status === "failed") return <p>Error: {error}</p>;

  return (
    <div>
      <Header variant="dark" positionClass={styles.nanniesHeader} />
      <main className={styles.nanniesContainer}>
        <Filter filter={filter} setFilter={setFilter} />
        <NannyList
          displayedNannies={displayedNannies}
          favorites={favorites}
          toggleFavorite={(nanny) => dispatch(toggleFavorite(nanny))}
        />
        {visibleCount < nannies.length && (
          <button className={styles.loadMoreButton} onClick={handleLoadMore}>
            Load more
          </button>
        )}
      </main>
    </div>
  );
};

export default NanniesPage;
