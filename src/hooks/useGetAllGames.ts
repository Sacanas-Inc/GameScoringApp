import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import api from "@api/api";
import { getApiErrorMessage } from "@api/apiUtils";
import { Game } from "@utils/types";
import { queryKeys } from "@api/queryKeys";
import GlobalContext from "src/context/globalContext";
import { useContext, useEffect } from "react";

export const useGetAllGames = () => {
  const { setGames } = useContext(GlobalContext);
  const { data, isLoading, error, refetch } = useQuery<Game[]>({
    queryKey: queryKeys.games,
    queryFn: async () => {
      try {
        const response = await api.GetAllGames();
        return response.data ?? [];
      } catch (e) {
        // The API answers 404 when the table is empty; that is an empty state.
        if (axios.isAxiosError(e) && e.response?.status === 404) return [];
        throw e;
      }
    },
    retry: (failureCount, e) =>
      axios.isAxiosError(e) && e.response?.status === 404
        ? false
        : failureCount < 3
  });

  useEffect(() => {
    setGames(data ?? []);
  }, [data, setGames]);

  return {
    games: data ?? [],
    loading: isLoading,
    error: error ? getApiErrorMessage(error) : null,
    refetchGames: refetch
  };
};
