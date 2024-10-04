import React from "react";
import Link from "next/link";
import styles from "./not-found.module.css";

const NotFoundPage: React.FC = () => {
  return (
    <main
      className={`grid min-h-full place-items-center bg-[#1e1e1e] px-6 py-24 sm:py-32 lg:px-8 ${styles.container}`}
    >
      <div className="text-center">
        <p className="text-5xl font-bold tracking-tight text-red-500">404</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-5xl">
          Página no encontrada
        </h1>
        <p className="mt-6 text-lg leading-7 text-gray-300">
          Lo sentimos, no pudimos encontrar la página que estás buscando.
        </p>
        <div className="mt-10 flex flex-col items-center gap-y-4">
          <Link
            href="/"
            className="rounded-md bg-[#0056b3] px-4 py-2 text-base font-semibold text-white shadow-sm hover:bg-[#004494] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0056b3]"
          >
            Volver al inicio
          </Link>
          <Link href="/contacto" className="text-base font-semibold text-gray-300 hover:text-white">
            Contactar con soporte <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default NotFoundPage;
