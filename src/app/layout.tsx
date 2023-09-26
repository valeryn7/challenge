import React from "react";
import styles from "./style.module.scss";
import Sidebar from "../components/Sidebar";

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body className={styles.body}>
        <Sidebar />
        <div className={styles.children}>{children}</div>
      </body>
    </html>
  );
}
