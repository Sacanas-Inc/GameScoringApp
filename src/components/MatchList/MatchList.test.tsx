/* eslint-disable global-require */
/* eslint-disable @typescript-eslint/no-var-requires */
import { act } from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { MatchList } from "@components/MatchList/MatchList";

// Mocking react-router-dom hooks
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: jest.fn(),
  useNavigate: () => jest.fn()
}));

// Mocking custom hooks
jest.mock("../../hooks/useGetAllMatchesByGameId", () => ({
  useGetAllMatchesByGameId: () => ({
    matches: [
      {
        matchId: 1,
        matchDataPoints: [{ playerName: "Player1", gamePoints: 10 }]
      }
    ],
    loading: false,
    refetch: jest.fn()
  })
}));

jest.mock("../../hooks/useGetGameById", () => ({
  useGetGameById: () => ({
    game: { gameName: "Test Game" },
    fetchGame: jest.fn()
  })
}));

jest.mock("../../hooks/useDeleteMatchAndDataPoints", () => ({
  useDeleteMatchById: () => ({
    deleteMatch: jest.fn()
  })
}));

describe("MatchList Tests", () => {
  test("Loads and displays title", async () => {
    // Mock useParams to return the expected id
    const useParamsMock = require("react-router-dom").useParams;
    useParamsMock.mockReturnValue({ id: "test" });

    await act(async () => {
      render(
        <MemoryRouter initialEntries={[`/matches/test`]}>
          <Routes>
            <Route path="/matches/:id" element={<MatchList />} />
          </Routes>
        </MemoryRouter>
      );
    });

    // Wait for the element with the text 'Test Game' to appear
    await waitFor(() => {
      const headerElement = screen.getByText(/Test Game/i);
      expect(headerElement).toBeInTheDocument();
    });
  });

  test("Displays a card", async () => {
    const useParamsMock = require("react-router-dom").useParams;
    useParamsMock.mockReturnValue({ id: "test" });

    await act(async () => {
      render(
        <MemoryRouter initialEntries={[`/matches/test`]}>
          <Routes>
            <Route path="/matches/:id" element={<MatchList />} />
          </Routes>
        </MemoryRouter>
      );
    });

    // Wait for the element with the text 'Test Game' to appear
    await waitFor(() => {
      const headerElement = screen.getByTestId(`match-card-1`);
      expect(headerElement).toBeInTheDocument();
    });
  });

  test("Displays add match card", async () => {
    await act(async () => {
      render(
        <MemoryRouter initialEntries={[`/matches/test`]}>
          <Routes>
            <Route path="/matches/:id" element={<MatchList />} />
          </Routes>
        </MemoryRouter>
      );
    });

    // Wait for the element with the text 'Test Game' to appear
    await waitFor(() => {
      const headerElement = screen.getByTestId(`add-match-card-test-id`);
      expect(headerElement).toBeInTheDocument();
    });
  });
});
