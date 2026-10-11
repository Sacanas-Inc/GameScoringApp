/* eslint-disable @typescript-eslint/no-empty-function */
import React, { createContext } from "react";
import { Game, Match, MatchDataPoint } from "@utils/types";

// Define the shape of the context data
interface GlobalContextProps {
  games: Game[];
  matches: Match[];
  matchDataPoints: MatchDataPoint[];
  selectedGame: number;
  selectedMatch: number;
  setSelectedGame: React.Dispatch<React.SetStateAction<number>>;
  setGames: React.Dispatch<React.SetStateAction<Game[]>>;
  setMatches: React.Dispatch<React.SetStateAction<Match[]>>;
  setMatchDataPoints: React.Dispatch<React.SetStateAction<MatchDataPoint[]>>;
  setSelectedMatch: React.Dispatch<React.SetStateAction<number>>;
}

// Create the context with default values
const GlobalContext = createContext<GlobalContextProps>({
  games: [],
  matches: [],
  matchDataPoints: [
    {
      gamePoints: 0,
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
