/* eslint-disable testing-library/no-unnecessary-act */
import { act } from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { MatchScoring } from "./MatchScoring";

// Mocking react-router-dom hooks
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({ id: 1, matchId: 3 }),
  useNavigate: () => jest.fn(),
}));

jest.mock("../../hooks/useDownloadAsCSV", () => ({
  useDownloadAsCSV: () => ({
    downloadFileAsCSV: jest.fn(),
  }),
}));

jest.mock("../../hooks/useGetGameById", () => ({
  useGetGameById: () => ({
    game: {
      id: 1,
      gameName: "hadara",
      gameDescription: "none",
      minPlayers: 2,
      maxPlayers: 4,
      averageDuration: 60,
      matches: [],
    },
    fetchGame: jest.fn(),
    loading: false,
  }),
}));

jest.mock("../../hooks/useGetMatchById", () => ({
  useGetMatchById: () => ({
    getData: () =>
      Promise.resolve({
        gameId: 1,
        matchDataPoints: [
          {
            gameId: 1,
            gameName: "Hadara",
            matchId: 3,
            playerName: "Miguel",
            gamePoints: 12,
            pointsDescription: "Bustos",
          },
        ],
        matchDate: new Date(),
        matchId: 3,
        notes: "",
      }),
    loading: false,
  }),
}));

describe("MatchScoring Tests", () => {
  test("Loads and displays title", async () => {
    await act(async () => {
      render(
        <MemoryRouter initialEntries={[`/matches/1/scoring/3`]}>
          <Routes>
            <Route path="/matches/1/scoring/3" element={<MatchScoring />} />
          </Routes>
        </MemoryRouter>
      );
    });

    // Wait for the element with the text 'Test Game' to appear
    await waitFor(() => {
      const headerElement = screen.getByTestId("game-title-data-test-id");
      expect(headerElement).toBeInTheDocument();
    });
  });

  test("Displays a card", async () => {
    await act(async () => {
      render(
        <MemoryRouter initialEntries={[`/matches/1/scoring/3`]}>
          <Routes>
            <Route path="/matches/1/scoring/3" element={<MatchScoring />} />
          </Routes>
        </MemoryRouter>
      );
    });

    // Wait for the element with the text 'Test Game' to appear
    await waitFor(() => {
      const headerElement = screen.getByTestId(`score-card-3`);
      expect(headerElement).toBeInTheDocument();
    });
  });
  test("Displays add game card", async () => {
    await act(async () => {
      render(
        <MemoryRouter initialEntries={[`/matches/1/scoring/3`]}>
          <Routes>
            <Route path="/matches/1/scoring/3" element={<MatchScoring />} />
          </Routes>
        </MemoryRouter>
      );
    });

    // Wait for the element with the text 'Test Game' to appear
    await waitFor(() => {
      const headerElement = screen.getByTestId(`add-score-card-test-id`);
      expect(headerElement).toBeInTheDocument();
    });
  });
});
