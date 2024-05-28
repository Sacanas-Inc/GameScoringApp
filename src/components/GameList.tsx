import { useContext, useEffect, useState } from "react";
import Card from "./Card/Card";
import { MatchList } from "./MatchList/MatchList";
import NewGameFormModal from "./NewGameFormModal";
import { GlobalContext } from "../context/globalContext";
import { useGetGameById } from "../hooks/useGetGameById";
import { Match } from "../utils/types";
import { Loader } from "./Loader/Loader";
import { useDeleteGameById } from "../hooks/useDeleteGameById";

export const GameList = () => {
  const { games, matches, refetchGames } = useContext(GlobalContext);
  const { game, loading, fetchGame } = useGetGameById();

  const { deleteGame } = useDeleteGameById();
  const [filteredMatches, setFilteredMatches] = useState<Match[]>();
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleGetGameById = ({ gameId }: { gameId: string | number }) => {
    fetchGame({ gameId });
  };

  const handleAddNewGame = () => {
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleGameAdded = (newlyCreatedGameName: string) => {
    // After a new game is added, update the selected game to the newly created game
    refetchGames(); // We also refetch our games.
    handleCloseModal(); // Close the modal
  };

  useEffect(() => {
    if (!game) return;
    const filter = matches?.filter(
      (match) => match.gameId.toString() === game.id.toString()
    );
    setFilteredMatches(filter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [game]);

  return (
    <>
      {filteredMatches !== undefined && filteredMatches?.length > 0 ? (
        <MatchList
          filteredMatches={filteredMatches}
          setFilteredMatches={setFilteredMatches}
        />
      ) : loading ? (
        <Loader />
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: 10,
            margin: 20,
          }}
        >
          {games.map((game) => (
            <Card key={game.id}>
              <Card.CardTitle title={game.gameName} />
              <Card.ListMatchButton
                action={() => {
                  handleGetGameById({ gameId: game.id });
                }}
              >
                List Matches
              </Card.ListMatchButton>
              <Card.AddMatchButton action={() => {}}>
                + Add Match
              </Card.AddMatchButton>
              <Card.DeleteButton
                action={() => {
                  deleteGame({ gameId: game.id });
                }}
              >
                Delete
              </Card.DeleteButton>
            </Card>
          ))}

          <Card>
            <Card.CardTitle title={"Add Game"} />
            <Card.AddGameButton action={handleAddNewGame} />
          </Card>

          {showModal && (
            <NewGameFormModal
              onClose={handleCloseModal}
              onGameAdded={handleGameAdded}
            />
          )}
        </div>
      )}
    </>
  );
};
