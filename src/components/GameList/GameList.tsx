import { useContext, useState } from "react";
import Card from "../Card/Card";
import { MatchList } from "../MatchList/MatchList";
import GlobalContext from "../../context/globalContext";
import { useGetGameById } from "../../hooks/useGetGameById";
import { Game } from "../../utils/types";
import { Loader } from "../Loader/Loader";
import { useDeleteGameById } from "../../hooks/useDeleteGameById";
import styles from "./gameList.module.scss";
import cardStyles from "../Card/card.module.scss";
import { NewGameForm } from "../NewGameForm/NewGameForm";
import Popup from "../Popup/Popup";

export const GameList = () => {
  const { games, setGames, setMatches, setSelectedGame } =
    useContext(GlobalContext);
  const { loading } = useGetGameById();

  const { deleteGame } = useDeleteGameById();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showMatches, setShowMatches] = useState<boolean>(false);
  const handleAddNewGame = () => {
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleGameAdded = (newlyCreatedGameName: Game) => {
    // After a new game is added, update the selected game to the newly created game
    setGames([
      ...games,
      {
        ...newlyCreatedGameName,
      },
    ]); // We also refetch our games.
    handleCloseModal(); // Close the modal
  };

  const handleDelete = async ({ gameId }: { gameId: number }) => {
    await deleteGame({ gameId: gameId });
    setGames(games.filter((game) => game.id !== gameId));
  };

  return (
    <div className={styles.contentWrapper}>
      {showMatches ? (
        <MatchList showMatches={setShowMatches} />
      ) : loading ? (
        <Loader />
      ) : (
        <div className={styles.gameList}>
          {games.map((game) => (
            <Card
              key={game.id}
              className={cardStyles.card + " " + cardStyles.justify}
              action={() => {
                setSelectedGame(game.id);
                setShowMatches(true);
                setMatches(game.matches);
              }}
            >
              <Card.CardTitle>{game.gameName}</Card.CardTitle>
              <Card.DeleteButton
                action={() => {
                  handleDelete({ gameId: game.id });
                }}
              >
                Delete
              </Card.DeleteButton>
            </Card>
          ))}

          <Card action={handleAddNewGame}>
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
      )}
    </div>
  );
};
