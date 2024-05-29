import { useContext, useState } from "react";
import { MatchDataPoints } from "../utils/types";
import styles from "../styles/grid-styles.module.scss";
import GlobalContext from "../context/globalContext";
import { usePostNewMatchRow } from "../hooks/usePostNewMatchRow";

const initialFormState = {
  playerName: "",
  gameId: -1,
  gameName: "",
  matchId: -1,
  gamePoints: 0,
  pointsDescription: "",
};

export const Form = () => {
  const { selectedGame, selectedMatch, matchDataPoints, setMatchDataPoints } =
    useContext(GlobalContext);

  const { postData } = usePostNewMatchRow();
  const [newGameData, setNewGameData] = useState<MatchDataPoints>({
    ...initialFormState,
    gameId: selectedGame,
    matchId: selectedMatch,
  });

  const handleChangeInput = (e: any) => {
    const { name, value } = e.target;
    const newObject = { [name]: value };
    setNewGameData({ ...newGameData, ...newObject });
  };

  const prepareObjectForPosting = async (e: any) => {
    e.preventDefault();
    const newData = await postData(newGameData);
    setNewGameData({
      ...initialFormState,
      gameId: selectedGame,
      matchId: selectedMatch,
    });
    setMatchDataPoints([...matchDataPoints, newData]);
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
          disabled={selectedGame >= 0}
          onChange={handleChangeInput}
          type="text"
          placeholder="Game Id"
          name="gameId"
          className={styles.formField}
          value={selectedGame}
        />
        <input
          onChange={handleChangeInput}
          type="text"
          placeholder="Game Name"
          name="gameName"
          className={styles.formField}
          value={newGameData.gameName}
        />
        <input
          disabled={selectedMatch >= 0}
          onChange={handleChangeInput}
          type="text"
          placeholder="Match Id"
          name="matchId"
          className={styles.formField}
          value={selectedMatch}
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
