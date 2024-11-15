import { getProducts } from "@/actions";
import { getClientTypes } from "@/actions/client-types.actions";
import { getRecargos } from "@/actions/recargos.actions";
import { Metadata } from "next";
import { TakeOrder } from "./TakeOrder";

export const metadata: Metadata = {
  title: "Tomar pedido",
};

export default async function TomarPedidoPage() {
  const [products, clientTypes] = await Promise.all([
    getProducts(),
    getClientTypes(),
  ]);

  return (
    <TakeOrder
      products={products}
      clientTypes={clientTypes}
    />
  );
}
