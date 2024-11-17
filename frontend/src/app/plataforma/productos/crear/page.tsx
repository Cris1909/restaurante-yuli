import { getClientTypes } from "@/actions/client-types.actions";
import { Metadata } from "next";
import ProductForm from "../components/ProductForm";

export const metadata: Metadata = {
  title: "Crear Producto",
  description: "Crea un nuevo producto",
};

const Page: React.FC = async () => {
  const [clientTypes] = await Promise.all([getClientTypes()]);
  return (
    <div className="main-container">
      <h1 className="title">Crear producto</h1>

      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <a href="/">Dashboard</a>
        </li>
        <li className="breadcrumb-item">Gestión de Productos</li>
        <li className="breadcrumb-item">Crear</li>
      </ol>
      <ProductForm clientTypes={clientTypes} />
    </div>
  );
};

export default Page;
