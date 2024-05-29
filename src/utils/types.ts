export type MatchDataPoints = {
  id?: number;
  gameId: number;
  gameName: string;
  matchId: number;
  playerName: string;
  gamePoints: number;
  pointsDescription: string;
  createdDate?: Date;
};

export type Match = {
  gameId: number;
  matchDataPoints: MatchDataPoints[];
  matchDate: "2024-05-28T21:22:04.5253705";
  matchId: number;
  notes: null;
};

export interface Game {
  id: number;
  gameName: string;
  gameDescription: any;
  minPlayers: number;
  maxPlayers: number;
  averageDuration: number;
  matches: Match[];
}

export type Games = Game & { matches: Match[] }[];
