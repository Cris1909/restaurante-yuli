"use client";

import { deleteUser } from "@/actions/users-actions";
import { CustomTable } from "@/components/CustomTable";
import { User } from "@/interfaces";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";

interface Props {
  users: User[];
}

const UserManager: React.FC<Props> = ({ users: initialUsers }) => {
  const [users, setUsers] = useState<User[]>(initialUsers);

  const handleDeleteUser = async (cedUser: string) => {
    try {
      await deleteUser(cedUser);
      toast.success("Producto eliminado correctamente");
      setUsers((prevUsers) => prevUsers.filter((u) => u.ced_user !== cedUser));
    } catch (error) {
      toast.error("Error al eliminar el producto");
    }
  };

  return (
    <div className="main-container">
      <h1 className="title">Gestión de Usuarios</h1>

      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <a href="/">Dashboard</a>
        </li>
        <li className="breadcrumb-item">Gestión de Usuarios</li>
      </ol>

      <div className="mt-4 flex flex-col gap-3">
        <div className="grid">
          <Link href={"/plataforma/usuarios/crear"}>
            <button className="btn btn-black">Crear usuario</button>
          </Link>
        </div>
        <CustomTable
          columns={[
            { header: "Cedula", accessor: "ced_user", type: "text" },
            { header: "Nombre", accessor: "nom_user", type: "text" },
            { header: "Correo", accessor: "email_user", type: "text" },
            { header: "Cargo", accessor: "dcar", type: "text" },
            {
              header: "Acción",
              accessor: "options",
              template: ({ ced_user }: User) => {
                return (
                  <div className="flex gap-2">
                    <button className="btn btn-icon btn-blue">
                      <i className="i-mdi-pencil" />
                    </button>
                    <button
                      onClick={() => handleDeleteUser(ced_user)}
                      className="btn btn-icon btn-danger"
                    >
                      <i className="i-mdi-delete" />
                    </button>
                  </div>
                );
              },
            },
          ]}
          tableClassName="take-order"
          data={users}
        />
      </div>
    </div>
  );
};

export default UserManager;
