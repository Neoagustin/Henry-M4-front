import { IOrder } from "./types";

export const getStatusColor = (status: string) => {
  switch (status) {
    case "Completada":
      return "#4CAF50";
    case "Pendiente":
      return "#FF9800";
    case "Cancelada":
      return "#F44336";
    default:
      return "#000";
  }
};

// export const orders: IOrder[] = [
//   {
//     id: 1,
//     productName: "Producto 1 asdasdasd asdasd",
//     productImage:
//       "https://acdn.mitiendanube.com/stores/001/664/621/products/3-436781a3eca6811a3917222084226187-240-0.png",
//     price: 12500,
//     status: "Completada",
//   },
//   {
//     id: 2,
//     productName: "Producto 2",
//     productImage:
//       "https://acdn.mitiendanube.com/stores/001/664/621/products/3-436781a3eca6811a3917222084226187-240-0.png",
//     price: 15000,
//     status: "Pendiente",
//   },
//   {
//     id: 3,
//     productName: "Producto 3",
//     productImage:
//       "https://acdn.mitiendanube.com/stores/001/664/621/products/3-436781a3eca6811a3917222084226187-240-0.png",
//     price: 18000,
//     status: "Completada",
//   },
//   {
//     id: 4,
//     productName: "Producto 4",
//     productImage:
//       "https://acdn.mitiendanube.com/stores/001/664/621/products/3-436781a3eca6811a3917222084226187-240-0.png",
//     price: 20000,
//     status: "Pendiente",
//   },
//   {
//     id: 5,
//     productName: "Producto 5",
//     productImage:
//       "https://acdn.mitiendanube.com/stores/001/664/621/products/3-436781a3eca6811a3917222084226187-240-0.png",
//     price: 25000,
//     status: "Cancelada",
//   },
// ];
