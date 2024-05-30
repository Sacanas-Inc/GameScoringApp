import React from "react";
import { createPortal } from "react-dom";

const portalRoot = document.getElementById("portal-root");

export const Portal = ({ children }: { children: React.ReactNode }) => {
  return createPortal(children, portalRoot as HTMLElement);
};
