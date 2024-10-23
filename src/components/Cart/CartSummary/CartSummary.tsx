import React from "react";
import styles from "../../../app/cart/Cart.module.css";
import { CartSummaryProps } from "./types";

const CartSummary: React.FC<CartSummaryProps> = ({ subtotal, total, onPurchase }) => {
  return (
    <div className={styles.resumeContainer}>
      <h3>Resumen de compra</h3>
      <div className={styles.resumeMainContent}>
        <div className={styles.itemRow}>
          <p>Productos</p>
          <p className={styles.price}>$ {subtotal}</p>
        </div>
        <div className={styles.itemRow}>
          <p>Envío</p>
          <p className={styles.price}>$ 10</p>
        </div>
        <div className={`${styles.itemRow} ${styles.totalContainer}`}>
          <p>Total</p>
          <p className={styles.price}>$ {total}</p>
        </div>
        <button className={styles.continueButton} onClick={onPurchase}>
          Continuar compra
        </button>
      </div>
    </div>
  );
};

export default CartSummary;
