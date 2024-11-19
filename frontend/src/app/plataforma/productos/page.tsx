import { getProducts } from "@/actions";
import ProductManager from "./components/ProductManager";
import { Metadata } from "next";
import { getClientTypes } from "@/actions/client-types.actions";

export const metadata: Metadata = {
  title: "Gestión de Productos",
  description: "Gestiona los productos del restaurante",
};

const Page: React.FC = async () => {
  const [products, clientTypes] = await Promise.all([
    getProducts({
      includeDeactivated: true,
    }),
    getClientTypes(),
  ]);
  return (
    <div>
      <ProductManager products={products} clientTypes={clientTypes} />
    </div>
  );
};

export default Page;
