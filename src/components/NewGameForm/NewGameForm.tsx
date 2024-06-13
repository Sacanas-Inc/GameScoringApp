import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { usePostGame } from "@hooks/usePostGame";
import { Game } from "@utils/types";

export const NewGameForm = ({
  handleClose,
  handleGameAdded
}: {
  handleClose: () => void;
  handleGameAdded: (newGameName: Game) => void;
}) => {
  const [gameName, setGameName] = useState("");
  const [gameDescription, setGameDescription] = useState("");
  const { postGame, loading, error } = usePostGame();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const gameData = { gameName, gameDescription };
    const newGameData = await postGame(gameData);
    handleGameAdded(newGameData);
    handleClose();
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
  );
};
