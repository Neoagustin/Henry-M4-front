import { IOrder } from "@/app/profile/orders/types";

export interface ICredential {
  id: number;
  password: string;
}

export interface CreateOrderDto {
  userId: number;
  products: number[];
}

export interface IUserContext {
  id: number;
  name: string;
  email: string;
  address: string;
  phone: string;
  role: string;
  credential: ICredential;
  orders: IOrder[];
}

export interface IUserContextType {
  user: IUserContext | null;
  setUser: (user: IUserContext | null) => void;
}
