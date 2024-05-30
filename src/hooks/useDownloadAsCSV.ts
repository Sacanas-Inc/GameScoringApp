import { MatchDataPoints } from "../utils/types";

export const useDownloadAsCSV = () => {
  const downloadFileAsCSV = (filteredGames: MatchDataPoints[] | undefined) => {
    const csvHeaders = [
      "Game Id",
      "Player",
      "Game Name",
      "Game Points",
      "Points Description",
    ];

    if (filteredGames === undefined) return;
    const header = csvHeaders.join(",") + "\n";
    const rows = Object.values(filteredGames)
      .map(
        (game) =>
          `${game.gameId}, ${game.playerName}, ${game.gameName}, ${game.gamePoints},${game.pointsDescription}`
      )
      .join("\n");
    const blob = new Blob([header + rows], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", "board_games.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return { downloadFileAsCSV };
};
