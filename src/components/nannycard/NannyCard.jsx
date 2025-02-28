import { useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  saveFavorite,
  removeFavorite,
} from "../../redux/favorites/favoritesOperations";
import {
  toggleFavorite,
  selectFavorites,
} from "../../redux/favorites/favoritesSlice";

import PropTypes from "prop-types";
import styles from "./NannyCard.module.css";
import sprite from "../../images/sprites.svg";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const calculateAge = (birthday) => {
  const birthDate = new Date(birthday);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
};

const calculateAverageRating = (reviews) => {
  if (!reviews || reviews.length === 0) return "N/A";

  const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
  return totalRating / reviews.length.toFixed(1);
};

const NannyCard = ({ nanny }) => {
  const dispatch = useDispatch();
  const favorites = useSelector(selectFavorites);
  const { user } = useAuth();

  const nannyId = nanny.id || nanny._id || nanny.name;

  const isFavorite = useMemo(() => {
    if (!nannyId) return false;
    return favorites.some((fav) => fav?.id === nannyId);
  }, [favorites, nannyId]);

  const handleFavoriteClick = () => {
    if (!user) {
      toast.warn("You need to be logged in to add favorites!", {
        position: "top-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
      return;
    }

    dispatch(toggleFavorite({ ...nanny, id: nannyId }));

    if (isFavorite) {
      dispatch(removeFavorite({ userId: user.uid, nannyId }));
    } else {
      dispatch(
        saveFavorite({ userId: user.uid, nanny: { ...nanny, id: nannyId } })
      );
    }
  };

  const favoriteIcon = user
    ? isFavorite
      ? "#heart-green"
      : "#heart"
    : "#heart";

  const [isReadMoreVisible, setIsReadMoreVisible] = useState(false);
  const toggleReadMore = () => {
    setIsReadMoreVisible(!isReadMoreVisible);
  };

  if (!nannyId) {
    return <p>Loading nanny data...</p>;
  }

  return (
    <div className={styles.card}>
      <div className={styles.border}>
        <img
          src={nanny.avatar_url || "default-avatar.png"}
          alt={nanny.name || "Nanny"}
          className={styles.cardImage}
        />
        <svg className={styles.green}>
          <use href={`${sprite}#Group-82-green`} />
        </svg>
      </div>
      <div className={styles.cardContent}>
        <div className={styles.cardTop}>
          <p className={styles.nanny}>Nanny</p>

          <div className={styles.cardHeader}>
            <div className={styles.cardTextBlack}>
              <svg className={styles.icon} style={{ marginRight: "8px" }}>
                <use href={`${sprite}#map-pin`} />
              </svg>
              {nanny.location || "Unknown"}
            </div>

            <svg
              className={styles.icon}
              style={{
                margin: "0 16px",
                strokeWidth: "1px",
                stroke: "rgba(17, 16, 28, 0.20)",
              }}
            >
              <use href={`${sprite}#l`} />
            </svg>

            <div className={styles.cardTextBlack}>
              <svg className={styles.icon} style={{ marginRight: "8px" }}>
                <use href={`${sprite}#star`} />
              </svg>
              Rating: {calculateAverageRating(nanny.reviews)}
            </div>

            <svg
              className={styles.icon}
              style={{
                margin: "0 16px",
                strokeWidth: "1px",
                stroke: "rgba(17, 16, 28, 0.20)",
              }}
            >
              <use href={`${sprite}#l`} />
            </svg>

            <div className={styles.cardTextBlack}>
              Price / 1 hour:{" "}
              {nanny.price_per_hour ? (
                <span style={{ color: "#38CD3E" }}>
                  {nanny.price_per_hour}$
                </span>
              ) : (
                "N/A"
              )}
            </div>

            <button className={styles.cardButton} onClick={handleFavoriteClick}>
              <svg className={styles.iconHeart}>
                <use href={`${sprite}${favoriteIcon}`} />
              </svg>
            </button>
          </div>
        </div>

        <h3 className={styles.cardTitle}>{nanny.name || "Unknown"}</h3>
        <div className={styles.nannyExp}>
          <p className={styles.cardItem}>
            <span className={styles.cardTextGray}>Age:</span>{" "}
            <span className={styles.cardTextBlack}>
              {nanny.birthday ? `${calculateAge(nanny.birthday)} years` : "N/A"}
            </span>
          </p>

          <p className={styles.cardItem}>
            <span className={styles.cardTextGray}>Experience:</span>{" "}
            <span className={styles.cardTextBlack}>
              {nanny.experience ? `${nanny.experience} years` : "N/A"}
            </span>
          </p>

          <p className={styles.cardItem}>
            <span className={styles.cardTextGray}>Kids Age:</span>{" "}
            <span className={styles.cardTextBlack}>
              {nanny.kids_age || "N/A"}
            </span>
          </p>

          <p className={styles.cardItem}>
            <span className={styles.cardTextGray}>Characters:</span>{" "}
            <span className={styles.cardTextBlack}>
              {nanny.characters ? nanny.characters.join(", ") : "N/A"}
            </span>
          </p>

          <p className={styles.cardItem}>
            <span className={styles.cardTextGray}>Education:</span>{" "}
            <span className={styles.cardTextBlack}>
              {nanny.education || "N/A"}
            </span>
          </p>
        </div>

        <p className={styles.cardTextAbout}>
          {nanny.about || "No description"}
        </p>

        {!isReadMoreVisible && (
          <button
            className={styles.cardButtonReadMore}
            onClick={toggleReadMore}
          >
            Read more
          </button>
        )}

        {isReadMoreVisible && nanny.reviews && nanny.reviews.length > 0 && (
          <div>
            <h4>Reviews:</h4>
            {nanny.reviews.map((review, index) => (
              <div key={index} className={styles.review}>
                <div className={styles.reviewer}>
                  {/* Circle with the first letter */}
                  <span className={styles.reviewerAvatar}>
                    {review.reviewer[0].toUpperCase()}
                  </span>
                  <div className={styles.reviewerInfo}>
                    <p className={styles.reviewerName}>{review.reviewer}</p>
                    {/* Rating and Star */}
                    <div className={styles.reviewerRating}>
                      <svg
                        className={styles.icon}
                        style={{ marginRight: "8px" }}
                      >
                        <use href={`${sprite}#star`} />
                      </svg>
                      {review.rating}.0
                    </div>
                  </div>
                </div>

                <p className={styles.reviewText}>{review.comment}</p>
              </div>
            ))}
            <button className={styles.cardButtonMake}>
              Make an appointment
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

NannyCard.propTypes = {
  nanny: PropTypes.shape({
    id: PropTypes.string,
    _id: PropTypes.string,
    avatar_url: PropTypes.string,
    name: PropTypes.string,
    birthday: PropTypes.string,
    experience: PropTypes.string,
    location: PropTypes.string,
    price_per_hour: PropTypes.number,
    about: PropTypes.string,
    characters: PropTypes.arrayOf(PropTypes.string),
    education: PropTypes.string,
    kids_age: PropTypes.string,
    reviews: PropTypes.arrayOf(
      PropTypes.shape({
        comment: PropTypes.string,
        reviewer: PropTypes.string,
        rating: PropTypes.number,
      })
    ),
  }).isRequired,
};

export default NannyCard;
