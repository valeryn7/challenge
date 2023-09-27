import React from "react";
import styles from "./style.module.scss";
import UsersList from "../components/users/UsersList";

export default function Users() {
  return (
    <div className={styles.body}>
      <div className={styles.container}>
        <UsersList />
      </div>
    </div>
  );
}
