import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../Card/Card";
import { Game } from "../../utils/types";
import { useDeleteGameById } from "../../hooks/useDeleteGameById";
import styles from "./gameList.module.scss";
import cardStyles from "../Card/card.module.scss";
import { NewGameForm } from "../NewGameForm/NewGameForm";
import Popup from "../Popup/Popup";
import { useGetAllGames } from "../../hooks/useGetAllGames";
import { Loader } from "../Loader/Loader";

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

  const handleGameAdded = (newlyCreatedGameName: Game) => {
    // After a new game is added, update the selected game to the newly created game
    refetchGames(); // We also refetch our games.
    handleCloseModal(); // Close the modal
  };

  const handleDelete = async ({ gameId }: { gameId: number }) => {
    await deleteGame({ gameId: gameId });
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
                className={cardStyles.card + " " + cardStyles.justify}
                action={(e) => {
                  handleGotoMatches(game.id);
                }}
              >
                <Card.CardTitle>{game.gameName}</Card.CardTitle>
                <Card.DeleteButton
                  tagKey={`delete-${game.id}-${index}`}
                  action={() => {
                    handleDelete({ gameId: game.id });
                  }}
                ></Card.DeleteButton>
              </Card>
            ))}

          <Card action={handleAddNewGame} dataTestId={`game-card-add-test-id`}>
            <Card.CardTitle>Add Game</Card.CardTitle>
            <Card.AddGameButton action={() => {}} />
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
