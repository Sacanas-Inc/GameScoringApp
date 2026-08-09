import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { NewScoreForm } from "./NewScoreForm";

const mockPostData = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({ matchId: 3 })
}));

jest.mock("../../hooks/usePostMatchDataPoints", () => ({
  usePostMatchDataPoints: () => ({
    postData: mockPostData,
    loading: false,
    error: null
  })
}));

describe("NewScoreForm Tests", () => {
  beforeEach(() => {
    mockPostData.mockReset();
    mockPostData.mockResolvedValue({});
  });

  test("shows required errors when submitting empty form", async () => {
    render(<NewScoreForm refetch={jest.fn()} />);

    fireEvent.click(screen.getByRole("button", { name: "Submit" }));

    await waitFor(() => {
      expect(screen.getByText("Player Name is required")).toBeInTheDocument();
    });
    
    expect(mockPostData).not.toHaveBeenCalled();
  });


  test("submits when player name and numeric game points are provided", async () => {
    const refetch = jest.fn();
    render(<NewScoreForm refetch={refetch} />);

    fireEvent.change(screen.getByPlaceholderText("Player Name"), {
      target: { value: "Miguel" }
    });
    fireEvent.change(screen.getByPlaceholderText("Game Points"), {
      target: { value: "12" }
    });
    fireEvent.change(screen.getByPlaceholderText("Points Description"), {
      target: { value: "Bustos" }
    });
    fireEvent.click(screen.getByRole("button", { name: "Submit" }));

    await waitFor(() => {
      expect(mockPostData).toHaveBeenCalledWith(
        {
          playerName: "Miguel",
          gamePoints: "12",
          pointsDescription: "Bustos"
        },
        3
      );
    });
    await waitFor(() => {
      expect(refetch).toHaveBeenCalled();
    });
  });
});