import { useQuery } from "react-query";
import api from "@api/api";
import { Game } from "@utils/types";
import { queryKeys } from "@api/queryKeys";
import GlobalContext from "src/context/globalContext";
import { useContext } from "react";

export const useGetAllGames = () => {
  const { setGames } = useContext(GlobalContext);
  const { data, isLoading, error, refetch } = useQuery<Game[]>({
    queryKey: queryKeys.games,
    queryFn: async () => {
      const response = await api.GetAllGames();
      return response.data ?? [];
    },onSuccess: (games) => {
      setGames(games);
    }
  });

  return {
    games: data ?? [],
    loading: isLoading,
    error: error ? String(error) : null,
    refetchGames: refetch
  };
};