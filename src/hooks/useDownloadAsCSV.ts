import { MatchDataPoints } from "@utils/types";

export const useDownloadAsCSV = () => {
  const downloadFileAsCSV = (
    filteredGames: MatchDataPoints[] | undefined,
    matchName?: string,
    gameName?: string
  ) => {
    const csvHeaders = [
      "Game Name",
      "Player",
      "Game Points",
      "Points Description"
    ];

    if (filteredGames === undefined) return;
    const header = `${csvHeaders.join(",")}\n`;
    const rows = Object.values(filteredGames)
      .map(
        (game) =>
          `${gameName}, ${game.playerName}, ${game.gamePoints},${game.pointsDescription}`
      )
      .join("\n");
    const blob = new Blob([header + rows], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute(
      "download",
      matchName ? `${matchName}.csv` : "board_games.csv"
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return { downloadFileAsCSV };
};
