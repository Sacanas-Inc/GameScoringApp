import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "@components/MatchList/matchList.module.scss";
import Card from "@components/Card/Card";
import { MatchDataPoints } from "@utils/types";
import Popup from "@components/Popup/Popup";
import { NewMatchForm } from "@components/NewGameForm/NewMatchForm";
import { Loader } from "@components/Loader/Loader";
import { useGetAllMatchesByGameId } from "@hooks/useGetAllMatchesByGameId";
import { useGetGameById } from "@hooks/useGetGameById";
import { useDeleteMatchById } from "@hooks/useDeleteMatchAndDataPoints";
import { toPascalCase } from "@utils/helpers";

export const MatchList = () => {
  const { id = 0 } = useParams();
  const { matches, loading, refetch } = useGetAllMatchesByGameId(id);
  const { game, fetchGame } = useGetGameById();
  const { deleteMatch } = useDeleteMatchById();
  const [showModal, setShowModal] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchGame({ gameId: id });
  }, []);

  const handleAddNewMatch = () => {
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleDelete = async ({ matchId }: { matchId: number }) => {
    await deleteMatch({ matchId });
    refetch();
  };

  const handleMatchAdded = () => {
    refetch();
    handleCloseModal(); // Close the modal
  };

  const handleMatchData = (matchData: MatchDataPoints[]) => {
    const playerPointsMap: { [key: string]: number } = matchData.reduce(
      (acc, current) => {
        if (acc[toPascalCase(current.playerName)]) {
          acc[toPascalCase(current.playerName)] += current.gamePoints;
        } else {
          acc[toPascalCase(current.playerName)] = current.gamePoints;
        }
        return acc;
      },
      {} as { [key: string]: number }
    );

    return Object.entries(playerPointsMap).map(([playerName, totalPoints]) => ({
      playerName,
      totalPoints
    }));
  };
  const handleGotoMatches = (matchId: string | number) => {
    navigate(`/matches/${id}/scoring/${matchId}`);
  };
  return (
    <>
      <h1 style={{ textAlign: "center" }}>
        {game !== undefined && game?.gameName}
      </h1>
      {loading ? (
        <Loader />
      ) : (
        <>
          <button
            type="button"
            className={styles.returnButton}
            onClick={() => {
              navigate(`/`);
            }}
          >
            {"<"}
          </button>
          <div className={styles.matchList}>
            {matches.length > 0 &&
              matches?.map((match, index) => (
                <Card
                  key={match.matchId}
                  dataTestId={`match-card-${match.matchId}`}
                  action={() => {
                    handleGotoMatches(match?.matchId);
                  }}
                >
                  <Card.CardTitle>Match {match.matchId}</Card.CardTitle>
                  {handleMatchData(match.matchDataPoints)?.map(
                    (matchDataPoint) => (
                      <Card.PlayerPoints key={matchDataPoint.playerName}>
                        <div>{matchDataPoint.playerName}</div>
                        <div>{matchDataPoint.totalPoints}</div>
                      </Card.PlayerPoints>
                    )
                  )}
                  <Card.DeleteButton
                    tagKey={`delete-${match.matchId}-${index}`}
                    action={() => {
                      handleDelete({ matchId: match.matchId });
                    }}
                  />
                </Card>
              ))}
            <Card
              action={handleAddNewMatch}
              dataTestId="add-match-card-test-id"
            >
              <Card.CardTitle>Add Match</Card.CardTitle>
              <Card.AddGameButton
                action={() => {
                  console.warn("Not implemented!");
                }}
              />
            </Card>
            {showModal && (
              <Popup handleClose={handleCloseModal}>
                <Popup.Header>Add New Game</Popup.Header>
                <Popup.Body>
                  <NewMatchForm
                    gameId={parseInt(id.toString(), 10)}
                    handleClose={handleCloseModal}
                    handleMatchAdded={handleMatchAdded}
                  />
                </Popup.Body>
              </Popup>
            )}
          </div>
        </>
      )}
    </>
  );
};
