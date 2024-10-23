import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { ICartProduct, IProduct } from "@/data/products/types";
import { useRouter } from "next/navigation";
import { useToken } from "@/context/TokenContext/TokenContext";
import { useUser } from "@/context/UserContext/UserContext";

export const useCart = (
  products: IProduct[],
  productId: string | null,
  quantityProduct: string | null
) => {
  const { user } = useUser();
  const { token } = useToken();
  const router = useRouter();
  const shippingCost = 10;
  const userId = user?.id;
  const APIURL = process.env.NEXT_PUBLIC_API_URL;

  const [productsToShow, setProductsToShow] = useState<ICartProduct[]>([]);
  const [temporaryProduct, setTemporaryProduct] = useState<ICartProduct[]>([]);

  useEffect(() => {
    if (user && productId) {
      const product = products.find((prod) => prod.id === +productId);
      if (product) {
        const allProductsStr = localStorage.getItem(`cartProduct-${userId}`);
        const allProducts: ICartProduct[] = allProductsStr ? JSON.parse(allProductsStr) : [];
        const productExist = allProducts.find((prod) => prod.id === product.id);

        // if (allProducts.length >= 3)
        //   return alert("LLegamos al tope de productos permitidos en el carrito.");

        const quantity = quantityProduct ? +quantityProduct : 1;

        if (productExist) {
          productExist.quantity += quantity;
        } else {
          allProducts.push({ ...product, quantity });
        }

        localStorage.setItem(`cartProduct-${userId}`, JSON.stringify(allProducts));
        setTemporaryProduct(allProducts);
        router.replace("/cart");
      }
    }
  }, [productId, products, user, userId, quantityProduct, router]);

  useEffect(() => {
    if (user) {
      const cartProductsStr = localStorage.getItem(`cartProduct-${userId}`);
      const loadedProducts: ICartProduct[] = cartProductsStr ? JSON.parse(cartProductsStr) : [];
      setProductsToShow(loadedProducts);
    }
  }, [user, userId, temporaryProduct]);

  const handleRemoveProduct = async (id: number) => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "No podrás revertir esta acción.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      const cartProductsStr = localStorage.getItem(`cartProduct-${userId}`);
      const loadedProducts: ICartProduct[] = cartProductsStr ? JSON.parse(cartProductsStr) : [];
      const updatedProducts = loadedProducts.filter((prod) => prod.id !== id);

      localStorage.setItem(`cartProduct-${userId}`, JSON.stringify(updatedProducts));
      setProductsToShow(updatedProducts);

      await Swal.fire({
        title: "¡Eliminado!",
        text: "El producto ha sido eliminado del carrito.",
        icon: "success",
        toast: true,
        position: "bottom-end",
        showConfirmButton: false,
        timer: 2500,
      });
    }
  };

  const calculateProductsSubtotal = () => {
    return productsToShow.reduce((acc, prod) => acc + prod.price * (prod.quantity || 1), 0);
  };

  const calculateProductsTotal = () => calculateProductsSubtotal() + shippingCost;

  const dispatchPurchase = async () => {
    const allCartProductIds = productsToShow.map(({ id }) => id);

    // Alerta de confirmación antes de la compra
    const confirmResult = await Swal.fire({
      title: "¿Listo para completar tu compra?",
      text: "¡Gracias por confiar en nosotros!",
      icon: "info",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      confirmButtonText: "Finalizar compra",
      cancelButtonColor: "#6c757d",
      confirmButtonColor: "#3085d6",
      reverseButtons: true,
    });

    if (confirmResult.isConfirmed) {
      try {
        const response = await fetch(`${APIURL}/orders`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
          body: JSON.stringify({
            userId: user?.id,
            products: allCartProductIds,
          }),
        });

        const data = await response.json();

        Swal.fire({
          title: "Compra realizada con éxito",
          text: "Tu compra ha sido procesada exitosamente.",
          icon: "success",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#6c757d",
          confirmButtonText: "Ver mis compras",
          cancelButtonText: "Seguir comprando",
        }).then((result) => {
          if (result.isConfirmed) {
            router.push("/profile/orders");
          } else {
            router.push("/");
          }
        });

        setProductsToShow([]);
        localStorage.removeItem(`cartProduct-${userId}`);
      } catch (err: any) {
        console.error(err);
        throw new Error(err);
      }
    }
  };

  return {
    productsToShow,
    handleRemoveProduct,
    calculateProductsTotal,
    calculateProductsSubtotal,
    dispatchPurchase,
  };
};
