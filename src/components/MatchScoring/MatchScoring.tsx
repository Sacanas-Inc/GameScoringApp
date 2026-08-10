import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import { ReturnButton } from "@components/ReturnButton/ReturnButton";
import cardStyles from "@components/Card/card.module.scss";
import { Match, MatchDataPoints } from "@utils/types";
import { toPascalCase } from "@utils/helpers";
import { useDownloadAsCSV } from "../../hooks/useDownloadAsCSV";
import { useGetMatchById } from "../../hooks/useGetMatchById";
import { Loader } from "../Loader/Loader";
import { useGetGameById } from "../../hooks/useGetGameById";
import { NewScoreForm } from "../NewGameForm/NewScoreForm";
import Card from "../Card/Card";
import Popup from "../Popup/Popup";
import styles from "../../styles/grid-styles.module.scss";

type PlayerScores = {
  playerName: string;
  score: { pointsDescription: string; points: number }[];
};

export const MatchScoring = () => {
  const { downloadFileAsCSV } = useDownloadAsCSV();
  const { id = 0, matchId = 0 } = useParams();
  const { game, fetchGame } = useGetGameById();
  const { getData, loading } = useGetMatchById();

  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedPlayer, setSelectedPlayer] = useState<PlayerScores | null>(
    null
  );
  const [match, setMatch] = useState<Match>({} as Match);

  useEffect(() => {
    getData(matchId).then((response) => {
      setMatch(response || ({} as Match));
    });
    fetchGame({ gameId: id });
  }, []);

  const handleAddNewMatch = () => {
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleScoreData = (data: MatchDataPoints[]): PlayerScores[] => {
    const result: PlayerScores[] = [];

    // Helper function to find a player in the result array
    function findPlayer(playerName: string) {
      return result.find(
        (player) => player.playerName.toLowerCase() === playerName.toLowerCase()
      );
    }

    data.forEach((item) => {
      let player = findPlayer(item.playerName);
      if (!player) {
        player = {
          playerName: item.playerName,
          score: []
        };
        result.push(player);
      }
      player.score.push({
        pointsDescription: toPascalCase(item.pointsDescription),
        points: item.gamePoints
      });
    });

    return result;
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <ReturnButton to={`/matches/${id}`} />
        <h1
          style={{ textAlign: "center" }}
          data-testid="game-title-data-test-id"
        >
          {game !== undefined && `${game?.gameName} - Match ${matchId}`}
        </h1>
      </div>
      {match.notes && (
        <p className="cardDescription" data-testid="match-notes-data-test-id">
          {match.notes}
        </p>
      )}
      {loading && !match.matchDataPoints && match === ({} as Match) ? (
        <Loader />
      ) : (
        <>
          <div className={styles.gridContainer}>
            {match?.matchDataPoints?.length > 0 &&
              handleScoreData(match?.matchDataPoints)?.map((player) => (
                <Card
                  key={player.playerName.toLowerCase()}
                  dataTestId={`score-card-${match.matchId}`}
                  className={`${cardStyles.card} ${cardStyles.scoreCard}`}
                  action={() => setSelectedPlayer(player)}
                >
                  <Card.CardTitle>{player.playerName}</Card.CardTitle>
                  {player.score.slice(0, 4).map((score) => (
                    <Card.PlayerPoints
                      key={`card-${score.pointsDescription.toLowerCase()}`}
                    >
                      <div>{score.pointsDescription}</div>
                      <div>{score.points}</div>
                    </Card.PlayerPoints>
                  ))}
                  <Card.DeleteButton
                    tagKey={`delete-${player.playerName.toLowerCase()}`}
                    action={() => {
                      // handleDelete({ matchId: match.matchId });
                    }}
                  />
                </Card>
              ))}
            <Card
              action={handleAddNewMatch}
              dataTestId="add-score-card-test-id"
            >
              <Card.CardTitle>Add Score</Card.CardTitle>
              <Card.AddGameButton
                action={() => {
                  handleAddNewMatch();
                }}
              />
            </Card>
            {showModal && (
              <Popup handleClose={handleCloseModal}>
                <Popup.Header>Add New Score</Popup.Header>
                <Popup.Body>
                  <NewScoreForm
                    refetch={() =>
                      getData(matchId)
                        .then((response) => setMatch(response || ({} as Match)))
                        .finally(() => setShowModal(false))
                    }
                  />
                </Popup.Body>
              </Popup>
            )}
            {selectedPlayer && (
              <Popup handleClose={() => setSelectedPlayer(null)}>
                <Popup.Header>
                  {selectedPlayer.playerName}&apos;s Scores
                </Popup.Header>
                <Popup.Body>
                  {selectedPlayer.score.length > 0 ? (
                    selectedPlayer.score.map((score) => (
                      <div
                        key={`${selectedPlayer.playerName}-${score.pointsDescription}-${score.points}`}
                        className={cardStyles.playerDataPoints}
                      >
                        <div>{score.pointsDescription}</div>
                        <div>{score.points}</div>
                      </div>
                    ))
                  ) : (
                    <div>No scores recorded.</div>
                  )}
                </Popup.Body>
              </Popup>
            )}
          </div>
          <Button
            variant="primary"
            className={styles.formButton}
            onClick={() =>
              downloadFileAsCSV(
                match?.matchDataPoints,
                `${game?.gameName} - Match ${matchId}`,
                game?.gameName
              )
            }
          >
            Download CSV for this match
          </Button>
        </>
      )}
    </div>
  );
};
