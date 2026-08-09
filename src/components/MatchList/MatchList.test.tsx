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
  useGetAllMatchesByGameId: jest.fn(() => ({
    matches: [
      {
        matchId: 1,
        matchDataPoints: [{ playerName: "Player1", gamePoints: 10 }]
      }
    ],
    loading: false,
    refetch: jest.fn()
  }))
}));

jest.mock("../../hooks/useGetGameById", () => ({
  useGetGameById: () => ({
    game: { gameName: "Test Game", gameDescription: "A card drafting game" },
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

  test("Displays match notes", async () => {
    const useGetAllMatchesByGameIdMock =
      require("../../hooks/useGetAllMatchesByGameId").useGetAllMatchesByGameId;
    useGetAllMatchesByGameIdMock.mockImplementationOnce(() => ({
      matches: [
        { matchId: 99, matchDataPoints: [], notes: "Tiebreaker on Sunday" }
      ],
      loading: false,
      refetch: jest.fn()
    }));

    await act(async () => {
      render(
        <MemoryRouter initialEntries={[`/matches/test`]}>
          <Routes>
            <Route path="/matches/:id" element={<MatchList />} />
          </Routes>
        </MemoryRouter>
      );
    });

    await waitFor(() => {
      const notes = screen.getByTestId(`match-notes-99`);
      expect(notes).toHaveTextContent("Tiebreaker on Sunday");
    });
  });

  test("Displays game description", async () => {
    await act(async () => {
      render(
        <MemoryRouter initialEntries={[`/matches/test`]}>
          <Routes>
            <Route path="/matches/:id" element={<MatchList />} />
          </Routes>
        </MemoryRouter>
      );
    });

    await waitFor(() => {
      const description = screen.getByTestId("game-description-page-test-id");
      expect(description).toHaveTextContent("A card drafting game");
    });
  });
});
