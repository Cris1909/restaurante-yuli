import { getCargos } from "@/actions/cargos.actions";
import { Metadata } from "next";
import { UserForm } from "../components/UserForm";

export const metadata: Metadata = {
  title: "Crear Usuario",
  description: "Crea un nuevo usuario",
};

const Page: React.FC = async () => {
  const [cargos] = await Promise.all([getCargos()]);
  return (
    <div className="main-container">
      <h1 className="title">Crear Usuario</h1>

      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <a href="/">Dashboard</a>
        </li>
        <li className="breadcrumb-item">Gestión de Usuarios</li>
        <li className="breadcrumb-item">Crear</li>
      </ol>
      <UserForm cargos={cargos} />
    </div>
  );
};

export default Page;
