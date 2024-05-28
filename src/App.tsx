import { usePostBoardGames } from "./hooks/usePostBoardGames";
import { useGetMatchGames } from "./hooks/useGetMatchGames";
import { GameList } from "./components/GameList";
import { GlobalContext } from "./context/globalContext";
import { useFetchAllGames } from "./hooks/useFetchAllGames";

function App() {
  const { postData } = usePostBoardGames();
  const { matches } = useGetMatchGames();
  const { games, refetchGames } = useFetchAllGames();

  /*  useEffect(() => {
    setFilteredGames(SortByGameId(games));
  }, [games]); */
  /*  const handleSearch = (searchText: string) => {
    setFilteredGames(
      SortByGameId(
        games?.filter((game) =>
          game.gameName?.toLowerCase().includes(searchText.toLowerCase())
        )
      )
    );
  }; */

  return (
    <>
      <h1 style={{ textAlign: "center" }}> Game Scoring App </h1>
      <GlobalContext.Provider
        value={{ games, matches, refetchGames, postData }}
      >
        <GameList />
      </GlobalContext.Provider>
    </>
  );
}

export default App;
