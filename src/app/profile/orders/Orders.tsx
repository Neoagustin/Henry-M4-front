"use client";

import React, { useEffect, useState } from "react";
import styles from "./Orders.module.css";
import OrderCard from "@/components/OrderCard/OrderCard";
import { IOrder } from "./types";
import { useToken } from "@/context/TokenContext/TokenContext";

const Orders: React.FC = () => {
  const APIURL = process.env.NEXT_PUBLIC_API_URL;
  const { token } = useToken();
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const showOrders = async () => {
      if (!isClient || !token) return;

      try {
        const response = await fetch(`${APIURL}/users/orders`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        const sortedOrders = data.sort((a: IOrder, b: IOrder) => {
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        });
        setOrders(sortedOrders);
      } catch (err: any) {
        console.log(err);
        throw new Error(err);
      }
    };

    showOrders();
  }, [APIURL, token, isClient]);

  if (orders.length === 0) {
    return (
      <main className={`${styles.main} ${styles.mainNotOrders}`}>
        <p>No has realizado compras aún.</p>
      </main>
    );
  }

  return (
    <main className={styles.main}>
      <div className={styles.mainContainer}>
        <div className={styles.headerRow}>
          <div className={styles.headerCell}>
            <h2>Historial de compras</h2>
          </div>
        </div>
        <div className={styles.ordersContainer}>
          {orders.map((order: IOrder) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default Orders;
