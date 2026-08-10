import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Match } from "@utils/types";
import { usePostMatch } from "@hooks/usePostMatch";

interface FormErrors {
  matchNotes?: string;
}

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
  const [errors, setErrors] = useState<FormErrors>({});
  const { postMatch, loading, error } = usePostMatch();

  const validate = (): FormErrors => ({});

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
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
    <Form onSubmit={handleSubmit} noValidate>
      <Form.Group controlId="formMatchNotes">
        <Form.Label>Match Notes:</Form.Label>
        <Form.Control
          type="textarea"
          placeholder="Enter notes"
          name="matchNotes"
          value={matchNotes}
          onChange={handleInputChange}
          isInvalid={!!errors.matchNotes}
        />
        <Form.Control.Feedback type="invalid">
          {errors.matchNotes}
        </Form.Control.Feedback>
      </Form.Group>
      <Button variant="primary" type="submit" disabled={loading}>
        Submit
      </Button>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
    </Form>
  );
};
