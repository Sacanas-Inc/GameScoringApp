import { act } from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { GameList } from "@components/GameList/GameList";

// Mocking react-router-dom hooks
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: jest.fn(),
  useNavigate: () => jest.fn()
}));

jest.mock("../../hooks/useGetAllGames", () => ({
  useGetAllGames: () => ({
    games: [
      {
        id: 1,
        gameName: "hadara",
        gameDescription: "none",
        minPlayers: 2,
        maxPlayers: 4,
        averageDuration: 60,
        matches: []
      }
    ],
    fetchGame: jest.fn(),
    loading: false
  })
}));

jest.mock("../../hooks/useDeleteMatchAndDataPoints", () => ({
  useDeleteMatchById: () => ({
    deleteMatch: jest.fn()
  })
}));

describe("GameList Tests", () => {
  test("Loads and displays title", async () => {
    await act(async () => {
      render(
        <MemoryRouter initialEntries={[`/`]}>
          <Routes>
            <Route path="/" element={<GameList />} />
          </Routes>
        </MemoryRouter>
      );
    });

    // Wait for the element with the text 'Test Game' to appear
    await waitFor(() => {
      const headerElement = screen.getByTestId("app-title-data-test-id");
      expect(headerElement).toBeInTheDocument();
    });
  });

  test("Displays a card", async () => {
    await act(async () => {
      render(
        <MemoryRouter initialEntries={[`/`]}>
          <Routes>
            <Route path="/" element={<GameList />} />
          </Routes>
        </MemoryRouter>
      );
    });

    // Wait for the element with the text 'Test Game' to appear
    await waitFor(() => {
      const headerElement = screen.getByTestId(`game-card-1`);
      expect(headerElement).toBeInTheDocument();
    });
  });
  test("Displays add game card", async () => {
    await act(async () => {
      render(
        <MemoryRouter initialEntries={[`/`]}>
          <Routes>
            <Route path="/" element={<GameList />} />
          </Routes>
        </MemoryRouter>
      );
    });

    // Wait for the element with the text 'Test Game' to appear
    await waitFor(() => {
      const headerElement = screen.getByTestId(`game-card-add-test-id`);
      expect(headerElement).toBeInTheDocument();
    });
  });
});
