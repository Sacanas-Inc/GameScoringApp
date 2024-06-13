import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Match } from "@utils/types";
import { usePostMatch } from "@hooks/usePostMatch";

export const NewMatchForm = ({
  gameId,
  handleClose,
  handleMatchAdded
}: {
  gameId: number;
  handleClose: () => void;
  handleMatchAdded: (newGameName: Match) => void;
}) => {
  const [matchNotes, setMatchNotes] = useState("");
  const { postMatch, loading, error } = usePostMatch();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const matchData = {
      gameId,
      notes: matchNotes
    };
    const newMatchData = await postMatch(matchData);
    handleMatchAdded(newMatchData);
    handleClose();
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setMatchNotes(value);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formMatchNotes">
        <Form.Label>Match Notes:</Form.Label>
        <Form.Control
          type="textarea"
          placeholder="Enter notes"
          name="matchNotes"
          value={matchNotes}
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
