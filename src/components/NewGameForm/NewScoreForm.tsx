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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChangeInput = (e: any) => {
    const { name, value } = e.target;
    const newObject = { [name]: value };
    setNewGameData({ ...newGameData, ...newObject });
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const prepareObjectForPosting = async (e: any) => {
    e.preventDefault();

    await postData(newGameData, matchId);

    setNewGameData({
      ...initialFormState
    });
    handleScoreAdded();
  };

  return (
    <Form onSubmit={prepareObjectForPosting}>
      <Form.Group controlId="formPlayerName">
        <Form.Label>Match Notes:</Form.Label>
        <Form.Control
          type="text"
          placeholder="Player Name"
          name="playerName"
          value={newGameData.playerName}
          onChange={handleChangeInput}
        />

        <Form.Control
          type="number"
          placeholder="Game Points"
          name="gamePoints"
          value={newGameData.gamePoints}
          onChange={handleChangeInput}
        />
        <Form.Control
          type="textarea"
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
