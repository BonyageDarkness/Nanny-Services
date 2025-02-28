import PropTypes from "prop-types";
import NannyCard from "../nannycard/NannyCard";
import styles from "./NannyList.module.css";

const NannyList = ({ displayedNannies, favorites, toggleFavorite }) => {
  return (
    <div className={styles.nanniesList}>
      {displayedNannies.length > 0 ? (
        displayedNannies
          .filter(Boolean) // ✅ Убираем null
          .map((nanny) => {
            return (
              <NannyCard
                key={nanny?.id || nanny?._id || nanny?.name} // 🔥 Проверяем, какой ID у тебя есть
                nanny={nanny}
                favorites={favorites || []}
                toggleFavorite={toggleFavorite}
              />
            );
          })
      ) : (
        <p className={styles.noItems}>There are no items.</p>
      )}
    </div>
  );
};

NannyList.propTypes = {
  displayedNannies: PropTypes.array.isRequired,
  favorites: PropTypes.array.isRequired,
  toggleFavorite: PropTypes.func.isRequired,
};

export default NannyList;
