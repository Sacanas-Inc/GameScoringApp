import { useState } from "react";

import api from "@api/api";

export const useGetMatchById = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const getData = async (matchId: string | number) => {
    setLoading(true);
    return api
      .GetMatchById(matchId)
      .then((response) => {
        if (!response.ok)
          throw new Error(`API response Status: ${response.status}`, {
            cause: response.statusText
          });
        return response.json();
      })
      .finally(() => {
        setLoading(false);
        setError(null);
      })
      .catch((err) => {
        setError(err);
        console.error(err);
      });
  };

  return {
    loading,
    error,
    getData
  };
};
