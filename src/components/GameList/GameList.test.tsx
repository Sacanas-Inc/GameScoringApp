import { act } from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { GameList } from "@components/GameList/GameList";
import { Game } from "@utils/types";
import GlobalContext from "../../context/globalContext";

// Mocking react-router-dom hooks
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: jest.fn(),
  useNavigate: () => jest.fn()
}));

const mockGames: Game[] = [
  {
    id: 1,
    gameName: "hadara",
    gameDescription: "none",
    minPlayers: 2,
    maxPlayers: 4,
    averageDuration: 60,
    matches: []
  }
];

const renderGameList = () => {
  const contextValue = {
    games: mockGames,
    matches: [],
    matchDataPoints: [],
    selectedGame: -1,
    selectedMatch: -1,
    setGames: jest.fn(),
    setMatches: jest.fn(),
    setMatchDataPoints: jest.fn(),
    setSelectedGame: jest.fn(),
    setSelectedMatch: jest.fn()
  };
  return render(
    <GlobalContext.Provider value={contextValue}>
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route path="/" element={<GameList />} />
        </Routes>
      </MemoryRouter>
    </GlobalContext.Provider>
  );
};

jest.mock("../../hooks/useGetAllGames", () => ({
  useGetAllGames: () => ({
    games: mockGames,
    fetchGame: jest.fn(),
    loading: false,
    refetchGames: jest.fn()
  })
}));

jest.mock("../../hooks/useDeleteMatchAndDataPoints", () => ({
  useDeleteMatchById: () => ({
    deleteMatch: jest.fn()
  })
}));

jest.mock("../../hooks/useDeleteGameById", () => ({
  useDeleteGameById: () => ({
    deleteGame: jest.fn(),
    loading: false,
    error: null
  })
}));

describe("GameList Tests", () => {
  test("Loads and displays title", async () => {
    await act(async () => {
      renderGameList();
    });

    // Wait for the element with the text 'Test Game' to appear
    await waitFor(() => {
      const headerElement = screen.getByTestId("app-title-data-test-id");
      expect(headerElement).toBeInTheDocument();
    });
  });

  test("Displays a card", async () => {
    await act(async () => {
      renderGameList();
    });

    // Wait for the element with the text 'Test Game' to appear
    await waitFor(() => {
      const headerElement = screen.getByTestId(`game-card-1`);
      expect(headerElement).toBeInTheDocument();
    });
  });
  test("Displays add game card", async () => {
    await act(async () => {
      renderGameList();
    });

    // Wait for the element with the text 'Test Game' to appear
    await waitFor(() => {
      const headerElement = screen.getByTestId(`game-card-add-test-id`);
      expect(headerElement).toBeInTheDocument();
    });
  });

  test("Displays game description", async () => {
    await act(async () => {
      renderGameList();
    });

    await waitFor(() => {
      const description = screen.getByTestId(`game-description-1`);
      expect(description).toHaveTextContent("none");
    });
  });
});
