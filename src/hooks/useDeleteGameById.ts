import { useState } from "react";
import api from "@api/api";

export const useDeleteGameById = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const deleteGame = async ({ gameId }: { gameId: string | number }) => {
    setLoading(true);
    return api
      .DeleteGame(gameId)
      .then((response) => {
        if (!response.ok)
          throw new Error(`API response Status: ${response.status}`, {
            cause: response.statusText
          });
      })
      .finally(() => {
        setLoading(false);
        setError(null);
      })
      .catch((err) => {
        setError(err);
        console.error(err);
      });
  };

  return { loading, error, deleteGame };
};
