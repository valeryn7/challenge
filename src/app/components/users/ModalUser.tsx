import React from "react";
import {Modal, ModalBody, ModalHeader} from "reactstrap";
import FormUser from "./FormUser";

interface ModalUserProps {
  user: User | null;
  showModal: boolean;
  toggleModal: () => void;
  saveChangesModal: (user: User, isNew: boolean) => void;
}

export default function ModalUser({
  user = null,
  showModal = false,
  toggleModal,
  saveChangesModal,
}: ModalUserProps) {
  return (
    <div>
      <Modal isOpen={showModal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>
          {user === null ? "Create New User" : "Modify Existing User"}
        </ModalHeader>
        <ModalBody>
          <FormUser
            user={user}
            saveChangesModal={saveChangesModal}
            toggleModal={toggleModal}
          />
        </ModalBody>
      </Modal>
    </div>
  );
}
