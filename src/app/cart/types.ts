import { StaticImageData } from "next/image";
import { IProduct } from "@/data/products/types";

interface Params {
  productId: number;
  color: string;
  amount: number;
}

export interface ProductCartProps {
  productToShow: IProduct;
  quantityProduct: number;
  handleRemoveProduct: (id: number) => void;
}

export default Params;
