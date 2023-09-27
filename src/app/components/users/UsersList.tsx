"use client";
import React, {useEffect, useState} from "react";
import {Collapse, ListGroup, ListGroupItem, Row, Col} from "reactstrap";
import styles from "./style.module.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import {MdExpandMore} from "react-icons/md";
import {FiEdit} from "react-icons/fi";
import ModalUser from "./ModalUser";
import HeaderUsers from "./HeaderUsers";
import UserListLoading from "./UserListLoading";

import apiEndpoints from "../../../../config";

export default function UsersList() {
  const [usersList, setUsersList] = useState<User[]>([]);
  const [openUsers, setOpenUsers] = useState<number[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch(apiEndpoints.user).then(res =>
      res.json().then(users => {
        setUsersList(users);
        setLoading(false);
      }),
    );
  }, []);

  const toggleUser = (id: number) => {
    if (openUsers.includes(id)) {
      setOpenUsers(openUsers.filter(userId => userId !== id));
    } else {
      setOpenUsers([...openUsers, id]);
    }
  };

  const handleOpenUserModal = (user: User) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const saveChangesModal = (updatedUser: User, isNew: boolean) => {
    if (isNew) {
      updatedUser.id = usersList.length + 1;
      updatedUser.createdAt = new Date().toISOString();
      setUsersList(prevListUsers => [updatedUser, ...prevListUsers]);
    } else {
      setUsersList(prevListUsers => {
        const updatedListUsers = prevListUsers.map(user => {
          return user.id === updatedUser?.id ? {...updatedUser} : user;
        });
        return updatedListUsers;
      });
    }
    setShowModal(false);
  };

  const handleCloseUserModal = () => {
    setShowModal(false);
  };

  const handleOpenNewUserModal = () => {
    setSelectedUser(null);
    setShowModal(true);
  };

  const isUserOpen = (id: number) => openUsers.includes(id);

  const redirectExternalWebsite = (website: string) => {
    window.open(website, "_blank");
  };

  return (
    <div>
      {loading ? (
        <UserListLoading />
      ) : (
        <div>
          <HeaderUsers handleOpenNewUserModal={handleOpenNewUserModal} />
          <ListGroup>
            {usersList.map((user: User) => (
              <div className={styles.card} key={user.id}>
                <ListGroupItem className={styles.transparentBorder}>
                  <Row>
                    <Col
                      xs="12"
                      md="2"
                      lg="1"
                      className={styles.avatarResponsiveContainer}>
                      <img
                        className={styles.avatarImgCover}
                        src={user.avatar}
                        alt="Avatar"
                      />
                    </Col>
                    <Col
                      xs="12"
                      md="6"
                      lg="7"
                      className={styles.containerUserData}>
                      <div>
                        <div
                          className={styles.titleData}
                          onClick={() => handleOpenUserModal(user)}>
                          {user.name}
                        </div>
                      </div>
                      <div>
                        <div
                          className={styles.subtitleData}
                          onClick={() => redirectExternalWebsite(user.website)}>
                          {user.website}
                        </div>
                      </div>
                    </Col>
                    <Col xs="12" md="2" className={styles.customResponsiveData}>
                      {new Date(user.createdAt).toLocaleString()}
                    </Col>
                    <Col
                      xs="6"
                      md="1"
                      className={styles.customResponsiveButton}>
                      <button
                        className={styles.buttonTransparent}
                        onClick={() => handleOpenUserModal(user)}>
                        {" "}
                        <FiEdit />
                      </button>
                    </Col>
                    <Col
                      xs="6"
                      md="1"
                      className={styles.customResponsiveButton}>
                      <button
                        className={styles.buttonTransparent}
                        onClick={() => toggleUser(user.id)}>
                        <MdExpandMore />
                      </button>
                    </Col>
                  </Row>
                </ListGroupItem>
                <Collapse isOpen={isUserOpen(user.id)}>
                  <ListGroupItem>Description: {user.description}</ListGroupItem>
                </Collapse>
              </div>
            ))}
          </ListGroup>
          <ModalUser
            user={selectedUser}
            showModal={showModal}
            toggleModal={handleCloseUserModal}
            saveChangesModal={saveChangesModal}
          />
        </div>
      )}
    </div>
  );
}
