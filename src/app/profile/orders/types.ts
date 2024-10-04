import { IProduct } from "@/data/products/types";

export interface IOrder {
  id: number;
  productImage: string;
  productName: string;
  price: number;
  status: string;
  date: Date;
  products: IProduct[];
}
