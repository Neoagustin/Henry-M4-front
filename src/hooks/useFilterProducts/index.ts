// hooks/useFilterProducts.ts
import { useState, useEffect } from "react";
import { IProduct } from "@/data/products/types";

const useFilterProducts = (products: IProduct[], productCategoryId: number) => {
  const [filteredProducts, setFilteredProducts] = useState<IProduct[]>(products);

  try {
    useEffect(() => {
      let filtered = products.filter((product) => product.categoryId === productCategoryId);
      if (productCategoryId === 0) filtered = products;
      setFilteredProducts(filtered);
    }, [productCategoryId, products]);

    return filteredProducts;
  } catch (err: any) {
    throw new Error(err);
  }
};

export default useFilterProducts;
