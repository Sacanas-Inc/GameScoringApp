import { useState } from "react";
import { Game } from "../utils/types";

export const useGetGameById = () => {
  const [game, setGame] = useState<Game>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchGame = async ({ gameId }: { gameId: string | number }) => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://gamescoringapi.azurewebsites.net/game/${gameId}`,
        {
          headers: {
            Accept: "*/*",
          },
        }
      );
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const data: Game = await response.json();
      setGame(data);
      setError(null);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { game, loading, error, fetchGame };
};
