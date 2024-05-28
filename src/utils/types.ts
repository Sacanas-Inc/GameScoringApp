export type Match = {
  id?: string;
  gameId: string;
  gameName: string;
  matchId: string;
  playerName: string;
  gamePoints: number;
  pointsDescription: string;
  createdDate?: Date;
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
