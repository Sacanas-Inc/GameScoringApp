export const useDeleteGameById = () => {
  const deleteGame = async ({ gameId }: { gameId: string | number }) => {
    try {
      const response = await fetch(
        `https://gamescoringapi.azurewebsites.net/game/${gameId}`,
        {
          headers: {
            Accept: "*/*",
          },
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  return { deleteGame };
};
