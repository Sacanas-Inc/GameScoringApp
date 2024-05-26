import { BoardGame } from "./types";

export const SortByGameId = (games: BoardGame[] | undefined): BoardGame[] => {
  if (!games) {
    console.warn("No games provided for sorting.");
    return [];
  }

  return [...games].sort((a, b) => {
    if (!a.gameId || !b.gameId) {
      console.error("Undefined gameId in:", a, b);
      return 0; // Handle undefined values appropriately
    }

    return a.gameId.localeCompare(b.gameId);
  });
};
