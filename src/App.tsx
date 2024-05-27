import { useEffect, useState } from "react";
import { Form } from "./components/Form";
import { Grid } from "./components/Grid";
import GamesComboBox from "./components/GamesComboBox";

import styles from "./styles/grid-styles.module.scss";
import { usePostBoardGames } from "./hooks/usePostBoardGames";
import { useGetBoardGames } from "./hooks/useGetBoardGames";
import { SearchBar } from "./components/SearchBar";
import { BoardGame } from "./utils/types";
import { useDownloadAsCSV } from "./hooks/useDownloadAsCSV";
import { SortByGameId } from "./utils/helpers";

function App() {
  const { postData } = usePostBoardGames();
  const { games, getData } = useGetBoardGames();
  const { downloadFileAsCSV } = useDownloadAsCSV();

  const [filteredGames, setFilteredGames] = useState<BoardGame[] | undefined>(
    []
  );

  useEffect(() => {
    setFilteredGames(SortByGameId(games));
  }, [games]);
  const handleSearch = (searchText: string) => {
    setFilteredGames(
      SortByGameId(
        games?.filter((game) =>
          game.gameName?.toLowerCase().includes(searchText.toLowerCase())
        )
      )
    );
  };

  return (
    <>
      <h1 style={{ textAlign: "center" }}> Game Scoring App </h1>
      <div className={styles.gridContainer}>
        <GamesComboBox />
        <SearchBar handleSearch={handleSearch} />
        <Grid games={filteredGames} />
        <Form
          postData={(newGameData) =>
            postData([newGameData]).then(() => getData())
          }
        />
        <button
          className={styles.formButton}
          onClick={() => downloadFileAsCSV(filteredGames)}
        >
          Download File
        </button>
      </div>
    </>
  );
}

export default App;
