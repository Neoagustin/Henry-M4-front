"use client";

// Vendor
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

// Types
import { IProduct } from "@/data/products/types";
import Params from "./types";

// Images
import PhoneImg from "@/assets/img/PhoneImg.png";

// Styles
import styles from "./SlugProductDetail.module.css";
import { useToken } from "@/context/TokenContext/TokenContext";
import useFetchProducts from "@/hooks/useFetchProducts";

export const SlugProductDetail: React.FC<{ params: Params }> = ({ params }) => {
  const { token } = useToken();
  const products = useFetchProducts();
  const router = useRouter();

  const productId: number = +params.slug;

  const product: IProduct | undefined = products.find((product) => product.id === productId);

  const [selectedQuantity, setSelectedQuantity] = useState<number>(1);

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!token) router.push(`/authPrompt`);
    else router.push(`/cart?productId=${params.slug}&quantity=${selectedQuantity}`);
  };

  const handleOnStock = () => {
    if (product && product.stock) {
      return Array.from({ length: product.stock }, (_, i) => i + 1).map((quantity) => (
        <option key={quantity} value={quantity}>
          {quantity > 1 ? `${quantity} Unidades` : `${quantity} Unidad`}
        </option>
      ));
    }
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedQuantity(Number(e.target.value));
  };

  return (
    <main className={styles.main}>
      <div className={styles.mainContent}>
        <Link href={"/"} className={styles.backLink}>
          Volver
        </Link>

        <section className={styles.productSection}>
          <div className={styles.galleryAndInfo}>
            {/* Product Gallery */}
            <div className={styles.gallery}>
              <Image
                src={product?.image || PhoneImg}
                alt={product?.name || ""}
                width={300}
                height={200}
                className={styles.galleryImage}
              />
              <Image
                src={product?.image || PhoneImg}
                alt={product?.name || ""}
                width={300}
                height={200}
                className={styles.galleryImage}
              />
              <Image
                src={product?.image || PhoneImg}
                alt={product?.name || ""}
                width={300}
                height={200}
                className={styles.galleryImage}
              />
            </div>

            {/* Tabs and Main Image */}
            <div className={styles.tabsAndMainImage}>
              <ul className={styles.tabList}>
                <li>
                  <a className={styles.activeLink} href="#">
                    Galería
                  </a>
                </li>
                <li>
                  <a href="#">Especificaciones</a>
                </li>
                <li>
                  <a href="#">Descripción</a>
                </li>
              </ul>
              <div className={styles.mainImageWrapper}>
                <Image
                  src={product?.image || PhoneImg}
                  alt={product?.name || ""}
                  width={300}
                  height={200}
                  priority
                />
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className={styles.productDetails}>
            <h3 className={styles.productTitle}>{product?.name || "Producto"}</h3>
            <p className={styles.productCode}>COD: AA3482</p>
            <h4 className={styles.productPrice}>${(product?.price ?? 0) * selectedQuantity}</h4>

            <form onSubmit={handleOnSubmit} className={styles.productForm}>
              <div className={styles.formControls}>
                {/* Color Selector */}
                <label htmlFor="color" className={styles.colorLabel}>
                  Color:
                  <select id="color" name="color" className={styles.colorSelect}>
                    <option value="blanco">Blanco</option>
                    <option value="negro">Negro</option>
                    <option value="rojo">Rojo</option>
                    <option value="azul">Azul</option>
                  </select>
                </label>

                {/* Quantity Selector */}
                <label htmlFor="amount" className={styles.amountLabel}>
                  Cantidad:
                  <select
                    id="amount"
                    name="amount"
                    value={selectedQuantity}
                    onChange={handleQuantityChange}
                    className={styles.amountSelect}
                  >
                    {handleOnStock()}
                  </select>
                </label>
              </div>

              <p className={styles.stock}>{product?.stock || 0} (disponibles)</p>
              <input type="submit" value="AGREGAR AL CARRITO" className={styles.submitButton} />
            </form>
          </div>
        </section>

        {/* Description Section */}
        <section className={styles.descriptionSection}>
          <h3 className={styles.descriptionTitle}>Descripción</h3>
          <p className={styles.descriptionText}>{product?.description || "N/A"}</p>
        </section>
      </div>
    </main>
  );
};

export default SlugProductDetail;
