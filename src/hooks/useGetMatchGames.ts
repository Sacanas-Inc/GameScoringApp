import { useEffect, useState } from "react";
import { Match } from "../utils/types";

export const useGetMatchGames = () => {
  const [matches, setMatches] = useState<Match[]>([]);

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
        .then((data) => setMatches(data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return {
    matches,
    getData,
  };
};
