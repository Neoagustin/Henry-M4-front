export interface ITokenContext {
  token: string | null;
  setToken: (token: string | null) => void;
}
