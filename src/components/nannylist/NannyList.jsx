import PropTypes from "prop-types";
import NannyCard from "../nannycard/NannyCard";
import styles from "./NannyList.module.css";

const NannyList = ({ displayedNannies }) => {
  return (
    <div className={styles.nanniesList}>
      {displayedNannies.length > 0 ? (
        displayedNannies.map((nanny) => (
          <NannyCard
            key={nanny?.id || nanny?._id || nanny?.name}
            nanny={nanny}
          />
        ))
      ) : (
        <p className={styles.noItems}>There are no items.</p>
      )}
    </div>
  );
};

NannyList.propTypes = {
  displayedNannies: PropTypes.array.isRequired,
};

export default NannyList;
