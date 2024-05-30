import { useState } from "react";
import api from "../api/api";

interface MatchData {
  gameId: number | string;
  notes?: string;
}

export const usePostMatch = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const postMatch = async (matchData: MatchData) => {
    setLoading(true);
    return await api
      .PostMatch(matchData)
      .then((response) => {
        if (!response.ok)
          throw new Error(`API response Status: ${response.status}`, {
            cause: response.statusText,
          });
        return response.json();
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

  return { postMatch, loading, error };
};
