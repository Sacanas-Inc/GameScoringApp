import { useState } from "react";
import { Game } from "../utils/types";
import api from "../api/api";

export const useGetGameById = () => {
  const [game, setGame] = useState<Game>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchGame = async ({ gameId }: { gameId: string | number }) => {
    setLoading(true);
    return await api
      .GetGameById(gameId)
      .then((response) => {
        if (!response.ok)
          throw new Error(`API response Status: ${response.status}`, {
            cause: response.statusText,
          });
        return response.json();
      })
      .then((data) => setGame(data))
      .finally(() => {
        setLoading(false);
        setError(null);
      })
      .catch((error) => {
        setError(error);
        console.error(error);
        setGame({} as Game);
      });
  };

  return { game, loading, error, fetchGame };
};
