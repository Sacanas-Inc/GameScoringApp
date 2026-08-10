import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { NewGameForm } from "./NewGameForm";

const mockPostGame = jest.fn();

jest.mock("../../hooks/usePostGame", () => ({
  usePostGame: () => ({
    postGame: mockPostGame,
    loading: false,
    error: null
  })
}));

describe("NewGameForm Tests", () => {
  beforeEach(() => {
    mockPostGame.mockReset();
    mockPostGame.mockResolvedValue({
      id: 1,
      gameName: "Catan",
      gameDescription: "a game"
    });
  });

  test("shows required error when submitting empty form", async () => {
    render(
      <NewGameForm handleClose={jest.fn()} handleGameAdded={jest.fn()} />
    );

    fireEvent.click(screen.getByRole("button", { name: "Submit" }));

    await waitFor(() => {
      expect(screen.getByText("Game Name is required")).toBeInTheDocument();
    });
    expect(mockPostGame).not.toHaveBeenCalled();
  });

  test("submits when game name is provided", async () => {
    const handleGameAdded = jest.fn();
    render(
      <NewGameForm handleClose={jest.fn()} handleGameAdded={handleGameAdded} />
    );

    fireEvent.change(screen.getByPlaceholderText("Enter game name"), {
      target: { value: "Catan" }
    });
    fireEvent.click(screen.getByRole("button", { name: "Submit" }));

    await waitFor(() => {
      expect(mockPostGame).toHaveBeenCalledWith({
        gameName: "Catan",
        gameDescription: ""
      });
    });
    await waitFor(() => {
      expect(handleGameAdded).toHaveBeenCalled();
    });
  });

  test("clears error after typing in the field", async () => {
    render(
      <NewGameForm handleClose={jest.fn()} handleGameAdded={jest.fn()} />
    );

    fireEvent.click(screen.getByRole("button", { name: "Submit" }));
    await waitFor(() => {
      expect(screen.getByText("Game Name is required")).toBeInTheDocument();
    });

    fireEvent.change(screen.getByPlaceholderText("Enter game name"), {
      target: { value: "Catan" }
    });

    await waitFor(() => {
      expect(screen.queryByText("Game Name is required")).not.toBeInTheDocument();
    });
  });
});
