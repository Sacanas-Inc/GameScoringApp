// hooks/usePostGame.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@api/api";
import { queryKeys } from "@api/queryKeys";

export interface GameData {
  gameName: string;
  gameDescription: string;
}

export const usePostGame = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (gameData: GameData) => {
      const response = await api.PostGame(gameData);
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

  const postGame = async (gameData: GameData) => {
    try {
      return await mutation.mutateAsync(gameData);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
      return undefined;
    }
  };

  return {
    postGame,
    loading: mutation.isPending,
    error: mutation.error ? String(mutation.error) : null
  };
};