import React from "react";
import { Modal } from "react-bootstrap"; // Import Bootstrap components

const Popup = ({
  children,
  handleClose,
}: {
  children: React.ReactNode;
  handleClose: () => void;
}) => (
    <Modal show onHide={handleClose}>
      {children}
    </Modal>
  );

Popup.Header = ({ children }: { children: React.ReactNode }) => (
    <Modal.Header closeButton>
      <Modal.Title>{children}</Modal.Title>
    </Modal.Header>
  );

Popup.Body = ({ children }: { children: React.ReactNode }) => <Modal.Body>{children}</Modal.Body>;
export default Popup;
