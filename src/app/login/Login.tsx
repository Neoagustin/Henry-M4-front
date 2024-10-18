"use client";

import { ErrorMessage, Field, Form, Formik } from "formik";
import styles from "./Login.module.css";
import Link from "next/link";
import React from "react";
import { validateForm } from "./utils";
import { IFormValues } from "./types";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useToken } from "@/context/TokenContext/TokenContext";
import { useUser } from "@/context/UserContext/UserContext";
import Swal from "sweetalert2";
import Cookies from "js-cookie";

const Login: React.FC = () => {
  const { setToken } = useToken();
  const { setUser } = useUser();
  const router = useRouter();
  const APIURL = process.env.NEXT_PUBLIC_API_URL;

  const handleOnSubmit = async ({ email, password }: IFormValues) => {
    try {
      const res = await axios.post(`${APIURL}/users/login`, { email, password });
      Cookies.set("userToken", res.data.token);
      localStorage.setItem("userToken", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      setToken(res.data.token);
      setUser(res.data.user);

      await Swal.fire({
        title: "<strong style='font-size: 1em;'>¡Inicio de sesión exitoso!</strong>",
        html: "👋 Bienvenido de nuevo, <strong>estás a punto de ser redirigido.</strong>",
        icon: "success",
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false,
        willClose: () => {
          router.push("/");
        },
        customClass: {
          popup: "swal-popup",
        },
      });
    } catch (err: any) {
      await Swal.fire({
        title: "Error",
        text: "No se pudo iniciar sesión. Por favor, verifica tus credenciales e intenta nuevamente.",
        icon: "error",
        timer: 3000,
        timerProgressBar: true,
      });
    }
  };

  return (
    <main className={styles.main}>
      <div className={styles.formContainer}>
        <Formik
          initialValues={{ email: "", password: "" }}
          validate={validateForm}
          onSubmit={handleOnSubmit}
        >
          {({ errors, touched }) => (
            <Form className={styles.form}>
              <h2 className={styles.formHeading}>LOGIN</h2>
              <div className={styles.formGroupContainer}>
                <div className={styles.formGroup}>
                  <label htmlFor="email">E-Mail</label>
                  <Field
                    type="text"
                    name="email"
                    placeholder="Email@ejemplo.com"
                    className={
                      touched.email && errors.email ? styles.errorField : styles.inputField
                    }
                  />
                  <ErrorMessage name="email" component="p" className={styles.errorMessage} />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="password">Contraseña</label>
                  <Field
                    type="password"
                    name="password"
                    placeholder="********"
                    className={
                      touched.password && errors.password ? styles.errorField : styles.inputField
                    }
                  />
                  <ErrorMessage name="password" component="p" className={styles.errorMessage} />
                </div>

                <div className={styles.btnContainer}>
                  <input
                    type="submit"
                    id="btnSubmit"
                    name="btnSubmit"
                    className={styles.submitButton}
                  />
                </div>
              </div>
              <div className={styles.registerLinkContainer}>
                <p className={styles.registerText}>
                  ¿No tienes cuenta?{" "}
                  <Link href={"/register"} className={styles.registerLink}>
                    Regístrate
                  </Link>
                </p>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </main>
  );
};

export default Login;
