import {
  DeleteGame,
  GetAllGames,
  GetGameById,
  PostGame
} from "@api/Game/GameAPI";
import {
  GetAllMatches,
  GetAllMatchesByGameId,
  GetMatchById,
  PostMatch,
  DeleteMatch
} from "@api/Match/MatchAPI";
import { PostMatchDataPoints } from "@api/MatchDataPoint/MatchDataPointAPI";

const api = {
  GetAllGames,
  GetGameById,
  PostGame,
  DeleteGame,
  GetAllMatches,
  GetAllMatchesByGameId,
  GetMatchById,
  PostMatch,
  DeleteMatch,
  PostMatchDataPoints
};

export default api;
