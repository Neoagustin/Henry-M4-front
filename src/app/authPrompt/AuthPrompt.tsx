// components/AuthPrompt.tsx
import React from "react";
import Link from "next/link";
import styles from "./AuthPrompt.module.css";

const AuthPrompt: React.FC = () => {
  return (
    <div className={styles.promptContainer}>
      <div className={styles.promptChildContainer}>
        <h2 className={styles.title}>¡Hola!</h2>
        <p className={styles.message}>Para comprar, ingresá a tu cuenta</p>
        <div className={styles.buttonContainer}>
          <Link href="/register" className={styles.registerButton}>
            Crear cuenta
          </Link>
          <Link href="/login" className={styles.loginButton}>
            Ingresar
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AuthPrompt;
