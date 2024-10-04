import { useEffect, useRef, useState } from "react";
import { useToken } from "@/context/TokenContext/TokenContext";
import { useUser } from "@/context/UserContext/UserContext";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const useUserMenu = () => {
  //? Estados
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const menuRef = useRef<HTMLDivElement>(null);

  //? Contextos y enrutador
  const { setToken } = useToken();
  const { setUser } = useUser();
  const router = useRouter();

  //? Efecto para cargar el usuario y el token
  useEffect(() => {
    const storedToken = localStorage.getItem("userToken");
    const storedUser = JSON.parse(localStorage.getItem("user") || "null");

    setToken(storedToken);
    setUser(storedUser);
    setIsLoading(false);
  }, [setToken, setUser]);

  //? Funciones de manejo
  const toggleMenu = () => {
    if (!isLoading) {
      setMenuOpen((prev) => !prev);
    }
  };

  const closeMenu = () => {
    console.log(menuOpen);
    setMenuOpen(false);
    console.log(menuOpen);
  };

  const handleLogOut = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("user");
    Cookies.remove("userToken");
    setToken(null);
    setUser(null);
    router.push("/");
  };

  //? Retorno de valores
  return { menuOpen, toggleMenu, closeMenu, handleLogOut, menuRef, isLoading };
};

export default useUserMenu;
