import { useState, useEffect } from "react";
import { Game } from "../utils/types";
import api from "../api/api";

export const useGetAllGames = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchGames = async () => {
    setLoading(true);
    return await api
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
      .catch((error) => {
        setError(error);
        console.error(error);
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
