import { useState } from "react";
import api from "../api/api";
import { MatchDataRow } from "../utils/types";

export const usePostMatchDataPoints = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const postData = async (
    matchDataPoints: MatchDataRow,
    matchId: string | number
  ) => {
    setLoading(true);
    return await api
      .PostMatchDataPoints(matchId, JSON.stringify(matchDataPoints))
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

  return { postData, loading, error };
};
