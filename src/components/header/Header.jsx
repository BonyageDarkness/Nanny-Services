import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useModal } from "../../context/ModalContext";
import { useAuth } from "../../context/AuthContext";
import styles from "./Header.module.css";
import sprite from "../../images/sprites.svg"; // Импортируем спрайт

const Header = ({ variant = "light", positionClass = "" }) => {
  const { setIsLoginOpen, setIsRegisterOpen } = useModal();
  const { user, logout } = useAuth();

  return (
    <header
      className={`${styles.header} ${
        variant === "dark" ? styles.darkHeader : ""
      } ${positionClass}`.trim()}
    >
      <div className={styles.logo}>Nanny.Services</div>
      <div className={styles.navbtn}>
        <nav className={styles.nav}>
          <Link to="/" className={styles.link}>
            Home
          </Link>
          <Link to="/nannies" className={styles.link}>
            Nannies
          </Link>
          {user && (
            <Link to="/favorites" className={styles.link}>
              Favorites
            </Link>
          )}
        </nav>
        <div className={styles.authButtons}>
          {user ? (
            <div className={styles.userSection}>
              <div className={styles.userIconWrapper}>
                <svg className={styles.userIcon}>
                  <use href={`${sprite}#mdi_user`} />
                </svg>
              </div>
              <span className={styles.userName}>
                {user.displayName || "User"}
              </span>
              <button className={styles.logoutBtn} onClick={logout}>
                Log Out
              </button>
            </div>
          ) : (
            <>
              <button
                className={styles.loginBtn}
                onClick={() => setIsLoginOpen(true)}
              >
                Log In
              </button>
              <button
                className={styles.registerBtn}
                onClick={() => setIsRegisterOpen(true)}
              >
                Registration
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  variant: PropTypes.oneOf(["light", "dark"]),
  positionClass: PropTypes.string,
};

export default Header;
