import React from "react";
import styles from "./style.module.scss";
import UsersList from "../components/users/UsersList";

const fetchUsers = () => {
  return fetch("https://63bedcf7f5cfc0949b634fc8.mockapi.io/users").then(res =>
    res.json(),
  );
};

export default async function Users() {
  const users: User[] = await fetchUsers();

  return (
    <div className={styles.body}>
      <div className={styles.container}>
        <UsersList users={users} />
      </div>
    </div>
  );
}
