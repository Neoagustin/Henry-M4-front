import React from "react";
import styles from "./UserNav.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faUser } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import useUserMenu from "@/hooks/useLoggedInUserMenu";

const GuestUserNav: React.FC = () => {
  const { handleLogOut } = useUserMenu();

  return (
    <>
      <nav className={styles.desktopNav}>
        <ul>
          <div>
            <p className={styles.userIconContainer} onClick={handleLogOut}>
              <FontAwesomeIcon icon={faUser} className={styles.userIcon} />
            </p>
          </div>
          <li>
            <Link href="/register">Creá tu cuenta</Link>
          </li>
          <li>
            <Link href="/login">Ingresá</Link>
          </li>
          <li>
            <Link href="/authPrompt">
              <FontAwesomeIcon icon={faShoppingCart} />
            </Link>
          </li>
        </ul>
      </nav>
      <Link href={"/login"} className={styles.userIconContainer}>
        <FontAwesomeIcon icon={faUser} className={styles.userIcon} />
      </Link>
    </>
  );
};

export default GuestUserNav;
