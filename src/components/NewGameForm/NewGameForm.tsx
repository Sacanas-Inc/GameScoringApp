import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { usePostGame } from "@hooks/usePostGame";
import { Game } from "@utils/types";

interface FormErrors {
  gameName?: string;
}

export const NewGameForm = ({
  handleClose,
  handleGameAdded
}: {
  handleClose: () => void;
  handleGameAdded: (newGameName: Game) => void;
}) => {
  const [gameName, setGameName] = useState("");
  const [gameDescription, setGameDescription] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const { postGame, loading, error } = usePostGame();

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
    const newGameData = await postGame(gameData);
    handleGameAdded(newGameData);
    handleClose();
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
  );
};
