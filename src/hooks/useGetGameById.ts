import { useState } from "react";
import { useQueryClient } from "react-query";
import api from "@api/api";
import { Game } from "@utils/types";
import { queryKeys } from "@api/queryKeys";

export const useGetGameById = () => {
  const queryClient = useQueryClient();
  const [game, setGame] = useState<Game>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchGame = async ({ gameId }: { gameId: string | number }) => {
    setLoading(true);
    try {
      const data = await queryClient.fetchQuery<Game>({
        queryKey: queryKeys.game(gameId),
        queryFn: async () => {
          const response = await api.GetGameById(gameId);
          return response.data;
        }
      });
      setGame(data);
      setError(null);
      return data;
    } catch (err) {
      setError(err ? String(err) : "Unknown error");
      // eslint-disable-next-line no-console
      console.error(err);
      setGame({} as Game);
      return undefined;
    } finally {
      setLoading(false);
    }
  };

  return { game, loading, error, fetchGame };
};