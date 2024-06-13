import { useState, useEffect } from "react";
import api from "@api/api";
import { Game } from "@utils/types";

export const useGetAllGames = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchGames = async () => {
    setLoading(true);
    return api
      .GetAllGames()
      .then((response) => {
        if (!response.ok) return [];
        return response.json();
      })
      .then((data) => setGames(data))
      .finally(() => {
        setLoading(false);
        setError(null);
      })
      .catch((err) => {
        setError(err);
        console.error(err);
      });
  };

  useEffect(() => {
    fetchGames();
  }, []);

  const refetchGames = () => {
    fetchGames(); // Manually trigger data fetch
  };

  return { games, loading, error, refetchGames };
};
