import React from "react";
import styles from "./UserNav.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faCaretDown,
  faBoxOpen,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { useUser } from "@/context/UserContext/UserContext";
import useUserMenu from "@/hooks/useLoggedInUserMenu";
import Link from "next/link";

//? Función utilitaria: extraída para mayor legibilidad y reutilización
const getInitials = (name: string | undefined) => {
  if (!name) return null;
  const [firstName, secondName] = name.split(" ");
  const initials = [firstName?.charAt(0), secondName?.charAt(0)].filter(Boolean);
  return initials;
};

//? Subcomponente para el menú desplegable
const UserDropdownMenu = ({ userName, initials, handleLogOut, menuRef }: any) => {
  return (
    <div className={styles.userMenu} ref={menuRef}>
      <Link href="/profile" className={styles.profileLinkContainer}>
        <div className={styles.userIconLoginContainer}>
          {initials.map((letter: string, index: number) => (
            <span key={index}>{letter}</span>
          ))}
        </div>
        <div className={styles.userProfileInfoContainer}>
          <h3>{userName}</h3>
          <p>{"Ver perfil >"}</p>
        </div>
      </Link>
      <hr />
      <Link href="/profile/orders" className={styles.menuOption}>
        <FontAwesomeIcon icon={faBoxOpen} className={styles.menuIcon} />
        Mis compras
      </Link>
      <Link href="/cart" className={styles.menuOption}>
        <FontAwesomeIcon icon={faShoppingCart} className={styles.menuIcon} />
        Ver carrito
      </Link>
      <hr />
      <p className={styles.logOutOption} onClick={handleLogOut}>
        <FontAwesomeIcon icon={faSignOutAlt} className={styles.menuIcon} />
        Cerrar sesión
      </p>
    </div>
  );
};

const LoggedInUserNav: React.FC = () => {
  const { user } = useUser();
  const { isLoading, menuOpen, toggleMenu, handleLogOut, menuRef } = useUserMenu();

  const initials = getInitials(user?.name);
  const userName = user?.name?.split(" ")[0];

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  return (
    <>
      {/* USUARIO LOGEADO (PC) */}
      <nav className={styles.desktopNav}>
        <ul>
          <div
            className={`${styles.userContainer} ${menuOpen ? styles.userContainerOpen : ""}`}
            onClick={toggleMenu}
            ref={menuRef}
          >
            <div className={styles.userIconLoginContainer}>
              {initials && initials.map((letter, index) => <span key={index}>{letter}</span>)}
            </div>
            <div className={styles.userNameContainer}>
              <p className={styles.userName}>{userName}</p>
              <FontAwesomeIcon icon={faCaretDown} className={styles.arrowIcon} />
            </div>

            {/* Menú desplegable */}
            {menuOpen && (
              <UserDropdownMenu
                userName={userName}
                initials={initials}
                handleLogOut={handleLogOut}
                menuRef={menuRef}
              />
            )}
          </div>
          <li>
            <Link href="/cart">
              <FontAwesomeIcon icon={faShoppingCart} />
            </Link>
          </li>
        </ul>
      </nav>

      {/* USUARIO LOGEADO MOBILE */}
      <div
        className={`${styles.userContainer} ${menuOpen ? styles.userContainerOpen : ""}`}
        id={styles.mobile}
        onClick={toggleMenu}
        ref={menuRef}
      >
        <div className={styles.userIconLoginContainer}>
          {initials && initials.map((letter, index) => <span key={index}>{letter}</span>)}
        </div>
        <div className={styles.userNameContainer}>
          <p className={styles.userName}>{userName}</p>
          <FontAwesomeIcon icon={faCaretDown} className={styles.arrowIcon} />
        </div>
      </div>
      <div
        className={
          menuOpen ? `${styles.darkLayer} ${styles.darkLayerActive}` : `${styles.darkLayer}`
        }
        onClick={toggleMenu}
      ></div>
      <div
        className={
          menuOpen
            ? `${styles.mobileUserMenu} ${styles.mobileUserMenuActive}`
            : `${styles.mobileUserMenu}`
        }
      >
        <Link
          href="/profile"
          className={styles.menuOption}
          id={styles.profileMenuOption}
          onClick={toggleMenu}
        >
          <div className={styles.userIconLoginContainer}>
            {initials &&
              initials.map((letter: string, index: number) => <span key={index}>{letter}</span>)}
          </div>
          <div className={styles.userProfileInfoContainer}>
            <h3>{userName}</h3>
            <p>{"Ver perfil >"}</p>
          </div>
        </Link>
        <div className={styles.contentMenuMobileContainer}>
          <div className={styles.mobileMenuLinks}>
            <Link href="/profile/orders" className={styles.menuOption} onClick={toggleMenu}>
              <FontAwesomeIcon icon={faBoxOpen} className={styles.menuIcon} />
              Mis compras
            </Link>
            <Link href="/cart" className={styles.menuOption} onClick={toggleMenu}>
              <FontAwesomeIcon icon={faShoppingCart} className={styles.menuIcon} />
              Ver carrito
            </Link>
          </div>
          <div className={styles.bottomMenuMobile}>
            <hr />
            <div className={styles.logOutButtonContainer}>
              <p className={styles.logOutOption} onClick={handleLogOut}>
                <FontAwesomeIcon icon={faSignOutAlt} className={styles.menuIcon} />
                Cerrar sesión
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoggedInUserNav;
