import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";
import React, { useState, useRef } from "react";

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
  return <DeleteButton children={children} action={action} />;
};

Card.PlayerPoints = ({ children }: { children: React.ReactNode }) => {
  return <div className={styles.playerDataPoints}>{children}</div>;
};

export default Card;

const DeleteButton = ({
  children,
  action,
}: {
  children: React.ReactNode;
  action: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}) => {
  const [visible, setVisible] = useState<boolean>(false);
  const toast = useRef<Toast>(null);

  const accept = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (toast.current == null) return;
    toast.current.show({
      severity: "info",
      summary: "Confirmed",
      detail: "You have accepted",
      life: 3000,
    });
    action(e);
  };

  const reject = () => {
    if (toast.current == null) return;
    toast.current.show({
      severity: "warn",
      summary: "Rejected",
      detail: "You have rejected",
      life: 3000,
    });
  };

  const confirm1 = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    confirmDialog({
      message: "Are you sure you want to proceed?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      accept: () => accept(e),
      reject,
    });
  };

  return (
    <div>
      <Toast ref={toast} />
      <ConfirmDialog />
      <button
        className={styles.deleteButton}
        onClick={(e) => {
          confirm1(e);
        }}
      >
        {children}
      </button>
    </div>
  );
};
