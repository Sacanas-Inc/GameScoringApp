import React, { useContext, useEffect } from "react";
import { PrimeReactProvider } from "primereact/api";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { GameList } from "@components/GameList/GameList";
import { useGetAllGames } from "@hooks/useGetAllGames";
import { MatchList } from "@components/MatchList/MatchList";
import { MatchScoring } from "@components/MatchScoring/MatchScoring";
import GlobalContext from "./context/globalContext";

function App() {
  const { games } = useGetAllGames();

  const { setGames } = useContext(GlobalContext);

  useEffect(() => {
    setGames(games);
  }, [games]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <GameList />
    },
    {
      path: "/matches/:id",
      element: <MatchList />
    },
    {
      path: "/matches/:id/scoring/:matchId",
      element: <MatchScoring />
    }
  ]);
  return (
    <React.StrictMode>
      <PrimeReactProvider
        value={{
          zIndex: { modal: 1100, toast: 1200, overlay: 1000 },
          autoZIndex: true,
          pt: {
            confirmdialog: {
              root: {
                onClick: (e) => e.stopPropagation()
              },
              closeButton: {
                onClick: (e) => e.stopPropagation()
              },
              acceptButton: {
                root: { onClick: (e) => e.stopPropagation() }
              },
              rejectButton: {
                root: { onClick: (e) => e.stopPropagation() }
              }
            },
            dialog: {
              mask: { onClick: (e) => e.stopPropagation() },
              root: { onClick: (e) => e.stopPropagation() }
            }
          }
        }}
      >
        <RouterProvider router={router} />
      </PrimeReactProvider>
    </React.StrictMode>
  );
}

export default App;
