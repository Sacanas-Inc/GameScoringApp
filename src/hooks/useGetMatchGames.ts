import { useEffect, useState } from "react";
import { Match } from "../utils/types";
import api from "../api/api";

export const useGetMatchGames = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const getData = async () => {
    setLoading(true);
    return await api
      .GetAllMatches()
      .then((response) => {
        if (!response.ok)
          throw new Error(`API response Status: ${response.status}`, {
            cause: response.statusText,
          });
        return response.json();
      })
      .then((data) => setMatches(data))
      .finally(() => {
        setLoading(false);
        setError(null);
      })
      .catch((error) => {
        setError(error);
        console.error(error);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return {
    loading,
    error,
    matches,
    getData,
  };
};
