import { useContext } from "react";
import styles from "../../styles/grid-styles.module.scss";
import { Form } from "../Form";
import { Grid } from "../Grid";
import { useDownloadAsCSV } from "../../hooks/useDownloadAsCSV";
import { Match } from "../../utils/types";
import { GlobalContext } from "../../context/globalContext";

export const MatchList = ({
  filteredMatches,
  setFilteredMatches,
}: {
  filteredMatches: Match[];
  setFilteredMatches: any;
}) => {
  const { downloadFileAsCSV } = useDownloadAsCSV();
  const { postData } = useContext(GlobalContext);

  return (
    <div className={styles.gridContainer}>
      <button
        className={styles.formButton}
        onClick={() => setFilteredMatches(undefined)}
      >
        Return to Game List
      </button>
      {/* <GamesComboBox /> */}
      {/* <SearchBar handleSearch={handleSearch} /> */}
      <Grid games={filteredMatches} />
      <Form
        filteredMatches={filteredMatches}
        postData={async (newGameData) => {
          postData([newGameData]);
        }}
      />
      <button
        className={styles.formButton}
        onClick={() => downloadFileAsCSV(filteredMatches)}
      >
        Download File
      </button>
    </div>
  );
};
