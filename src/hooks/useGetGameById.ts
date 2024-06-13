import { useState } from "react";
import api from "@api/api";
import { Game } from "@utils/types";

export const useGetGameById = () => {
  const [game, setGame] = useState<Game>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchGame = async ({ gameId }: { gameId: string | number }) => {
    setLoading(true);
    return api
      .GetGameById(gameId)
      .then((response) => {
        if (!response.ok)
          throw new Error(`API response Status: ${response.status}`, {
            cause: response.statusText
          });
        return response.json();
      })
      .then((data) => setGame(data))
      .finally(() => {
        setLoading(false);
        setError(null);
      })
      .catch((err) => {
        setError(err);
        console.error(err);
        setGame({} as Game);
      });
  };

  return { game, loading, error, fetchGame };
};
