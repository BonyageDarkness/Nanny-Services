import { Link } from "react-router-dom";
import styles from "./Home.module.css";
import sprite from "../../images/sprites.svg";
import babyImage1x from "../../images/baby.jpg";
import babyImage2x from "../../images/baby@2x.jpg";
import Header from "../../components/header/Header";

const Home = () => {
  return (
    <div className={styles.homeContainer}>
      <Header />

      <main className={styles.home}>
        <div className={styles.homeContent}>
          <h1>Make Life Easier for the Family:</h1>
          <p>Find Babysitters Online for All Occasions</p>

          <Link to="/nannies" className={styles.btnPrimary}>
            Get started
            <svg className={styles.iconArrow}>
              <use href={`${sprite}#Arrow-16`} />
            </svg>
          </Link>
        </div>
        <div className={styles.homeImage}>
          <img
            src={babyImage1x}
            srcSet={`${babyImage2x} 2x`}
            alt="Baby with nanny"
          />

          <div className={styles.statsBox}>
            <div className={styles.greenBox}>
              <svg className={styles.iconCheck}>
                <use href={`${sprite}#fe_check`} />
              </svg>
            </div>
            <div className={styles.textBox}>
              <span>Experienced nannies</span>
              <strong>15,000</strong>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
