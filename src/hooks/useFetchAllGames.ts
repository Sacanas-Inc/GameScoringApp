import { useState, useEffect } from "react";
import { Game } from "../utils/types";

export const useFetchAllGames = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchGames = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://gamescoringapi.azurewebsites.net/games",
        {
          headers: {
            Accept: "*/*",
          },
        }
      );
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const data: Game[] = await response.json();
      setGames(data);
      setError(null);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGames();
  }, []);

  const refetchGames = () => {
    fetchGames(); // Manually trigger data fetch
  };

  return { games, loading, error, refetchGames };
};
