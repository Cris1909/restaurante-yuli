import { getSinglePedido } from "@/actions/facturas.actions";
import { CustomTable } from "@/components";
import { SinglePedido } from "@/interfaces";
import { SinglePedidoComponent } from "./components/SinglePedidoComponent";

interface Props {
  params: {
    cod: string;
  };
}

export default async function NamePage({ params: { cod } }: Props) {
  const pedido: SinglePedido | null = await getSinglePedido(+cod);

  if (!pedido) {
    return <h1>Pedido no encontrado</h1>;
  }

  return (
    <div className="main-container">
      <SinglePedidoComponent pedido={pedido} />
    </div>
  );
}
