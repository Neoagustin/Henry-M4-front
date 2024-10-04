export interface ICredential {
  id: number;
  password: string;
}

export interface IUserContext {
  id: number;
  name: string;
  email: string;
  address: string;
  phone: string;
  role: string;
  credential: ICredential;
  orders: any[];
}

export interface IUserContextType {
  user: IUserContext | null;
  setUser: (user: IUserContext | null) => void;
}
