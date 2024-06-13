import { Match } from "./types";

export const SortByGameId = (games: Match[] | undefined): Match[] => {
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

export const toPascalCase = (str: string) =>
  (str.toLowerCase().match(/[a-zA-Z0-9]+/g) || [])
    .map((w: string) => `${w.charAt(0).toUpperCase()}${w.slice(1)}`)
    .join(" ");
