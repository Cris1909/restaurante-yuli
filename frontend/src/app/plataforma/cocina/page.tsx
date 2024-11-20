import { getPedidosPendientes } from "@/actions/facturas.actions";
import { CocinaOrders } from "./components/CocinaOrders";

export default async function NamePage() {
  const [pedidos] = await Promise.all([getPedidosPendientes()]);

  return (
    <div>
      <CocinaOrders orders={pedidos} />
    </div>
  );
}
