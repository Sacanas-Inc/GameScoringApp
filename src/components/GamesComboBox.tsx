import React, { useState } from "react";
import { useGetAllGames } from "../hooks/useGetAllGames";
import { Game } from "../utils/types";
import "../styles/games-combobox-styles.scss"; // Import the SCSS file
import NewGameButton from "./NewGameButton";
import NewGameFormModal from "./NewGameFormModal";

const GamesComboBox: React.FC = () => {
  const { games, refetchGames } = useGetAllGames(); // Add refetchGames function from useFetchAllGames
  const [selectedGame, setSelectedGame] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedGame(event.target.value);
  };

  const handleButtonClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleGameAdded = (newlyCreatedGameName: string) => {
    // After a new game is added, update the selected game to the newly created game
    refetchGames(); // We also refetch our games.
    setSelectedGame(newlyCreatedGameName);
    handleCloseModal(); // Close the modal
  };

  return (
    <div className="gamesComboBox-wrapper">
      <label htmlFor="game-GamesComboBox">Games:</label>
      <select
        id="game-GamesComboBox"
        value={selectedGame}
        onChange={handleChange}
      >
        <option value="">Select a game</option>
        {games.map((game: Game) => (
          <option key={game.id} value={game.gameName}>
            {game.gameName}
          </option>
        ))}
      </select>
      <NewGameButton onClick={handleButtonClick} />
      {showModal && (
        <NewGameFormModal
          onClose={handleCloseModal}
          onGameAdded={handleGameAdded}
        />
      )}
    </div>
  );
};

export default GamesComboBox;
