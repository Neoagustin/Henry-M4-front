// Wrapper.tsx
import React from "react";
import styles from "./Wrapper.module.css";

const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className={styles.wrapper}>{children}</div>;
};

export default Wrapper;
