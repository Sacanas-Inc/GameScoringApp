import styles from "./card.module.scss";
const Card = ({ children }: { children: React.ReactNode }) => {
  return <div className={styles.card}>{children}</div>;
};

Card.CardTitle = ({ title }: { title: string }) => {
  return <h2 className={styles.cardTitle}>{title}</h2>;
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
  children: React.ReactNode;
  action: () => void;
}) => {
  return (
    <button className={styles.deleteButton} onClick={action}>
      {children}
    </button>
  );
};

export default Card;
