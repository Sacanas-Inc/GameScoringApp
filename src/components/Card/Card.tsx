import { ConfirmDialog } from "primereact/confirmdialog"; // For <ConfirmDialog /> component
import { Toast } from "primereact/toast";
import React, { useRef, useState } from "react";
import styles from "@components/Card/card.module.scss";

const DeleteButton = ({
  children,
  tagKey,
  action
}: {
  children: React.ReactNode;
  tagKey: string;
  action: () => void;
}) => {
  const toast = useRef<Toast>(null);
  const [visible, setVisible] = useState(false);
  const accept = () => {
    if (toast.current == null) return;
    toast.current.show({
      severity: "info",
      summary: "Confirmed",
      detail: "You have accepted",
      life: 3000
    });
  };

  const reject = () => {
    if (toast.current == null) return;
    toast.current.show({
      severity: "warn",
      summary: "Rejected",
      detail: "You have rejected",
      life: 3000
    });
  };

  return (
    <div>
      <Toast
        ref={toast}
        pt={{
          root: {
            onClick: (e) => e.stopPropagation()
          },
          closeButton: {
            onClick: (e) => e.stopPropagation()
          }
        }}
      />
      <ConfirmDialog
        closeOnEscape
        modal
        icon="pi pi-exclamation-triangle"
        tagKey={tagKey}
        visible={visible}
        onHide={() => setVisible(false)}
        message="Are you sure you want to proceed?"
        header="Confirmation"
        accept={() => {
          accept();
          action();
        }}
        reject={() => reject()}
      />
      <button
        type="button"
        className={styles.deleteButton}
        onClick={(e) => {
          e.stopPropagation();
          setVisible(true);
        }}
        aria-controls={visible ? "dlg_confirmation" : undefined}
        aria-expanded={!!visible}
      >
        {children}
      </button>
    </div>
  );
};

const Card = ({
  children,
  className,
  dataTestId,
  action
}: {
  children: React.ReactNode;
  dataTestId: string;
  className?: string;
  action?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}) => (
  <div style={{ position: "relative" }} data-testid={dataTestId}>
    <div className={className || styles.card} onClick={action}>
      {children}
    </div>
  </div>
);

Card.CardTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 className={styles.cardTitle}>{children}</h2>
);

Card.ListMatchButton = ({
  children,
  action
}: {
  children: React.ReactNode;
  action: () => void;
}) => (
  <button type="button" className={styles.listMatchButton} onClick={action}>
    {children}
  </button>
);

Card.AddMatchButton = ({
  children,
  action
}: {
  children: React.ReactNode;
  action: () => void;
}) => (
  <button type="button" className={styles.addMatchButton} onClick={action}>
    {children}
  </button>
);

Card.AddGameButton = ({ action }: { action: () => void }) => (
  // eslint-disable-next-line jsx-a11y/control-has-associated-label
  <button type="button" className={styles.addGameButton} onClick={action} />
);

Card.DeleteButton = ({
  children,
  tagKey,
  action
}: {
  children?: React.ReactNode;
  tagKey: string;
  action: () => void;
}) => (
  <DeleteButton
    tagKey={tagKey}
    action={() => {
      action();
    }}
  >
    {children}
  </DeleteButton>
);

Card.PlayerPoints = ({ children }: { children: React.ReactNode }) => (
  <div className={styles.playerDataPoints}>{children}</div>
);

export default Card;
