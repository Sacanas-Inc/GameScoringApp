import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import NewGameFormModal from "./NewGameFormModal";

const mockPostGame = jest.fn();

jest.mock("../hooks/usePostGame", () => ({
  usePostGame: () => ({
    postGame: mockPostGame,
    loading: false,
    error: null
  })
}));

describe("NewGameFormModal Tests", () => {
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
      <NewGameFormModal onClose={jest.fn()} onGameAdded={jest.fn()} />
    );

    fireEvent.click(screen.getByRole("button", { name: "Submit" }));

    await waitFor(() => {
      expect(screen.getByText("Game Name is required")).toBeInTheDocument();
    });
    expect(mockPostGame).not.toHaveBeenCalled();
  });

  test("submits when game name is provided", async () => {
    const onGameAdded = jest.fn();
    render(
      <NewGameFormModal onClose={jest.fn()} onGameAdded={onGameAdded} />
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
      expect(onGameAdded).toHaveBeenCalledWith("Catan");
    });
  });
});