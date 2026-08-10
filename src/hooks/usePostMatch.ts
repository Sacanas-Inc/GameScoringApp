import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@api/api";
import { queryKeys } from "@api/queryKeys";

export interface MatchData {
  gameId: number | string;
  notes?: string;
}

export const usePostMatch = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (matchData: MatchData) => {
      const response = await api.PostMatch(matchData);
      if (response.status < 200 || response.status >= 300) {
        throw new Error(`API response Status: ${response.status}`, {
          cause: response.statusText
        });
      }
      return response.data;
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.matches });
      queryClient.invalidateQueries({
        queryKey: queryKeys.matchesByGame(variables.gameId)
      });
    }
  });

  const postMatch = async (matchData: MatchData) => {
    try {
      return await mutation.mutateAsync(matchData);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
      return undefined;
    }
  };

  return {
    postMatch,
    loading: mutation.isPending,
    error: mutation.error ? String(mutation.error) : null
  };
};