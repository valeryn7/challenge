import React, {ChangeEvent, useEffect, useState} from "react";
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  FormFeedback,
  InputGroup,
  Row,
  Col,
} from "reactstrap";
import {AiOutlineSend} from "react-icons/ai";
import styles from "./style.module.scss";
import "bootstrap/dist/css/bootstrap.min.css";

interface FormUserProps {
  user: User | null;
  saveChangesModal: (user: User, isNew: boolean) => void;
  toggleModal: () => void;
}

export default function FormUser({
  user = null,
  saveChangesModal,
  toggleModal,
}: FormUserProps) {
  const [userForm, setUserForm] = useState<User>({
    id: 0,
    name: "",
    avatar: "",
    website: "",
    createdAt: "",
    description: "",
  });
  const [userFromErrors, setUserFormErrors] = useState<Partial<User>>({});
  const [editingAvatar, setEditingAvatar] = useState<boolean>(false);
  const [isNewUser, setIsNewUser] = useState<boolean>(false);

  useEffect(() => {
    if (user) {
      setUserForm(user);
    } else {
      setEditingAvatar(true);
      setIsNewUser(true);
    }
  }, [user]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserForm({
      ...userForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    const errors: Partial<User> = {};
    if (!userForm.name) {
      errors.name = "Name is required";
    }
    if (!userForm.website) {
      errors.website = "Website is required";
    }
    if (!userForm.description) {
      errors.description = "Description is required";
    }
    if (!userForm.avatar) {
      errors.avatar = "Avatar URL is required";
    }
    setUserFormErrors(errors);

    if (Object.keys(errors).length == 0) {
      saveChangesModal(userForm, isNewUser);
    }
  };

  const handleAvatarClick = () => {
    setEditingAvatar(true);
  };

  const handleUpdateAvatar = () => {
    const errors: Partial<User> = {};
    if (!userForm.avatar) {
      errors.avatar = "Avatar URL is required";
    }
    setUserFormErrors(errors);

    if (Object.keys(errors).length == 0) {
      setEditingAvatar(false);
    }
  };

  return (
    <Form>
      <FormGroup>
        {editingAvatar ? (
          <div>
            <Label for="avatar">Avatar URL</Label>
            <InputGroup>
              <Input
                type="text"
                id="avatar"
                name="avatar"
                value={userForm.avatar}
                onChange={handleInputChange}
                invalid={!!userFromErrors.avatar}
              />
              <Button onClick={handleUpdateAvatar}>
                <AiOutlineSend />
              </Button>
            </InputGroup>
            <FormFeedback>{userFromErrors.avatar}</FormFeedback>
          </div>
        ) : (
          <div className={styles.alignCenter}>
            <div className={styles.avatarContainerEdit}>
              <img
                className={styles.avatarEdit}
                src={userForm.avatar}
                alt="Avatar"
                onClick={handleAvatarClick}
              />
            </div>
          </div>
        )}
      </FormGroup>

      <FormGroup>
        <Label for="name">Name</Label>
        <Input
          type="text"
          id="name"
          name="name"
          value={userForm.name}
          onChange={handleInputChange}
          invalid={!!userFromErrors.name}
        />
        <FormFeedback>{userFromErrors.name}</FormFeedback>
      </FormGroup>

      <FormGroup>
        <Label for="website">Website</Label>
        <Input
          type="text"
          id="website"
          name="website"
          value={userForm.website}
          onChange={handleInputChange}
          invalid={!!userFromErrors.website}
        />
        <FormFeedback>{userFromErrors.website}</FormFeedback>
      </FormGroup>

      <FormGroup>
        <Label for="description">Description</Label>
        <Input
          type="textarea"
          id="description"
          name="description"
          value={userForm.description}
          onChange={handleInputChange}
          invalid={!!userFromErrors.description}
        />
        <FormFeedback>{userFromErrors.description}</FormFeedback>
      </FormGroup>

      <Row>
        <Col xs="9" md="10" className={styles.alignEnd}>
          <Button
            className={styles.secondaryButton}
            onClick={() => toggleModal()}>
            Cancel
          </Button>
        </Col>
        <Col xs="3" md="2" className={styles.alignEnd}>
          <Button
            className={styles.primaryButton}
            onClick={() => handleSubmit()}>
            Submit
          </Button>
        </Col>
      </Row>
    </Form>
  );
}
