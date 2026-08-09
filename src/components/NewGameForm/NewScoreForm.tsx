import { useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import { MatchDataRow } from "@utils/types";
import { usePostMatchDataPoints } from "@hooks/usePostMatchDataPoints";

const initialFormState = {
  playerName: "",
  gamePoints: 0,
  pointsDescription: ""
};

interface FormErrors {
  playerName?: string;
  gamePoints?: string;
}

export const NewScoreForm = ({
  refetch: handleScoreAdded
}: {
  refetch: () => void;
}) => {
  const { error, loading, postData } = usePostMatchDataPoints();

  const { matchId = 0 } = useParams();
  const [newGameData, setNewGameData] = useState<MatchDataRow>({
    ...initialFormState
  });
  const [errors, setErrors] = useState<FormErrors>({});

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChangeInput = (e: any) => {
    const { name, value } = e.target;
    if(name === "gamePoints" && value === ""){ return; } // if a string is detected, it is detected as an empty string
    const newObject = { [name]: value };
    setNewGameData({ ...newGameData, ...newObject });
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const validate = (): FormErrors => {
    const newErrors: FormErrors = {};
    if (!newGameData.playerName.trim()) {
      newErrors.playerName = "Player Name is required";
    }
    
    return newErrors;
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const prepareObjectForPosting = async (e: any) => {
    e.preventDefault();

    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    await postData(newGameData, matchId);

    setNewGameData({
      ...initialFormState
    });
    handleScoreAdded();
  };

  return (
    <Form onSubmit={prepareObjectForPosting} noValidate>
      <Form.Group controlId="formPlayerName">
        <Form.Label>Player Name:</Form.Label>
        <Form.Control
          type="text"
          placeholder="Player Name"
          name="playerName"
          value={newGameData.playerName}
          onChange={handleChangeInput}
          isInvalid={!!errors.playerName}
        />
        <Form.Control.Feedback type="invalid">
          {errors.playerName}
        </Form.Control.Feedback>

        <Form.Label>Game Points:</Form.Label>
        <Form.Control
          as="input"
          type="number"
          placeholder="Game Points"
          name="gamePoints"
          value={newGameData.gamePoints}
          onChange={handleChangeInput}
          isInvalid={!!errors.gamePoints}
        />
        <Form.Control.Feedback type="invalid">
          {errors.gamePoints}
        </Form.Control.Feedback>

        <Form.Label>Points Description:</Form.Label>
        <Form.Control
          as="textarea"
          placeholder="Points Description"
          name="pointsDescription"
          value={newGameData.pointsDescription}
          onChange={handleChangeInput}
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
