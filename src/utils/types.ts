export type BoardGame = {
  id?: string;
  playerName: string;
  gameId: string;
  gameName: string;
  gamePoints: number | string;
  gamePointsDescription: string;
  createdDate?: Date;
};
