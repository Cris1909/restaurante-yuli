import { getProducts } from "@/actions";
import { Product } from "@/interfaces";
import { TakeOrder } from "./TakeOrder";
import { Metadata } from "next";
import { getRecargos } from "@/actions/recargos.actions";
import { getClientTypes } from "@/actions/client-types.actions";

export const metadata: Metadata = {
  title: "Tomar pedido",
};

// const PRODUCTS: Product[] = [
//   {
//     _id: "1",
//     name: "Bandeja Paisa",
//     description:
//       "Bandeja paisa con todos sus ingredientes: Frijoles, Arroz, Carne Molida, Chicharron, Aguacate, Huevo frito, Longaniza, Tajadas de maduro y Arepa",
//     img: "/images/bandeja-paisa.jpg",
//     price: 15000,
//   },
//   {
//     _id: "2",
//     name: "Arroz con pollo",
//     description: "Delicioso arroz con pollo con papa criolla frita",
//     price: 15000,
//     img: "/images/arroz-pollo.jpg",
//   },
//   {
//     _id: "3",
//     name: "Lengua Guisada",
//     description:
//       "Delicioso plato corriente de lengua guisada, con principio del día, arroz, tajadas de maduro y ensalada",
//     price: 13000,
//     img: "/images/lengua-guisada.jpg",
//   },
//   {
//     _id: "4",
//     name: "Carne a la plancha",
//     description:
//       "Almuerzo corriente con Carne a la plancha que contiene: Arroz, principio del día, tajadas de maduro y ensalada",
//     price: 12000,
//     img: "/images/carne-plancha.jpg",
//   },
//   {
//     _id: "5",
//     name: "Arroz Mixto",
//     description:
//       "Arroz mixto de 5 tipos de carnes: Carne de res, carne de cerdo, chuleta ahumada, pechuga y camarones, verduras, raices chinas y acompañado con papas a la francesa",
//     price: 15000,
//     img: "/images/arroz-mixto.jpg",
//   },
// ];

export default async function TomarPedidoPage() {
  const [products, recargos, clientTypes] = await Promise.all([
    getProducts(),
    getRecargos(),
    getClientTypes(),
  ]);

  console.log({
    products,
    recargos,
    clientTypes,
  })
  return <TakeOrder products={products} />;
}
