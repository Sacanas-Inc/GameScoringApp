import styles from "../styles/grid-styles.module.scss";
import { Match } from "../utils/types";
export const Grid = ({ games }: { games: Match[] | undefined }) => {
  return (
    <div className={styles.grid}>
      <div className={styles.gridRow}>
        <div className={styles.gridColumnHeader}>Player Name</div>
        <div className={styles.gridColumnHeader}>Game Id</div>
        <div className={styles.gridColumnHeader}>Game Name</div>
        <div className={styles.gridColumnHeader}>Match Id</div>
        <div className={styles.gridColumnHeader}>Game Points</div>
        <div className={styles.gridColumnHeader}>Points Description</div>
      </div>
      {games !== undefined &&
        games.map((game: Match) => (
          <div key={game.id} className={styles.gridRow}>
            <div className={styles.gridCell}>{game.playerName}</div>
            <div className={styles.gridCell}>{game.gameId}</div>
            <div className={styles.gridCell}>{game.gameName}</div>
            <div className={styles.gridCell}>{game.matchId}</div>
            <div className={styles.gridCell}>{game.gamePoints}</div>
            <div className={styles.gridCell}>{game.pointsDescription}</div>
          </div>
        ))}
    </div>
  );
};
