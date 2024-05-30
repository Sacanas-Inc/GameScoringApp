import { DeleteGame, GetAllGames, GetGameById, PostGame } from "./Game/GameAPI";
import {
  GetAllMatches,
  GetAllMatchesByGameId,
  GetMatchById,
  PostMatch,
  DeleteMatch,
} from "./Match/MatchAPI";
import {
  GetMatchDataPoints,
  PostMatchDataPoints,
} from "./MatchDataPoint/MatchDataPointAPI";

export const BASE_URL = "https://gamescoringapi.azurewebsites.net/";

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
  GetMatchDataPoints,
  PostMatchDataPoints,
};

export default api;
