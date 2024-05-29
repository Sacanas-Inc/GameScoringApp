import styles from "../styles/grid-styles.module.scss";
import { Match, MatchDataPoints } from "../utils/types";
export const Grid = ({ games }: { games: MatchDataPoints[] | undefined }) => {
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
        games.map((game: MatchDataPoints) => (
          <div
            key={`${game.id}-${game.playerName}-${game.gamePoints}-${game.pointsDescription}`}
            className={styles.gridRow}
          >
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
