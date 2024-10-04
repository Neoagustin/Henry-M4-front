import { FormikErrors } from "formik";
import { IFormValuesRegister } from "./types";

export const validateFormRegister = (
  values: IFormValuesRegister
): FormikErrors<IFormValuesRegister> => {
  const errors: FormikErrors<IFormValuesRegister> = {};

  // Validar Nombre
  const validateName = (name: string) => {
    const specialCharsRegex = /[^\w\s]/;
    const numberRegex = /\d/;

    const trimmedName = name.trim();

    if (name.trim().length < 3) {
      errors.name = "El nombre debe tener al menos 3 caracteres";
    } else if (numberRegex.test(name)) {
      errors.name = "El nombre no debe contener números";
    } else if (specialCharsRegex.test(name)) {
      errors.name = "El nombre no debe contener caracteres especiales";
    } else if (name.length > 50) {
      errors.name = "El nombre no debe superar los 50 caracteres";
    } else if (/ {2,}/.test(name)) {
      errors.name = "El nombre no debe contener múltiples espacios entre palabras";
    } else if (trimmedName.split(" ").length !== 2) {
      errors.name = "Por favor, ingresa tu nombre y apellido";
    }
  };

  // Validar Email
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      errors.email = "El formato del correo electrónico es inválido";
    }
  };

  // Validar Dirección
  const validateAddress = (address: string) => {
    if (address.trim().length < 5) {
      errors.address = "La dirección debe tener al menos 5 caracteres";
    }
  };

  // Validar Teléfono
  const validatePhone = (phone: string) => {
    const phoneRegex = /^[0-9]{10}$/; // Ajusta según el formato esperado

    if (!phoneRegex.test(phone)) {
      errors.phone = "El número de teléfono debe contener 10 dígitos";
    }
  };

  // Validar Contraseña
  const validatePassword = (password: string) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/;
    const hasLowerCase = /[a-z]/;
    const hasNumber = /\d/;
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;

    if (password.length < minLength) {
      errors.password = `La contraseña debe tener al menos ${minLength} caracteres`;
    } else if (!hasUpperCase.test(password)) {
      errors.password = "La contraseña debe contener al menos una letra mayúscula";
    } else if (!hasLowerCase.test(password)) {
      errors.password = "La contraseña debe contener al menos una letra minúscula";
    } else if (!hasNumber.test(password)) {
      errors.password = "La contraseña debe contener al menos un número";
    } else if (!hasSpecialChar.test(password)) {
      errors.password = "La contraseña debe contener al menos un carácter especial";
    }
  };

  // Validar Confirmación de Contraseña
  const validatePasswordMatch = (password: string, confirmPassword: string) => {
    if (password !== confirmPassword) {
      errors.confirmPassword = "Las contraseñas no coinciden";
    }
  };

  // Validación de campos
  validateName(values.name);
  validateEmail(values.email);
  validateAddress(values.address);
  validatePhone(values.phone);
  validatePassword(values.password);
  validatePasswordMatch(values.password, values.confirmPassword);

  return errors;
};
