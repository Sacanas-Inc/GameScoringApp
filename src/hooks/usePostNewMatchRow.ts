import { useState } from "react";

interface MatchDataRow {
  id?: number;
  gameId: number;
  gameName: string;
  matchId: number;
  playerName: string;
  gamePoints: number;
  pointsDescription: string;
  createdDate?: Date;
}

export const usePostNewMatchRow = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const postData = async (matchData: MatchDataRow) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://gamescoringapi.azurewebsites.net/match-data-point/${matchData.matchId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(matchData),
        }
      );
      if (!response.ok) {
        setError(response.statusText);
        throw new Error(`Error: ${response.statusText}`);
      }
      return response.json();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return { postData, loading, error };
};
