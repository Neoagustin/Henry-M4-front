import React from "react";
import styles from "@/app/cart/Cart.module.css";
import Image from "next/image";
import { ProductCartProps } from "@/app/cart/types";

const ProductCart: React.FC<ProductCartProps> = ({
  productToShow,
  quantityProduct,
  handleRemoveProduct,
}) => {
  return (
    <div className={styles.product}>
      <div className={styles.productImgContainer}>
        <Image src={productToShow.image} alt="Producto seleccionado" width={150} height={150} />
      </div>
      <div className={styles.productDetailContainer}>
        <div className={styles.productInfo}>
          <h4 className={styles.productName}>{productToShow.name}</h4>
          <p className={`${styles.amount} ${styles.desktop}`}>Cantidad: {quantityProduct}</p>
          <h4 className={styles.productPrice}>$ {productToShow.price * quantityProduct}</h4>
        </div>

        <p className={`${styles.amount} ${styles.mobile}`}>Cantidad: {quantityProduct}</p>

        <p className={styles.productColor}>Color: Blanco</p>
        <button
          className={styles.removeButton}
          onClick={() => handleRemoveProduct(productToShow.id)}
        >
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default ProductCart;
