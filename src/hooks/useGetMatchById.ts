import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import api from "@api/api";
import { getApiErrorMessage } from "@api/apiUtils";
import { Match } from "@utils/types";
import { queryKeys } from "@api/queryKeys";

export const useGetMatchById = () => {
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const getData = async (matchId: string | number) => {
    setLoading(true);
    try {
      const data = await queryClient.fetchQuery<Match>({
        queryKey: queryKeys.match(matchId),
        queryFn: async () => {
          const response = await api.GetMatchById(matchId);
          return response.data;
        }
      });
      setError(null);
      return data;
    } catch (err) {
      setError(getApiErrorMessage(err));
      // eslint-disable-next-line no-console
      console.error(err);
      return undefined;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    getData
  };
};