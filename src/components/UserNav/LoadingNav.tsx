import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import styles from "./UserNav.module.css";

const LoadingNav: React.FC = () => {
  return (
    <div className={styles.loadingContainer}>
      <FontAwesomeIcon icon={faUserCircle} className={styles.userIcon} />
      <p className={styles.loadingText}>Cargando...</p>
    </div>
  );
};

export default LoadingNav;
