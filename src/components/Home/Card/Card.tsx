import React from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./Card.module.css";
import { IProduct } from "../../../data/products/types";

const Card: React.FC<IProduct> = ({ id, name, description, price, stock, image, categoryId }) => {
  return (
    <Link className={styles.cardContainer} href={`/productDetail/${id}`}>
      <Image src={image} alt={name} width={300} height={200} />
      <h3>{name}</h3>
      <p className={styles.price}>$ {price}</p>
    </Link>
  );
};

export default Card;
