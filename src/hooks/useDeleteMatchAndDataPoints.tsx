import { useState } from "react";
import api from "../api/api";
export const useDeleteMatchById = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const deleteMatch = async ({ matchId }: { matchId: string | number }) => {
    setLoading(true);
    return await api
      .DeleteMatch(matchId)
      .then((response) => {
        if (!response.ok)
          throw new Error(`API response Status: ${response.status}`, {
            cause: response.statusText,
          });
      })
      .finally(() => {
        setLoading(false);
        setError(null);
      })
      .catch((error) => {
        setError(error);
        console.error(error);
      });
  };

  return { loading, error, deleteMatch };
};
