// hooks/usePostGame.ts
import { useState } from "react";

// Define the type for game data
interface GameData {
  gameName: string;
  gameDescription: string;
}

export const usePostGame = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const postData = async (gameData: GameData) => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://gamescoringapi.azurewebsites.net/game",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(gameData),
        }
      );
      if (!response.ok) {
        setError(response.statusText);
        throw new Error(`Error: ${response.statusText}`);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return { postData, loading, error };
};
