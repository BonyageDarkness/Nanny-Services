import PropTypes from "prop-types";
import styles from "./Filters.module.css";
import sprite from "../../images/sprites.svg";

const Filter = ({ filter, setFilter }) => {
  return (
    <div className={styles.filterContainer}>
      <label htmlFor="filter">Filters</label>
      <select
        id="filter"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      >
        <option value="A to Z">A to Z</option>
        <option value="Z to A">Z to A</option>
        <option value="Less than 10$">Less than 10$</option>
        <option value="Greater than 10$">Greater than 10$</option>
        <option value="Popular">Popular</option>
        <option value="Not popular">Not popular</option>
        <option value="Show all">Show all</option>
      </select>
      <svg className={styles.chevron}>
        <use href={`${sprite}#chevron-down`}></use>
      </svg>
    </div>
  );
};

Filter.propTypes = {
  filter: PropTypes.string.isRequired,
  setFilter: PropTypes.func.isRequired,
};

export default Filter;
