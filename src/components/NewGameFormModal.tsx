import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap"; // Import Bootstrap components
import { usePostGame } from "@hooks/usePostGame";

interface NewGameFormModalProps {
  onClose: () => void;
  onGameAdded: (newGameName: string) => void;
}

interface FormErrors {
  gameName?: string;
}

const NewGameFormModal: React.FC<NewGameFormModalProps> = ({
  onClose,
  onGameAdded
}) => {
  const { postGame, loading, error } = usePostGame();
  const [gameName, setGameName] = useState("");
  const [gameDescription, setGameDescription] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});

  const validate = (): FormErrors => {
    const newErrors: FormErrors = {};
    if (!gameName.trim()) {
      newErrors.gameName = "Game Name is required";
    }
    return newErrors;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    const gameData = { gameName, gameDescription };
    await postGame(gameData);
    onClose();
    onGameAdded(gameName);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === "gameName") {
      setGameName(value);
      setErrors((prev) => ({ ...prev, gameName: undefined }));
    } else if (name === "gameDescription") {
      setGameDescription(value);
    }
  };

  return (
    <Modal show onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Enter Game Name</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit} noValidate>
          <Form.Group controlId="formGameName">
            <Form.Label>Game Name:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter game name"
              name="gameName"
              value={gameName}
              onChange={handleInputChange}
              isInvalid={!!errors.gameName}
            />
            <Form.Control.Feedback type="invalid">
              {errors.gameName}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="formGameDescription">
            <Form.Label>Game Description (optional):</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter game description"
              name="gameDescription"
              value={gameDescription}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Button variant="primary" type="submit" disabled={loading}>
            Submit
          </Button>
          {loading && <p>Loading...</p>}
          {error && <p>Error: {error}</p>}
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default NewGameFormModal;
