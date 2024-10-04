"use client";

import React, { useEffect, useState, Suspense } from "react"; // Agregado Suspense aquí
import { useSearchParams } from "next/navigation";
import styles from "./Cart.module.css";
import Link from "next/link";
import ProductCart from "@/components/Cart/ProductCart/ProductCart";
import useFetchProducts from "@/hooks/useFetchProducts";
import { ICartProduct, IProduct } from "@/data/products/types";
import { useUser } from "@/context/UserContext/UserContext";
import { useRouter } from "next/navigation";
import { useToken } from "@/context/TokenContext/TokenContext";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

const Cart: React.FC = () => {
  const searchParams = useSearchParams();
  const products = useFetchProducts();
  const { user } = useUser();
  const router = useRouter();
  const APIURL = process.env.NEXT_PUBLIC_API_URL;

  const { token } = useToken();

  const productId = searchParams.get("productId");
  const quantityProduct = searchParams.get("quantity");
  const shippingCost = 10;
  const userId = user?.id;
  const [productsToShow, setProductsToShow] = useState<ICartProduct[]>([]);
  const [temporaryProduct, setTemporaryProduct] = useState<ICartProduct[]>([]);

  useEffect(() => {
    if (user && productId) {
      const product: IProduct | undefined = products.find((prod) => prod.id === +productId);
      if (product) {
        const allProductsStr = localStorage.getItem(`cartProduct-${userId}`);
        const allProducts: ICartProduct[] = allProductsStr ? JSON.parse(allProductsStr) : [];
        const productExist = allProducts.find((prod) => prod.id === product.id);

        if (productExist) {
          productExist.quantity = quantityProduct ? +quantityProduct : 1;
        } else {
          allProducts.push({ ...product, quantity: quantityProduct ? +quantityProduct : 1 });
        }

        localStorage.setItem(`cartProduct-${userId}`, JSON.stringify(allProducts));
        setTemporaryProduct(allProducts);
        router.replace("/cart");
      }
    }
  }, [productId, products, user, userId, quantityProduct, router]);

  useEffect(() => {
    if (user) {
      const cartProductsStr = localStorage.getItem(`cartProduct-${userId}`);
      const loadedProducts: ICartProduct[] = cartProductsStr ? JSON.parse(cartProductsStr) : [];
      setProductsToShow(loadedProducts);
    }
  }, [user, userId, temporaryProduct]);

  if (productsToShow.length === 0) {
    return (
      <main className={`${styles.main} ${styles.mainNotProducts}`}>
        <p>No hay productos en el carrito</p>
      </main>
    );
  }

  const handleRemoveProduct = async (id: number) => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "No podrás revertir esta acción.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      const cartProductsStr = localStorage.getItem(`cartProduct-${userId}`);
      const loadedProducts: ICartProduct[] = cartProductsStr ? JSON.parse(cartProductsStr) : [];
      const updatedProducts = loadedProducts.filter((prod) => prod.id !== id);

      localStorage.setItem(`cartProduct-${userId}`, JSON.stringify(updatedProducts));
      setProductsToShow(updatedProducts);

      Swal.fire({
        title: "¡Eliminado!",
        text: "El producto ha sido eliminado del carrito.",
        icon: "success",
        toast: true,
        position: "bottom-end",
        showConfirmButton: false,
        timer: 2500,
        timerProgressBar: true,
        background: "#f0f9ff",
        color: "#0c5460",
        customClass: {
          popup: "swal2-large-toast",
        },
        showClass: {
          popup: "animate__animated animate__fadeInUp",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutDown",
        },
      });
    }
  };

  const calculateProductsSubtotal = () => {
    const cartProductsStr = localStorage.getItem(`cartProduct-${userId}`);
    const allProducts: ICartProduct[] = cartProductsStr ? JSON.parse(cartProductsStr) : [];
    let subTotal = 0;

    allProducts.forEach((prod) => {
      subTotal += prod.price * (prod.quantity || 1);
    });

    return subTotal;
  };

  const calculateProductsTotal = () => calculateProductsSubtotal() + shippingCost;

  const dispatchPurchase = async () => {
    const allCartProductIds = productsToShow.map(({ id }) => id);

    // Alerta de confirmación antes de la compra
    const confirmResult = await Swal.fire({
      title: "¿Listo para completar tu compra?",
      text: "¡Gracias por confiar en nosotros!",
      icon: "info",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      confirmButtonText: "Finalizar compra",
      cancelButtonColor: "#6c757d",
      confirmButtonColor: "#3085d6",
      reverseButtons: true,
    });

    if (confirmResult.isConfirmed) {
      try {
        const response = await fetch(`${APIURL}/orders`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
          body: JSON.stringify({
            userId: user?.id,
            products: allCartProductIds,
          }),
        });

        const data = await response.json();

        Swal.fire({
          title: "Compra realizada con éxito",
          text: "Tu compra ha sido procesada exitosamente.",
          icon: "success",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#6c757d",
          confirmButtonText: "Ver mis compras",
          cancelButtonText: "Seguir comprando",
        }).then((result) => {
          if (result.isConfirmed) {
            router.push("/profile/orders");
          } else {
            router.push("/");
          }
        });

        setProductsToShow([]);
        localStorage.removeItem(`cartProduct-${userId}`);
      } catch (err: any) {
        console.error(err);
        throw new Error(err);
      }
    }
  };

  return (
    <main className={styles.main}>
      <div className={styles.mainContent}>
        <Link href={"/"}>Volver</Link>

        <section className={styles.section}>
          <div className={styles.productsContainer}>
            <h3>Productos del carrito</h3>
            <div className={styles.productsCardsContainer}>
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
          <div className={styles.resumeContainer}>
            <h3>Resumen de compra</h3>
            <div className={styles.resumeMainContent}>
              <div className={styles.itemRow}>
                <p>Productos</p>
                <p className={styles.price}>$ {calculateProductsSubtotal()}</p>
              </div>
              <div className={styles.itemRow}>
                <p>Envío</p>
                <p className={styles.price}>$ {shippingCost}</p>
              </div>
              <div className={`${styles.itemRow} ${styles.totalContainer}`}>
                <p>Total</p>
                <p className={styles.price}>$ {calculateProductsTotal()}</p>
              </div>
              <button className={styles.continueButton} onClick={dispatchPurchase}>
                Continuar compra
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

const CartWrapper = () => (
  <Suspense fallback={<div>Cargando...</div>}>
    <Cart />
  </Suspense>
);

export default CartWrapper;
