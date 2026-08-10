import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import api from "@api/api";
import { Match } from "@utils/types";
import { queryKeys } from "@api/queryKeys";

export const useGetAllMatchesByGameId = (gameId?: string | number) => {
  const { data, isLoading, error, refetch } = useQuery<Match[]>({
    queryKey: queryKeys.matchesByGame(gameId ?? ""),
    queryFn: async () => {
      if (gameId === undefined || gameId === null || gameId === "") return [];
      try {
        const response = await api.GetAllMatchesByGameId(gameId);
        return response.data ?? [];
      } catch (e) {
        if (axios.isAxiosError(e) && e.response?.status === 404) return [];
        throw e;
      }
    },
    retry: (failureCount, e) =>
      axios.isAxiosError(e) && e.response?.status === 404
        ? false
        : failureCount < 3
  });

  return {
    loading: isLoading,
    error: error ? String(error) : null,
    matches: data ?? [],
    refetch
  };
};