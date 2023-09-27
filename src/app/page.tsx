import React from "react";
import styles from "./style.module.scss";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.containerImage}>
        <div className={styles.image}>
          <div className={styles.text}>Welcome to Challenge</div>
        </div>
      </div>
      <div> This is a sample application for the Frontend Challenge.</div>
    </main>
  );
}
