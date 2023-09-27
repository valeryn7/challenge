"use client";
import React from "react";
import {Button, Row, Col} from "reactstrap";
import styles from "./style.module.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import {IoMdAdd} from "react-icons/io";

interface HeaderUsersProps {
  handleOpenNewUserModal: () => void;
}

export default function HeaderUsers({
  handleOpenNewUserModal,
}: HeaderUsersProps) {
  return (
    <Row>
      <Col xs="9" className={styles.title}>
        Current Patients
      </Col>
      <Col xs="3" className={styles.alignEnd}>
        <Button
          className={styles.primaryButton}
          onClick={handleOpenNewUserModal}>
          <IoMdAdd />
          <span className={styles.customResponsiveShowButton}>
            {" "}
            New Patient
          </span>
        </Button>
      </Col>
    </Row>
  );
}
