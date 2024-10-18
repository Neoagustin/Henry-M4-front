"use client";

import Link from "next/link";
import styles from "./Register.module.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { validateFormRegister } from "./utils";
import { useState } from "react";
import { IFormValuesRegister } from "./types";
import axios from "axios";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const APIURL = process.env.NEXT_PUBLIC_API_URL;

  const handleOnSubmit = async ({ name, email, address, phone, password }: IFormValuesRegister) => {
    setLoading(true);

    const values = { name, email, address, phone, password };

    try {
      await axios.post(`${APIURL}/users/register`, values);
      await Swal.fire({
        title: "¡Registro exitoso!",
        text: "Tu cuenta ha sido creada con éxito. Puedes iniciar sesión ahora.",
        icon: "success",
        confirmButtonText: "Iniciar sesión",
        confirmButtonColor: "#3085d6",
      });

      router.push("/login");
    } catch (err: any) {
      if (err.response.data.message === "User already exists") {
        await Swal.fire({
          title: "Error",
          text: "El usuario ingresado ya existe. Por favor, intenta con otro.",
          icon: "error",
          timer: 3000,
          timerProgressBar: true,
        });

        return;
      }

      await Swal.fire({
        title: "Error",
        text: "Hubo un problema al crear tu cuenta. Por favor, intenta nuevamente.",
        icon: "error",
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#d33",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={styles.main}>
      <Formik
        initialValues={{
          name: "",
          email: "",
          address: "",
          phone: "",
          password: "",
          confirmPassword: "",
        }}
        validate={validateFormRegister}
        onSubmit={handleOnSubmit}
      >
        {({ errors, touched }) => (
          <Form className={styles.form}>
            <h2 className={styles.formTitle}>REGISTER</h2>

            <div className={styles.formGroupContainer}>
              <div className={styles.formField}>
                <label htmlFor="name" className={styles.formLabel}>
                  Nombre y Apellido
                </label>
                <Field
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Ingresa tu nombre y apellido"
                  className={`${errors.name && touched.name ? styles.errorField : ""} ${
                    !errors.name && touched.name ? styles.successField : ""
                  } ${styles.formInput}`}
                />
                {errors.name && touched.name && (
                  <ErrorMessage name="name" component="p" className={styles.errorMessage} />
                )}
              </div>

              <div className={styles.formField}>
                <label htmlFor="email" className={styles.formLabel}>
                  Correo Electrónico
                </label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Ingresa tu correo electrónico"
                  className={`${errors.email && touched.email ? styles.errorField : ""} ${
                    !errors.email && touched.email ? styles.successField : ""
                  } ${styles.formInput}`}
                />
                {errors.email && touched.email && (
                  <ErrorMessage name="email" component="p" className={styles.errorMessage} />
                )}
              </div>

              <div className={styles.formField}>
                <label htmlFor="address" className={styles.formLabel}>
                  Dirección
                </label>
                <Field
                  type="text"
                  id="address"
                  name="address"
                  placeholder="Ingresa tu dirección"
                  className={`${errors.address && touched.address ? styles.errorField : ""} ${
                    !errors.address && touched.address ? styles.successField : ""
                  } ${styles.formInput}`}
                />
                {errors.address && touched.address && (
                  <ErrorMessage name="address" component="p" className={styles.errorMessage} />
                )}
              </div>

              <div className={styles.formField}>
                <label htmlFor="phone" className={styles.formLabel}>
                  Teléfono
                </label>
                <Field
                  type="text"
                  id="phone"
                  name="phone"
                  placeholder="Ingresa tu teléfono"
                  className={`${errors.phone && touched.phone ? styles.errorField : ""} ${
                    !errors.phone && touched.phone ? styles.successField : ""
                  } ${styles.formInput}`}
                />
                {errors.phone && touched.phone && (
                  <ErrorMessage name="phone" component="p" className={styles.errorMessage} />
                )}
              </div>

              <div className={styles.formField}>
                <label htmlFor="password" className={styles.formLabel}>
                  Contraseña
                </label>
                <Field
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Ingresa tu contraseña"
                  className={`${errors.password && touched.password ? styles.errorField : ""} ${
                    !errors.password && touched.password ? styles.successField : ""
                  } ${styles.formInput}`}
                />
                {errors.password && touched.password && (
                  <ErrorMessage name="password" component="p" className={styles.errorMessage} />
                )}
              </div>

              <div className={styles.formField}>
                <label htmlFor="confirmPassword" className={styles.formLabel}>
                  Confirmar Contraseña
                </label>
                <Field
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Confirma tu contraseña"
                  className={`${
                    errors.confirmPassword && touched.confirmPassword ? styles.errorField : ""
                  } ${
                    !errors.confirmPassword && touched.confirmPassword && !errors.password
                      ? styles.successField
                      : ""
                  } ${styles.formInput}`}
                />
                {errors.confirmPassword && touched.confirmPassword && (
                  <ErrorMessage
                    name="confirmPassword"
                    component="p"
                    className={styles.errorMessage}
                  />
                )}
              </div>

              <div className={styles.btnContainer}>
                <input
                  type="submit"
                  id="btnSubmit"
                  name="btnSubmit"
                  value={loading ? "Cargando..." : "Registrarse"}
                  disabled={loading}
                  className={styles.submitButton}
                />
              </div>
            </div>
            <div className={styles.loginLinkContainer}>
              <p>
                ¿Ya tienes cuenta?{" "}
                <Link href="/login" className={styles.loginLink}>
                  Iniciar sesión
                </Link>
              </p>
            </div>
          </Form>
        )}
      </Formik>
    </main>
  );
};

export default Register;
