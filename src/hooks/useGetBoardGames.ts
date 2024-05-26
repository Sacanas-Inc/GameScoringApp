import { useEffect, useState } from "react";
import { BoardGame } from "../utils/types";

export const useGetBoardGames = () => {
  const [games, setGames] = useState<BoardGame[]>();

  const getData = async () => {
    try {
      await fetch(
        "https://gamescoringapi.azurewebsites.net/match-data-points-all",
        //"http://localhost:5097/match-data-points-all",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((message) => message.json())
        .then((data) => setGames(data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return {
    games,
    getData,
  };
};
