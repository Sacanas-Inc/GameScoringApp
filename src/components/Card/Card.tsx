import styles from "./card.module.scss";
const Card = ({
  children,
  className,
  action,
}: {
  children: React.ReactNode;
  className?: string;
  action?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}) => {
  return (
    <div style={{ position: "relative" }}>
      <div className={className ? className : styles.card} onClick={action}>
        {children}
      </div>
    </div>
  );
};

Card.CardTitle = ({ children }: { children: React.ReactNode }) => {
  return <h2 className={styles.cardTitle}>{children}</h2>;
};

Card.ListMatchButton = ({
  children,
  action,
}: {
  children: React.ReactNode;
  action: () => void;
}) => {
  return (
    <button className={styles.listMatchButton} onClick={action}>
      {children}
    </button>
  );
};

Card.AddMatchButton = ({
  children,
  action,
}: {
  children: React.ReactNode;
  action: () => void;
}) => {
  return (
    <button className={styles.addMatchButton} onClick={action}>
      {children}
    </button>
  );
};

Card.AddGameButton = ({ action }: { action: () => void }) => {
  return <button className={styles.addGameButton} onClick={action}></button>;
};

Card.DeleteButton = ({
  children,
  action,
}: {
  children?: React.ReactNode;
  action: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}) => {
  return (
    <button className={styles.deleteButton} onClick={action}>
      {children}
    </button>
  );
};

Card.PlayerPoints = ({ children }: { children: React.ReactNode }) => {
  return <div className={styles.playerDataPoints}>{children}</div>;
};

export default Card;
