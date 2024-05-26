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
