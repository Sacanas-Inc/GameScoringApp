import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap"; // Import Bootstrap components
import { usePostGame } from "../hooks/usePostGame";

interface NewGameFormModalProps {
  onClose: () => void;
  onGameAdded: (newGameName: string) => void;
}

const NewGameFormModal: React.FC<NewGameFormModalProps> = ({
  onClose,
  onGameAdded,
}) => {
  const { postGame, loading, error } = usePostGame();
  const [gameName, setGameName] = useState("");
  const [gameDescription, setGameDescription] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const gameData = { gameName, gameDescription };
    await postGame(gameData);
    onClose();
    onGameAdded(gameName);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === "gameName") {
      setGameName(value);
    } else if (name === "gameDescription") {
      setGameDescription(value);
    }
  };

  return (
    <Modal show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Enter Game Name</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formGameName">
            <Form.Label>Game Name:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter game name"
              name="gameName"
              value={gameName}
              onChange={handleInputChange}
            />
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
