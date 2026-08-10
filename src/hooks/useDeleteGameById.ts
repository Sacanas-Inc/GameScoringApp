import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@api/api";
import { queryKeys } from "@api/queryKeys";

export const useDeleteGameById = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async ({ gameId }: { gameId: string | number }) => {
      const response = await api.DeleteGame(gameId);
      if (response.status < 200 || response.status >= 300) {
        throw new Error(`API response Status: ${response.status}`, {
          cause: response.statusText
        });
      }
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.games });
    }
  });

  const deleteGame = async ({ gameId }: { gameId: string | number }) => {
    try {
      return await mutation.mutateAsync({ gameId });
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
      return undefined;
    }
  };

  return {
    deleteGame,
    loading: mutation.isPending,
    error: mutation.error ? String(mutation.error) : null
  };
};
