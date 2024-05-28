// components/NewGameButton.tsx
import React from "react";

interface NewGameButtonProps {
  onClick: () => void;
}

const NewGameButton: React.FC<NewGameButtonProps> = ({ onClick }) => {
  return (
    <button className="rectangular-button" onClick={onClick}>
      Add Game
    </button>
  );
};

export default NewGameButton;
