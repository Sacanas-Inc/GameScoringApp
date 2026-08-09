import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@api/api";
import { queryKeys } from "@api/queryKeys";

export const useDeleteMatchById = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async ({ matchId }: { matchId: string | number }) => {
      const response = await api.DeleteMatch(matchId);
      if (response.status < 200 || response.status >= 300) {
        throw new Error(`API response Status: ${response.status}`, {
          cause: response.statusText
        });
      }
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.matches });
    }
  });

  const deleteMatch = async ({ matchId }: { matchId: string | number }) => {
    try {
      return await mutation.mutateAsync({ matchId });
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
      return undefined;
    }
  };

  return {
    deleteMatch,
    loading: mutation.isPending,
    error: mutation.error ? String(mutation.error) : null
  };
};