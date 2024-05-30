import React from "react";
import { PrimeReactProvider } from "primereact/api";
import { GameList } from "./components/GameList/GameList";
import { useGetAllGames } from "./hooks/useGetAllGames";
import { useContext, useEffect } from "react";
import GlobalContext from "./context/globalContext";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { MatchList } from "./components/MatchList/MatchList";
import { MatchScoring } from "./components/MatchScoring/MatchScoring";
function App() {
  const { games } = useGetAllGames();

  const { setGames } = useContext(GlobalContext);

  useEffect(() => {
    setGames(games);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [games]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <GameList />,
    },
    {
      path: "/matches/:id",
      element: <MatchList />,
    },
    {
      path: "/matches/:id/scoring/:matchId",
      element: <MatchScoring />,
    },
  ]);
  return (
    <React.StrictMode>
      <PrimeReactProvider
        value={{
          zIndex: { modal: 1100, toast: 1200, overlay: 1000 },
          autoZIndex: true,
        }}
      >
        <RouterProvider router={router} />
      </PrimeReactProvider>
    </React.StrictMode>
  );
}

export default App;
