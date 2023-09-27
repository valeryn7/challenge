import React from "react";
import styles from "./style.module.scss";
import {Spinner} from "reactstrap";

export default function UserListLoading() {
  return (
    <div className={styles.containerSpinner}>
      <Spinner className={styles.spinner} type="grow" />
    </div>
  );
}
