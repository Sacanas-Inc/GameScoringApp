import styles from "@components/Loader/loader.module.scss";

export const Loader = () => (
  <div
    className={styles.ldsDualRing}
    style={{
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)"
    }}
  />
);
