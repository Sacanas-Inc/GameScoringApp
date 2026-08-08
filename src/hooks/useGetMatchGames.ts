import { useQuery } from "react-query";
import api from "@api/api";
import { Match } from "@utils/types";
import { queryKeys } from "@api/queryKeys";

export const useGetMatchGames = () => {
  const { data, isLoading, error, refetch } = useQuery<Match[]>({
    queryKey: queryKeys.matches,
    queryFn: async () => {
      const response = await api.GetAllMatches();
      return response.data ?? [];
    }
  });

  const getData = async () => {
    await refetch();
  };

  return {
    loading: isLoading,
    error: error ? String(error) : null,
    matches: data ?? [],
    getData
  };
};