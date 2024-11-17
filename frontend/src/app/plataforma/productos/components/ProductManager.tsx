"use client";

import { changeProductStatus, deleteProduct } from "@/actions";
import { CustomTable } from "@/components/CustomTable";
import { Status } from "@/enum";
import { formatMoney } from "@/helpers";
import { ClientType, Product } from "@/interfaces";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  Tooltip,
} from "@nextui-org/react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { toast } from "react-toastify";

interface Props {
  clientTypes: ClientType[];
  products: Product[];
}

const ProductManager: React.FC<Props> = ({
  clientTypes,
  products: initialProducts,
}) => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);

  const handleSaveProduct = (product: Product) => {
    if (product.cod_prod) {
      setProducts((prevProducts) =>
        prevProducts.map((p) => (p.cod_prod === product.cod_prod ? product : p))
      );
    } else {
      product.cod_prod = new Date().getTime();
      setProducts((prevProducts) => [...prevProducts, product]);
    }
    setCurrentProduct(null);
  };

  const handleEditProduct = (product: Product) => {
    setCurrentProduct(product);
  };

  const handleDeleteProduct = async (productId: number) => {
    try {
      await deleteProduct(productId);
      toast.success("Producto eliminado correctamente");
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.cod_prod !== productId)
      );
    } catch (error) {
      toast.error("Error al eliminar el producto");
    }
  };

  const handleChangeStatus = async (productId: number, status: Status) => {
    try {
      await changeProductStatus(productId, status);
      toast.success(
        `Producto ${
          status === Status.ACTIVO ? "activado" : "desactivado"
        } correctamente`
      );
      setProducts((prevProducts) =>
        prevProducts.map((p) =>
          p.cod_prod === productId ? { ...p, fkcods_prod: status } : p
        )
      );
    } catch (error) {
      toast.error("Error al cambiar el estado del producto");
    }
  };

  const clientTypesMap: Record<number, string> = useMemo(
    () =>
      clientTypes.reduce(
        (acc, clientType) => ({
          ...acc,
          [clientType.cod_tc]: clientType.dtipo_cliente,
        }),
        {}
      ),
    [clientTypes]
  );

  return (
    <div className="main-container">
      <h1 className="title">Gestión de Productos</h1>

      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <a href="/">Dashboard</a>
        </li>
        <li className="breadcrumb-item">Gestión de Productos</li>
      </ol>

      <div className="mt-4 flex flex-col gap-3">
        <div className="grid">
          <Link href={"/plataforma/productos/crear"}>
            <button className="btn btn-black">Crear producto</button>
          </Link>
        </div>
        <CustomTable
          columns={[
            { accessor: "img_prod", type: "icon" },
            { header: "Nombre", accessor: "nom_prod", type: "text" },
            { header: "Precio", accessor: "precio_base", type: "price" },
            {
              header: "Recargos",
              accessor: "recargos",
              template: ({ recargos, precio_base }: Product) => (
                <>
                  {recargos.length ? (
                    <Popover color="default">
                      <PopoverTrigger>
                        <button className="btn btn-light">Abrir</button>
                      </PopoverTrigger>
                      <PopoverContent>
                        <div className="px-1 py-2">
                          <div className="text-small font-extrabold">
                            Recargos:
                          </div>
                          <hr className="text-zinc-200 my-0.5" />
                          {recargos.map(({ recargo_cliente, fkcod_tc_rec }) => (
                            <div
                              key={fkcod_tc_rec}
                              className="flex gap-2 justify-between"
                            >
                              <div>{clientTypesMap[fkcod_tc_rec]}:</div>
                              <div>
                                $ {formatMoney(precio_base + recargo_cliente)}
                              </div>
                            </div>
                          ))}
                        </div>
                      </PopoverContent>
                    </Popover>
                  ) : (
                    "No tiene"
                  )}
                </>
              ),
            },
            {
              header: "Acción",
              accessor: "options",
              template: ({ fkcods_prod, cod_prod }: Product) => {
                return (
                  <div className="flex gap-2">
                    {/* <button className="btn btn-icon btn-blue">
                      <i className="i-mdi-pencil" />
                    </button> */}
                    {fkcods_prod === Status.ACTIVO ? (
                      <Tooltip
                        content="Desactivar"
                        placement="bottom"
                        className="bg-gray text-white"
                      >
                        <button
                          onClick={() =>
                            handleChangeStatus(cod_prod, Status.DESACTIVADO)
                          }
                          className="btn btn-icon btn-success"
                        >
                          <i className="i-mdi-check" />
                        </button>
                      </Tooltip>
                    ) : (
                      <Tooltip
                        content="Activar"
                        placement="bottom"
                        className="bg-success text-white"
                      >
                        <button
                          onClick={() =>
                            handleChangeStatus(cod_prod, Status.ACTIVO)
                          }
                          className="btn btn-icon btn-disabled"
                        >
                          <i className="i-mdi-close" />
                        </button>
                      </Tooltip>
                    )}

                    <button
                      onClick={() => handleDeleteProduct(cod_prod)}
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
          data={products}
        />
      </div>
    </div>
  );
};

export default ProductManager;