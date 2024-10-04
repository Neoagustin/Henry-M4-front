"use client";

// components/MainPage.tsx
import React, { useState } from "react";
import useFetchProducts from "@/hooks/useFetchProducts";
import useFilterProducts from "@/hooks/useFilterProducts";
import { categories } from "@/data/categories";
import Banner from "@/components/Home/Banner/Banner";
import FilterBar from "@/components/Home/FilterBar/FilterBar";
import ItemList from "@/components/Home/ItemList/ItemList";
import Card from "@/components/Home/Card/Card";
import styles from "./page.module.css";

const MainPage: React.FC = () => {
  const [productCategoryId, setProductCategoryId] = useState(0);
  const products = useFetchProducts();
  const filteredProducts = useFilterProducts(products, productCategoryId);

  const handleProductCategoryId = (id: number) => {
    setProductCategoryId(id);
  };

  return (
    <>
      <Banner />
      <main className={styles.main}>
        <h2 className={styles.desktopTitle}>
          {productCategoryId === 0 ? "Todo" : categories[productCategoryId - 1].name}
        </h2>
        <div className={styles.mainContent}>
          <FilterBar
            handleProductCategoryId={handleProductCategoryId}
            productCategoryId={productCategoryId}
          />

          <div className={styles.cardsContainer}>
            <h2 className={styles.mobileTitle}>Productos</h2>
            <ItemList items={filteredProducts} renderCallback={(item) => <Card {...item} />} />
          </div>
        </div>
      </main>
    </>
  );
};

export default MainPage;
