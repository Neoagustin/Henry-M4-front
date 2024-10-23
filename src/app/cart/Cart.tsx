"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import styles from "./Cart.module.css";
import Link from "next/link";
import ProductCart from "@/components/Cart/ProductCart/ProductCart";
import useFetchProducts from "@/hooks/useFetchProducts";
import { useCart } from "@/hooks/useCart";
import CartSummary from "@/components/Cart/CartSummary/CartSummary";

const Cart: React.FC = () => {
  const searchParams = useSearchParams();
  const products = useFetchProducts();

  //? Obtenemos el ID y la cantidad del producto desde los parámetros de búsqueda
  const productId = searchParams.get("productId");
  const quantityProduct = searchParams.get("quantity");

  //? Usamos el hook (useCart) para manejar la lógica del carrito
  const {
    dispatchPurchase,
    productsToShow,
    handleRemoveProduct,
    calculateProductsSubtotal,
    calculateProductsTotal,
  } = useCart(products, productId, quantityProduct);

  //? Si no hay productos en el carrito, mostramos un mensaje correspondiente
  if (productsToShow.length === 0) {
    return (
      <main className={`${styles.main} ${styles.mainNotProducts}`}>
        <p>No hay productos en el carrito</p>
      </main>
    );
  }

  return (
    <main className={styles.main}>
      <div className={styles.mainContent}>
        <Link href={"/"}>Volver</Link>
        <section className={styles.section}>
          <div className={styles.productsContainer}>
            <h3>Productos del carrito</h3>
            <div className={styles.productsCardsContainer}>
              {/* Renderizamos cada producto del carrito usando el componente ProductCart */}
              {productsToShow.map((productToShow) => (
                <ProductCart
                  key={productToShow.id}
                  productToShow={productToShow}
                  quantityProduct={productToShow.quantity}
                  handleRemoveProduct={handleRemoveProduct}
                />
              ))}
            </div>
          </div>
          <CartSummary
            //? Calculamos el subTotal
            subtotal={calculateProductsSubtotal()}
            //? Calculamos el Total
            total={calculateProductsTotal()}
            //? Manejamos la acción de compra
            onPurchase={dispatchPurchase}
          />
        </section>
      </div>
    </main>
  );
};

//? Componente que envuelve el carrito en un Suspense para manejar la carga asíncrona
const CartWrapper = () => (
  <Suspense fallback={<div>Cargando...</div>}>
    <Cart />
  </Suspense>
);

export default CartWrapper;
