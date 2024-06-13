import { useEffect, useState } from "react";
import api from "@api/api";
import { Match } from "@utils/types";

export const useGetAllMatchesByGameId = (gameId?: string | number) => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const getData = async () => {
    setLoading(true);
    return api
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
      .catch((err) => {
        setError(err);
        console.error(err);
      });
  };

  const refetch = () => {
    getData();
  };
  useEffect(() => {
    getData();
  }, []);

  return {
    loading,
    error,
    matches,
    getData,
    refetch
  };
};
