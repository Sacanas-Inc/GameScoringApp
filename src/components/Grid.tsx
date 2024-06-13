import { MatchDataPoints } from "@utils/types";
import styles from "../styles/grid-styles.module.scss";

export const Grid = ({ games }: { games: MatchDataPoints[] | undefined }) => (
  <div className={styles.grid}>
    <div className={styles.gridRow}>
      <div className={styles.gridColumnHeader}>Player Name</div>
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
          <div className={styles.gridCell}>{game.gamePoints}</div>
          <div className={styles.gridCell}>{game.pointsDescription}</div>
        </div>
      ))}
  </div>
);
