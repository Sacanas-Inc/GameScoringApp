// hooks/usePostGame.ts
import { useState } from "react";
import api from "@api/api";

// Define the type for game data
interface GameData {
  gameName: string;
  gameDescription: string;
}

export const usePostGame = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const postGame = async (gameData: GameData) => {
    setLoading(true);
    return api
      .PostGame(gameData)
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

  return { postGame, loading, error };
};
