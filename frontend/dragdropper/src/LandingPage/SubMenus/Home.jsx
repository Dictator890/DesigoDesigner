import React from "react";
import styles from "./Home.module.css";
function Home({ match }) {
  return (
    <div className={styles.home}>
      <div className={styles.row}></div>
      <div className={styles.row}></div>
    </div>
  );
}
export default Home;
