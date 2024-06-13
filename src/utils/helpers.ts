import { Match } from "@utils/types";

export const SortByGameId = (games: Match[] | undefined): Match[] => {
  if (!games) {
    // eslint-disable-next-line no-console
    console.warn("No games provided for sorting.");
    return [];
  }

  return [...games].sort((a, b) => {
    if (!a.gameId || !b.gameId) {
      // eslint-disable-next-line no-console
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
