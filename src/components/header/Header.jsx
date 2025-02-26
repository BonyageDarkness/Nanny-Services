import { Link } from "react-router-dom";
import { useModal } from "../../context/ModalContext";
import { useAuth } from "../../context/AuthContext"; // Импортируем AuthContext
import styles from "./Header.module.css";

const Header = () => {
  const { setIsLoginOpen, setIsRegisterOpen } = useModal();
  const { user, logout } = useAuth(); // Получаем user и logout

  return (
    <header className={styles.header}>
      <div className={styles.logo}>Nanny.Services</div>
      <div className={styles.navbtn}>
        <nav className={styles.nav}>
          <Link to="/" className={styles.link}>
            Home
          </Link>
          <Link to="/nannies" className={styles.link}>
            Nannies
          </Link>
        </nav>

        <div className={styles.authButtons}>
          {user ? (
            <button className={styles.logoutBtn} onClick={logout}>
              Log Out
            </button>
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

export default Header;
