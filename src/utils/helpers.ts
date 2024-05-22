import { BoardGame } from "./types";

export const SortByGameId = (games: BoardGame[] | undefined): BoardGame[] => {
  if (!games) {
    return [];
  }
  return [...games].sort((a, b) => a.gameId.localeCompare(b.gameId));
};
