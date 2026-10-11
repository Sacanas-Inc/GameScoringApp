export type MatchDataPoint = {
  id?: number;
  playerName: string;
  gamePoints: number;
  pointsDescription: string;
  createdDate?: string;
};

export type MatchStats = {
  totalGamePoints: number;
  winningPlayer: string | null;
  playerPoints: Record<string, number>;
};

export type Match = {
  gameId?: number;
  matchDataPoints: MatchDataPoint[];
  matchDate?: string;
  matchId: number;
  notes?: string | null;
  playerCount?: number;
  isFinished?: boolean;
  matchStats?: MatchStats;
};

export interface Game {
  id: number;
  gameName: string;
  gameDescription: string;
  minPlayers: number;
  maxPlayers: number;
  averageDuration: number;
  matchesCount: number;
}

export interface CreateMatchDataPointRequest {
  playerName: string;
  gamePoints: number;
  pointsDescription: string;
}
