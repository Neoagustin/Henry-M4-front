"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { useToken } from "@/context/TokenContext/TokenContext";
import LoggedInUserNav from "../UserNav/LoggedInUserNav";
import GuestUserNav from "../UserNav/GuestUserNav";
import styles from "./Header.module.css";
import LoadingNav from "../UserNav/LoadingNav";

const Header = () => {
  const { token } = useToken();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <header className={styles.header}>
      <div className={styles.headerMainContainer}>
        <Link className={styles.logoContainer} href={`/`}>
          <FontAwesomeIcon icon={faStar} className={styles.logoIcon} />
          <p className={styles.logoText}>Mercadito</p>
        </Link>

        {isClient ? token ? <LoggedInUserNav /> : <GuestUserNav /> : <LoadingNav />}
      </div>
    </header>
  );
};

export default Header;
