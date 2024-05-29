import { GameList } from "./components/GameList/GameList";
import { useGetGamesAndMatches } from "./hooks/useGetGamesAndMatches";
import { useContext, useEffect } from "react";
import GlobalContext from "./context/globalContext";

function App() {
  const { games } = useGetGamesAndMatches();

  const { setGames } = useContext(GlobalContext);

  useEffect(() => {
    setGames(games);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [games]);

  return (
    <>
      <h1 style={{ textAlign: "center" }}> Game Scoring App </h1>
      <GameList />
    </>
  );
}

export default App;
