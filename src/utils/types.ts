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
  gameId?: number;
  matchDataPoints: MatchDataPoints[];
  matchDate?: Date;
  matchId: number;
  notes?: string | null;
};

export interface Game {
  id: number;
  gameName: string;
  gameDescription: string;
  minPlayers: number;
  maxPlayers: number;
  averageDuration: number;
  matches: Match[];
}

export type Games = Game & { matches: Match[] }[];

export interface MatchDataRow {
  playerName: string;
  gamePoints: number;
  pointsDescription: string;
}
