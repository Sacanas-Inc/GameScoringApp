import { useNavigate, useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { Match, MatchDataPoints } from "@utils/types";
import { toPascalCase } from "@utils/helpers";
import styles from "../../styles/grid-styles.module.scss";
import { useDownloadAsCSV } from "../../hooks/useDownloadAsCSV";
import { useGetMatchById } from "../../hooks/useGetMatchById";
import { Loader } from "../Loader/Loader";
import { useGetGameById } from "../../hooks/useGetGameById";
import Card from "../Card/Card";
import Popup from "../Popup/Popup";
import { NewScoreForm } from "../NewGameForm/NewScoreForm";

export const MatchScoring = () => {
  const { downloadFileAsCSV } = useDownloadAsCSV();
  const navigate = useNavigate();
  const { id = 0, matchId = 0 } = useParams();
  const { game, fetchGame } = useGetGameById();
  const { getData, loading } = useGetMatchById();

  const [showModal, setShowModal] = useState<boolean>(false);
  const [match, setMatch] = useState<Match>({} as Match);

  useEffect(() => {
    getData(matchId).then((response) => {
      setMatch(response);
    });
    fetchGame({ gameId: id });
  }, []);

  const handleAddNewMatch = () => {
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleScoreData = (data: MatchDataPoints[]) => {
    const result: {
      playerName: string;
      score: { pointsDescription: string; points: number }[];
    }[] = [];

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
    <>
      <h1 style={{ textAlign: "center" }} data-testid="game-title-data-test-id">
        {game !== undefined && `${game?.gameName} - Match ${matchId}`}
      </h1>
      {loading && !match.matchDataPoints && match === ({} as Match) ? (
        <Loader />
      ) : (
        <>
          <button
            type="button"
            className={styles.returnButton}
            onClick={() => {
              navigate(`/matches/${id}`);
            }}
          >
            {"<"}
          </button>
          <div className={styles.gridContainer}>
            {match?.matchDataPoints?.length > 0 &&
              handleScoreData(match?.matchDataPoints)?.map((player) => (
                <Card
                  key={player.playerName.toLowerCase()}
                  dataTestId={`score-card-${match.matchId}`}
                  action={() => {
                    console.warn("Not implemented yet");
                  }}
                >
                  <Card.CardTitle>{player.playerName}</Card.CardTitle>
                  {player.score.map((score) => (
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
                  console.warn("Not implemented yet!");
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
                        .then((response) => setMatch(response))
                        .finally(() => setShowModal(false))
                    }
                  />
                </Popup.Body>
              </Popup>
            )}
          </div>
          <Button
            variant="primary"
            className={styles.formButton}
            onClick={() => downloadFileAsCSV(match?.matchDataPoints)}
          >
            Download File
          </Button>
        </>
      )}
    </>
  );
};
