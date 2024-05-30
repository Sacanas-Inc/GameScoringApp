import React, { Children } from "react";
import { Modal } from "react-bootstrap"; // Import Bootstrap components

const Popup = ({
  children,
  handleClose,
}: {
  children: React.ReactNode;
  handleClose: () => void;
}) => {
  return (
    <Modal show={true} onHide={handleClose}>
      {children}
    </Modal>
  );
};

Popup.Header = ({ children }: { children: React.ReactNode }) => {
  return (
    <Modal.Header closeButton>
      <Modal.Title>{children}</Modal.Title>
    </Modal.Header>
  );
};

Popup.Body = ({ children }: { children: React.ReactNode }) => {
  return <Modal.Body>{children}</Modal.Body>;
};
export default Popup;
