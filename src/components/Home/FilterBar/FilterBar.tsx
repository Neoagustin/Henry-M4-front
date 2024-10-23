"use client";

// Vendors
import React from "react";

// Data
import { categories } from "@/data/categories";

// Types
import { IProductCategory } from "./types";

// Styles
import styles from "./FilterBar.module.css";
import { ICategory } from "@/data/categories/types";

const FilterBar: React.FC<IProductCategory> = ({ handleProductCategoryId, productCategoryId }) => {
  const handleSetCategory = (id: number) => {
    handleProductCategoryId(id);
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategoryId = Number(event.target.value);
    handleSetCategory(selectedCategoryId);
  };

  return (
    <>
      {/* Filtro para escritorio */}
      <div className={styles.filterBarContainer}>
        <h3>Filtrar por</h3>
        <p>Categorias</p>
        <ul>
          <li
            key={0}
            onClick={() => handleSetCategory(0)}
            className={productCategoryId === 0 ? styles.active : ""}
          >
            Todo
          </li>
          {categories.map(({ id, name }: ICategory) => (
            <li
              key={id}
              onClick={() => handleSetCategory(id)}
              className={id === productCategoryId ? styles.active : ""}
            >
              {name}
            </li>
          ))}
        </ul>
      </div>

      {/* Filtro para mobile con select */}
      <div className={styles.filterSelectContainer}>
        <label htmlFor="categorySelect" className={styles.selectLabel}>
          Filtrar por:
        </label>
        <select
          id="categorySelect"
          className={styles.mobileSelect}
          value={productCategoryId}
          onChange={handleSelectChange}
        >
          <option value="" disabled>
            Filtrar por categoría
          </option>
          <option value={0}>Todo</option>
          {categories.map(({ id, name }: ICategory) => (
            <option key={id} value={id}>
              {name}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default FilterBar;
