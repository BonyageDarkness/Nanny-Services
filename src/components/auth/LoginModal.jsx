import PropTypes from "prop-types";
import { useState } from "react";
import styles from "./Auth.module.css";
import sprite from "../../images/sprites.svg";
import Modal from "../ui/Modal";
import { useAuth } from "../../context/AuthContext";

const LoginModal = ({ isOpen, onClose }) => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(""); // Ошибка

  const handleLogin = async () => {
    try {
      await login(email, password);
      onClose();
    } catch {
      setError("Invalid email or password");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={styles.authContainer}>
        <div className={styles.authText}>
          <h2>Log In</h2>
          <p>Welcome back! Please enter your credentials.</p>
        </div>

        <div className={styles.authInput}>
          {error && <p className={styles.errorText}>{error}</p>}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className={styles.passwordWrapper}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className={styles.eyeButton}
              onClick={() => setShowPassword((prev) => !prev)}
            >
              <svg className={styles.eyeIcon}>
                <use
                  href={`${sprite}#${showPassword ? "eye" : "eye-off"}`}
                  strokeWidth="2"
                />
              </svg>
            </button>
          </div>
        </div>

        <button className={styles.authBtn} onClick={handleLogin}>
          Log In
        </button>
      </div>
    </Modal>
  );
};

LoginModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default LoginModal;
