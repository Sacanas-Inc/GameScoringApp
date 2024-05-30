import { useEffect, useState } from "react";
import { Match } from "../utils/types";
import api from "../api/api";

export const useGetAllMatchesByGameId = (gameId?: string | number) => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const getData = async () => {
    setLoading(true);
    return await api
      .GetAllMatchesByGameId(gameId)
      .then((response) => {
        if (!response.ok) return [];

        return response.json();
      })
      .then((data) => setMatches(data))
      .finally(() => {
        setLoading(false);
        setError(null);
      })
      .catch((error) => {
        setError(error);
        //console.error(error);
      });
  };

  const refetch = () => {
    getData();
  };
  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    loading,
    error,
    matches,
    getData,
    refetch,
  };
};
