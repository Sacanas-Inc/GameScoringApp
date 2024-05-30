import { useState } from "react";
import { MatchDataRow } from "../utils/types";
import styles from "../styles/grid-styles.module.scss";
import { usePostMatchDataPoints } from "../hooks/usePostMatchDataPoints";
import { useParams } from "react-router-dom";

const initialFormState = {
  playerName: "",
  gamePoints: 0,
  pointsDescription: "",
};

export const Form = ({ refetch }: { refetch: () => void }) => {
  const { postData } = usePostMatchDataPoints();

  const { matchId = 0 } = useParams();
  const [newGameData, setNewGameData] = useState<MatchDataRow>({
    ...initialFormState,
  });

  const handleChangeInput = (e: any) => {
    const { name, value } = e.target;
    const newObject = { [name]: value };
    setNewGameData({ ...newGameData, ...newObject });
  };

  const prepareObjectForPosting = async (e: any) => {
    e.preventDefault();

    await postData(newGameData, matchId);

    setNewGameData({
      ...initialFormState,
    });
    refetch();
  };

  return (
    <form onSubmit={prepareObjectForPosting}>
      <div className={styles.form}>
        <input
          onChange={handleChangeInput}
          type="text"
          placeholder="Player Name"
          name="playerName"
          className={styles.formField}
          value={newGameData.playerName}
        />
        <input
          onChange={handleChangeInput}
          type="number"
          placeholder="Game Points"
          name="gamePoints"
          className={styles.formField}
          value={newGameData.gamePoints}
        />
        <input
          onChange={handleChangeInput}
          type="text"
          placeholder="Points Description"
          name="pointsDescription"
          className={styles.formField}
          value={newGameData.pointsDescription}
        />
      </div>

      <button type="submit" className={styles.formButton}>
        Post Data
      </button>
    </form>
  );
};
