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

    // Ensure gameId is treated as a string
    const gameIdA = String(a.gameId);
    const gameIdB = String(b.gameId);

    return gameIdA.localeCompare(gameIdB);
  });
};
