import { useContext } from "react";
import styles from "../../styles/grid-styles.module.scss";
import { Form } from "../Form";
import { Grid } from "../Grid";
import { useDownloadAsCSV } from "../../hooks/useDownloadAsCSV";
import GlobalContext from "../../context/globalContext";

export const MatchScoring = ({
  showGrid,
}: {
  showGrid: (show: boolean) => void;
}) => {
  const { downloadFileAsCSV } = useDownloadAsCSV();
  const { matchDataPoints, setMatchDataPoints } = useContext(GlobalContext);

  return (
    <>
      <button
        className={styles.returnButton}
        onClick={() => {
          setMatchDataPoints([]);
          showGrid(false);
        }}
      >
        {"<"}
      </button>
      <div className={styles.gridContainer}>
        {/* <GamesComboBox /> */}
        {/* <SearchBar handleSearch={handleSearch} /> */}
        <Grid games={matchDataPoints} />
        <Form />
        <button
          className={styles.formButton}
          onClick={() => downloadFileAsCSV(matchDataPoints)}
        >
          Download File
        </button>
      </div>
    </>
  );
};
