export const queryKeys = {
  games: ["games"] as const,
  matches: ["matches"] as const,
  matchesByGame: (gameId: string | number) =>
    ["matches", "byGame", gameId] as const,
  game: (gameId: string | number) => ["game", gameId] as const,
  match: (matchId: string | number) => ["match", matchId] as const,
  matchDataPoints: (matchId: string | number) =>
    ["matchDataPoints", matchId] as const
};