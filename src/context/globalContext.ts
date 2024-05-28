import { createContext } from "react";
import { Match } from "../utils/types";

export const GlobalContext = createContext({
  games: [
    {
      id: 0,
      gameName: "",
      gameDescription: "",
      minPlayers: 0,
      maxPlayers: 0,
      averageDuration: 0,
      matches: [] as any[],
    },
  ],
  matches: [
    {
      gameId: "",
      gameName: "",
      matchId: "",
      playerName: "",
      gamePoints: 1,
      pointsDescription: "",
    },
  ],
  refetchGames: () => {},
  postData: (params: Match[]) => {},
});
