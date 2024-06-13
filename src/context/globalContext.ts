/* eslint-disable @typescript-eslint/no-empty-function */
import React, { createContext } from "react";
import { Game, Match, MatchDataPoints } from "@utils/types";

// Define the shape of the context data
interface GlobalContextProps {
  games: Game[];
  matches: Match[];
  matchDataPoints: MatchDataPoints[];
  selectedGame: number;
  selectedMatch: number;
  setSelectedGame: React.Dispatch<React.SetStateAction<number>>;
  setGames: React.Dispatch<React.SetStateAction<Game[]>>;
  setMatches: React.Dispatch<React.SetStateAction<Match[]>>;
  setMatchDataPoints: React.Dispatch<React.SetStateAction<MatchDataPoints[]>>;
  setSelectedMatch: React.Dispatch<React.SetStateAction<number>>;
}

// Create the context with default values
const GlobalContext = createContext<GlobalContextProps>({
  games: [],
  matches: [],
  matchDataPoints: [
    {
      gameId: -1,
      gameName: "",
      gamePoints: 0,
      matchId: -1,
      playerName: "",
      pointsDescription: ""
    }
  ],
  selectedGame: -1,
  selectedMatch: -1,
  setGames: () => {},
  setMatches: () => {},
  setMatchDataPoints: () => {},
  setSelectedGame: () => {},
  setSelectedMatch: () => {}
});

// Export the context for use in other components
export default GlobalContext;
