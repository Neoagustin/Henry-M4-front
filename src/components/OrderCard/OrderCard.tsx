import React from "react";
import styles from "../../app/profile/orders/Orders.module.css";
import Image from "next/image";
import { IOrderCardProps } from "./types";

const OrderCard: React.FC<IOrderCardProps> = ({ order }) => {
  return (
    <div key={order.id} className={styles.orderCard}>
      <div className={styles.orderHeader}>
        <span className={styles.orderDate}>{new Date(order.date).toLocaleDateString()}</span>
        <span className={`${styles.status} ${styles.status}`}>{order.status}</span>
      </div>
      <div className={styles.products}>
        {order.products.map((product) => (
          <div key={product.id} className={styles.productRow}>
            <div>
              <Image
                src={product.image}
                alt={product.name}
                width={50}
                height={50}
                className={styles.productImage}
              />
              <span className={styles.productName}>{product.name}</span>
            </div>
            <span className={styles.price}>${product.price}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderCard;
