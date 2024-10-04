export interface IFormValuesRegister {
  name: string;
  email: string;
  address: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

export type FormErrors = Partial<Record<keyof IFormValuesRegister, string>>;
