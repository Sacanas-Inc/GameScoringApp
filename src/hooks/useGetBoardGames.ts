import { useEffect, useState } from "react";
import { BoardGame } from "../utils/types";

export const useGetBoardGames = () => {
  const [games, setGames] = useState<BoardGame[]>();

  const getData = async () => {
    try {
      await fetch("https://664caef8ede9a2b556512fff.mockapi.io/board_game", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
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
