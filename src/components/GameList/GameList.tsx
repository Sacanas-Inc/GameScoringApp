import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "@components/Card/Card";
import { useDeleteGameById } from "@hooks/useDeleteGameById";
import cardStyles from "@components/Card/card.module.scss";
import { NewGameForm } from "@components/NewGameForm/NewGameForm";
import Popup from "@components/Popup/Popup";
import { useGetAllGames } from "@hooks/useGetAllGames";
import { Loader } from "@components/Loader/Loader";
import styles from "@components/GameList/gameList.module.scss";

export const GameList = () => {
  const { deleteGame } = useDeleteGameById();
  const [showModal, setShowModal] = useState<boolean>(false);
  const { games, refetchGames, loading } = useGetAllGames();
  const navigate = useNavigate();
  const handleAddNewGame = () => {
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleGameAdded = () => {
    // After a new game is added, update the selected game to the newly created game
    refetchGames(); // We also refetch our games.
    handleCloseModal(); // Close the modal
  };

  const handleDelete = async ({ gameId }: { gameId: number }) => {
    await deleteGame({ gameId });
    refetchGames(); // We also refetch our games.
  };

  const handleGotoMatches = (gameId: string | number) => {
    navigate(`/matches/${gameId}`);
  };

  return (
    <>
      <h1 style={{ textAlign: "center" }} data-testid="app-title-data-test-id">
        Game Scoring App
      </h1>
      <div className={styles.contentWrapper}>
        <div className={styles.gameList}>
          {loading && <Loader />}
          {games.length > 0 &&
            games.map((game, index) => (
              <Card
                key={game.id}
                dataTestId={`game-card-${game.id}`}
                className={`${cardStyles.card} ${cardStyles.justify}`}
                action={() => {
                  handleGotoMatches(game.id);
                }}
              >
                <Card.CardTitle>{game.gameName}</Card.CardTitle>
                <Card.DeleteButton
                  tagKey={`delete-${game.id}-${index}`}
                  action={() => {
                    handleDelete({ gameId: game.id });
                  }}
                />
              </Card>
            ))}

          <Card action={handleAddNewGame} dataTestId="game-card-add-test-id">
            <Card.CardTitle>Add Game</Card.CardTitle>
            <Card.AddGameButton
              action={() => {
                console.warn("Not implemented yet!");
              }}
            />
          </Card>
          {showModal && (
            <Popup handleClose={handleCloseModal}>
              <Popup.Header>Add New Game</Popup.Header>
              <Popup.Body>
                <NewGameForm
                  handleClose={handleCloseModal}
                  handleGameAdded={handleGameAdded}
                />
              </Popup.Body>
            </Popup>
          )}
        </div>
      </div>
    </>
  );
};
