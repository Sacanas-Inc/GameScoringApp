import { useState } from "react";
import { MatchDataPoints } from "../utils/types";

interface MatchData {
  matchId?: number;
  gameId: number;
  matchDate?: Date;
  notes?: string;
  matchDataPoints?: MatchDataPoints[];
}

export const usePostMatch = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const postData = async (matchData: MatchData) => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://gamescoringapi.azurewebsites.net/matches",
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
