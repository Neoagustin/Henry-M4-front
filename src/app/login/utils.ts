import { FormikErrors } from "formik";
import { IFormValues } from "./types";

export const validateForm = (values: IFormValues): FormikErrors<IFormValues> => {
  const errors: FormikErrors<IFormValues> = {};

  // Validar email
  if (!values.email) {
    errors.email = "El correo electrónico es requerido";
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(values.email)) {
      errors.email = "El formato del correo electrónico es inválido";
    }
  }

  // Validar contraseña
  if (!values.password) {
    errors.password = "La contraseña es requerida";
  }

  return errors;
};
