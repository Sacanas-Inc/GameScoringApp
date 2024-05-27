export type BoardGame = {
  id?: string;
  gameId: string;
  gameName: string;
  matchId: string;
  playerName: string;
  gamePoints: number | string;
  pointsDescription: string;
  createdDate?: Date;
};

export interface Game {
  id: number;
  gameName: string;
  gameDescription: string | null;
  minPlayers: number;
  maxPlayers: number;
  averageDuration: number;
  matches: any[] | null;
}
