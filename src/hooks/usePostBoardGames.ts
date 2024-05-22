import { BoardGame } from "../utils/types";

export const usePostBoardGames = () => {
  const postData = async (params: BoardGame) => {
    try {
      await fetch("https://664caef8ede9a2b556512fff.mockapi.io/board_game", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
      });
    } catch (error) {
      console.log(error);
    }
  };

  return {
    postData,
  };
};
