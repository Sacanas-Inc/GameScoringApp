import { ReactNode, useState } from "react";
import { Game, Match, MatchDataPoints } from "@utils/types";
import GlobalContext from "./globalContext";

// Define the provider component
export const GlobalContextProvider = ({
  children
}: {
  children: ReactNode;
}) => {
  const [games, setGames] = useState<Game[]>([]);
  const [matches, setMatches] = useState<Match[]>([]);
  const [matchDataPoints, setMatchDataPoints] = useState<MatchDataPoints[]>([]);
  const [selectedGame, setSelectedGame] = useState<number>(-1);
  const [selectedMatch, setSelectedMatch] = useState<number>(-1);

  return (
    <GlobalContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        games,
        matches,
        matchDataPoints,
        selectedGame,
        selectedMatch,
        setMatches,
        setMatchDataPoints,
        setGames,
        setSelectedGame,
        setSelectedMatch
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
