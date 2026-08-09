import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@api/api";
import { MatchDataRow } from "@utils/types";
import { queryKeys } from "@api/queryKeys";

export const usePostMatchDataPoints = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async ({
      matchDataPoints,
      matchId
    }: {
      matchDataPoints: MatchDataRow;
      matchId: string | number;
    }) => {
      const response = await api.PostMatchDataPoints(matchId, matchDataPoints);
      if (response.status < 200 || response.status >= 300) {
        throw new Error(`API response Status: ${response.status}`, {
          cause: response.statusText
        });
      }
      return response.data;
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.match(variables.matchId)
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.matchDataPoints(variables.matchId)
      });
      queryClient.invalidateQueries({ queryKey: queryKeys.matches });
    }
  });

  const postData = async (
    matchDataPoints: MatchDataRow,
    matchId: string | number
  ) => {
    try {
      return await mutation.mutateAsync({ matchDataPoints, matchId });
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
      return undefined;
    }
  };

  return {
    postData,
    loading: mutation.isPending,
    error: mutation.error ? String(mutation.error) : null
  };
};