import React from "react";
import styles from "./loader.module.scss";
export const Loader = () => {
  return (
    <div
      className={styles.ldsDualRing}
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    ></div>
  );
};
