export interface IFormValues {
  email: string;
  password: string;
}

export type FormErrors = Partial<Record<keyof IFormValues, string>>;
