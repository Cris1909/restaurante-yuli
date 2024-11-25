import { getClientTypes } from "@/actions/client-types.actions";
import {
  getPedidosCaja,
  getPedidosPaginated,
} from "@/actions/facturas.actions";
import { PedidosTable } from "@/components/PedidosTable";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Caja",
  description: "Caja y facturación del restaurante",
};

export default async function NamePage() {
  const [pedidos] = await Promise.all([getPedidosCaja()]);

  return (
    <div className="main-container">
      <h1 className="title mb-4">
        Caja y facturación
      </h1>
      <PedidosTable pedidos={pedidos} showStatusActions itemHref="/plataforma/caja" />
    </div>
  );
}
