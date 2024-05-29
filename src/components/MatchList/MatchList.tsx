import { useContext, useState } from "react";
import styles from "./matchList.module.scss";
import GlobalContext from "../../context/globalContext";
import Card from "../Card/Card";
import { Match, MatchDataPoints } from "../../utils/types";
import Popup from "../Popup/Popup";
import { NewMatchForm } from "../NewGameForm/NewMatchForm";
import { MatchScoring } from "../MatchScoring/MatchScoring";

export const MatchList = ({
  showMatches,
}: {
  showMatches: (show: boolean) => void;
}) => {
  const {
    selectedGame,
    matches,
    setMatches,
    setMatchDataPoints,
    setSelectedMatch,
  } = useContext(GlobalContext);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showGrid, setShowGrid] = useState<boolean>(false);

  const handleAddNewMatch = () => {
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleMatchAdded = (newlyCreatedGameName: Match) => {
    // After a new game is added, update the selected game to the newly created game
    /* setGames([
      ...games,
      {
        ...newlyCreatedGameName,
      },
    ]); */ // We also refetch our games.
    handleCloseModal(); // Close the modal
  };

  const handleMatchData = (matchData: MatchDataPoints[]) => {
    const playerPointsMap: { [key: string]: number } = matchData.reduce(
      (acc, current) => {
        if (acc[current.playerName]) {
          acc[current.playerName] += current.gamePoints;
        } else {
          acc[current.playerName] = current.gamePoints;
        }
        return acc;
      },
      {} as { [key: string]: number }
    );

    return Object.entries(playerPointsMap).map(([playerName, totalPoints]) => ({
      playerName,
      totalPoints,
    }));
  };

  return showGrid ? (
    <MatchScoring showGrid={setShowGrid} />
  ) : (
    <>
      <button
        className={styles.returnButton}
        onClick={() => {
          setMatches([]);
          showMatches(false);
        }}
      >
        {"<"}
      </button>
      <div className={styles.matchList}>
        {matches?.map((match) => (
          <Card
            key={match.matchId}
            action={() => {
              setMatchDataPoints(match.matchDataPoints);
              setSelectedMatch(match.matchId);
              setShowGrid(true);
            }}
          >
            <Card.CardTitle>Match {match.matchId}</Card.CardTitle>
            {handleMatchData(match.matchDataPoints)?.map((matchDataPoint) => (
              <Card.PlayerPoints key={matchDataPoint.playerName}>
                <div>{matchDataPoint.playerName}</div>
                <div>{matchDataPoint.totalPoints}</div>
              </Card.PlayerPoints>
            ))}
          </Card>
        ))}
        <Card action={handleAddNewMatch}>
          <Card.CardTitle>Add Match</Card.CardTitle>
          <Card.AddGameButton action={() => {}} />
        </Card>
        {showModal && (
          <Popup handleClose={handleCloseModal}>
            <Popup.Header>Add New Game</Popup.Header>
            <Popup.Body>
              <NewMatchForm
                gameId={selectedGame}
                handleClose={handleCloseModal}
                handleMatchAdded={handleMatchAdded}
              />
            </Popup.Body>
          </Popup>
        )}
      </div>
    </>
  );
};
