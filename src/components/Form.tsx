import { useState } from "react";
import { Match } from "../utils/types";
import styles from "../styles/grid-styles.module.scss";

const initialFormState = {
  playerName: "",
  gameId: "",
  gameName: "",
  matchId: "",
  gamePoints: 0,
  pointsDescription: "",
};

export const Form = ({
  filteredMatches,
  postData,
}: {
  filteredMatches: Match[];
  postData: (params: Match) => Promise<void>;
}) => {
  const [newGameData, setNewGameData] = useState<Match>(
    filteredMatches.length > 0
      ? { ...initialFormState, gameId: filteredMatches[0].gameId }
      : initialFormState
  );

  const AddGame = (e: any) => {
    const { name, value } = e.target;
    const newObject = { [name]: value };
    setNewGameData({ ...newGameData, ...newObject });
  };

  const prepareObjectForPosting = (e: any) => {
    e.preventDefault();
    postData(newGameData);
    setNewGameData(initialFormState);
  };

  return (
    <form onSubmit={prepareObjectForPosting}>
      <div className={styles.form}>
        <input
          onChange={AddGame}
          type="text"
          placeholder="Player Name"
          name="playerName"
          className={styles.formField}
          value={newGameData.playerName}
        />
        <input
          disabled={filteredMatches.length > 0}
          onChange={AddGame}
          type="text"
          placeholder="Game Id"
          name="gameId"
          className={styles.formField}
          value={newGameData.gameId}
        />
        <input
          onChange={AddGame}
          type="text"
          placeholder="Game Name"
          name="gameName"
          className={styles.formField}
          value={newGameData.gameName}
        />
        <input
          onChange={AddGame}
          type="text"
          placeholder="Match Id"
          name="matchId"
          className={styles.formField}
          value={newGameData.matchId}
        />
        <input
          onChange={AddGame}
          type="number"
          placeholder="Game Points"
          name="gamePoints"
          className={styles.formField}
          value={newGameData.gamePoints}
        />
        <input
          onChange={AddGame}
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
