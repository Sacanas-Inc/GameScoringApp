import { BoardGame } from "../utils/types";

export const usePostBoardGames = () => {
  const postData = async (params: BoardGame[]) => {
    try {
      await fetch(
        "https://gamescoringapi.azurewebsites.net/match-data-points-all",
        //"http://localhost:5097/match-data-points-all",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(params),
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  return {
    postData,
  };
};
