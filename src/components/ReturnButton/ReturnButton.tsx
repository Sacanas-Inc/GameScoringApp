import { useNavigate } from "react-router-dom";
import styles from "./returnButton.module.scss";

export const ReturnButton = ({ to }: { to: string }) => {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      className={styles.returnButton}
      onClick={() => navigate(to)}
    >
      {"<"}
    </button>
  );
};
