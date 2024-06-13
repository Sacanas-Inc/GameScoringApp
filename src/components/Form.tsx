import { useState } from "react";
import { useParams } from "react-router-dom";
import { usePostMatchDataPoints } from "@hooks/usePostMatchDataPoints";
import { MatchDataRow } from "@utils/types";
import styles from "../styles/grid-styles.module.scss";

const initialFormState = {
  playerName: "",
  gamePoints: 0,
  pointsDescription: ""
};

export const Form = ({ refetch }: { refetch: () => void }) => {
  const { postData } = usePostMatchDataPoints();

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
