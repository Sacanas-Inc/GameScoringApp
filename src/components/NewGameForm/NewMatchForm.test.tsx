import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { NewMatchForm } from "./NewMatchForm";

const mockPostMatch = jest.fn();

jest.mock("../../hooks/usePostMatch", () => ({
  usePostMatch: () => ({
    postMatch: mockPostMatch,
    loading: false,
    error: null
  })
}));

describe("NewMatchForm Tests", () => {
  beforeEach(() => {
    mockPostMatch.mockReset();
    mockPostMatch.mockResolvedValue({
      matchId: 1,
      matchDataPoints: [],
      notes: ""
    });
  });

  test("submits with empty notes since notes are optional", async () => {
    render(
      <NewMatchForm gameId={1} handleClose={jest.fn()} handleMatchAdded={jest.fn()} />
    );

    fireEvent.click(screen.getByRole("button", { name: "Submit" }));

    await waitFor(() => {
      expect(mockPostMatch).toHaveBeenCalledWith({ gameId: 1, notes: "" });
    });
  });

  test("passes notes through on submit", async () => {
    const handleMatchAdded = jest.fn();
    render(
      <NewMatchForm gameId={1} handleClose={jest.fn()} handleMatchAdded={handleMatchAdded} />
    );

    fireEvent.change(screen.getByPlaceholderText("Enter notes"), {
      target: { value: "great game" }
    });
    fireEvent.click(screen.getByRole("button", { name: "Submit" }));

    await waitFor(() => {
      expect(mockPostMatch).toHaveBeenCalledWith({
        gameId: 1,
        notes: "great game"
      });
    });
    await waitFor(() => {
      expect(handleMatchAdded).toHaveBeenCalled();
    });
  });
});