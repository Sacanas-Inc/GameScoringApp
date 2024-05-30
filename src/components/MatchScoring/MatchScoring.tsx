import styles from "../../styles/grid-styles.module.scss";
import { Form } from "../Form";
import { Grid } from "../Grid";
import { useDownloadAsCSV } from "../../hooks/useDownloadAsCSV";
import { useNavigate, useParams } from "react-router-dom";
import { useGetMatchById } from "../../hooks/useGetMatchById";
import { useEffect, useState } from "react";
import { Loader } from "../Loader/Loader";
import { Match } from "../../utils/types";
import { useGetGameById } from "../../hooks/useGetGameById";

export const MatchScoring = () => {
  const { downloadFileAsCSV } = useDownloadAsCSV();
  const navigate = useNavigate();
  const { id = 0, matchId = 0 } = useParams();
  const { game, fetchGame } = useGetGameById();
  const { getData, loading } = useGetMatchById();

  const [match, setMatch] = useState<Match>({} as Match);

  useEffect(() => {
    getData(matchId).then((response) => {
      setMatch(response);
    });
    fetchGame({ gameId: id });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <h1 style={{ textAlign: "center" }}>
        {game !== undefined && `${game?.gameName} - Match ${matchId}`}
      </h1>
      {loading && !match ? (
        <Loader />
      ) : (
        <>
          <button
            className={styles.returnButton}
            onClick={() => {
              navigate(`/matches/${id}`);
            }}
          >
            {"<"}
          </button>

          <div className={styles.gridContainer}>
            {/* <GamesComboBox /> */}
            {/* <SearchBar handleSearch={handleSearch} /> */}
            <Grid games={match?.matchDataPoints} />
            <Form
              refetch={() =>
                getData(matchId).then((response) => setMatch(response))
              }
            />
            <button
              className={styles.formButton}
              onClick={() => downloadFileAsCSV(match?.matchDataPoints)}
            >
              Download File
            </button>
          </div>
        </>
      )}
    </>
  );
};
