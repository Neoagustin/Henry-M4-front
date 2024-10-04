// hooks/useFetchProducts.ts
import { useEffect, useState } from "react";
import { IProduct } from "@/data/products/types";

const APIURL = process.env.NEXT_PUBLIC_API_URL;

const useFetchProducts = () => {
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    const fetchProducts = async (): Promise<IProduct[]> => {
      try {
        const response = await fetch(`${APIURL}/products`, {
          cache: "no-cache",
        });

        const data: IProduct[] = await response.json();
        setProducts(data);
        return data;
      } catch (err: any) {
        throw new Error(err);
      }
    };

    fetchProducts();
  }, []);

  return products;
};

export default useFetchProducts;
