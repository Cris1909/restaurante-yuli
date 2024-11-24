"use client";

import { createFacturaWithDetails } from "@/actions/facturas.actions"; // Asegúrate de importar la función correctamente
import { ProductQuantity, SelectClientTypes } from "@/components";
import { ClientType, Product } from "@/interfaces";
import { useOrderStore } from "@/store";
import { motion } from "framer-motion";
import { useState } from "react";
import { toast } from "react-toastify";

import { CustomTable } from "@/components/CustomTable";
import { formatMoney } from "@/helpers";
import { Button, Divider } from "@nextui-org/react";

import { BottomSheet } from "react-spring-bottom-sheet";
import "react-spring-bottom-sheet/dist/style.css";

interface Props {
  clientTypes: ClientType[];
}

export const BottomSheetOrder: React.FC<Props> = ({ clientTypes }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showObservations, setShowObservations] = useState(false);
  const [observations, setObservations] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { products, clientType, getTotalPrice, calculateRecargo, clearOrder } =
    useOrderStore();

  const handleCreateOrder = async () => {
    setIsLoading(true);

    const factura = {
      monto_total: getTotalPrice(),
      obs_fac: observations,
      fktc_fac: clientType?.cod_tc,
    };

    const detalle_factura = products.map((product) => ({
      cantidad_platos: product.quantity,
      precio_base: product.precio_base,
      recargo_clie: calculateRecargo(product.recargos),
      fkcod_prod_dfac: product.cod_prod,
    }));

    try {
      await createFacturaWithDetails(factura, detalle_factura);
      toast.success("Pedido creado exitosamente");
      clearOrder();
    } catch (error) {
      toast.error("Error al crear el pedido");
      console.error("Error al crear el pedido:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="order-detail">
        <p className="subtitle">
          Total a pagar: <b> $ {formatMoney(getTotalPrice())} </b>
        </p>
        <button
          className="btn btn-primary"
          id="open-bottom-sheet"
          onClick={() => setIsOpen(true)}
        >
          Ver orden
        </button>
      </div>
      <BottomSheet
        open={isOpen}
        onDismiss={() => setIsOpen(false)}
        style={{
          position: "absolute",
          zIndex: 999,
        }}
        snapPoints={({ minHeight }) => minHeight}
      >
        <div className="px-4 pt-2 md:px-8 lg:px-16">
          <div className="flex items-center justify-between">
            <h2 className="title">Resumen del pedido</h2>
            <button
              className=""
              id="close-bottom-sheet"
              onClick={() => setIsOpen(false)}
            >
              <i className="i-mdi-close"></i>
            </button>
          </div>

          <Divider className="mt-2 mb-4" />

          <CustomTable
            columns={[
              { accessor: "img_prod", type: "icon", header: "i-mdi-image" },
              { header: "Nombre", accessor: "nom_prod", type: "text" },
              {
                header: "Precio",
                width: 100,
                accessor: "precio_base",
                template: (item: any) =>
                  "$ " +
                  formatMoney(
                    item.precio_base + calculateRecargo(item.recargos)
                  ),
              },
              {
                header: "Cantidad",
                accessor: "quantity",
                width: 1,
                template: ({ cod_prod }: Product) => (
                  <ProductQuantity productId={cod_prod} />
                ),
              },
              {
                header: "Subtotal",
                accessor: "subtotal",
                width: 100,
                template: (item: any) =>
                  "$ " +
                  formatMoney(
                    (item.precio_base + calculateRecargo(item.recargos)) *
                      item.quantity
                  ),
              },
            ]}
            data={products}
            footerComponent={
              <div>
                <Divider className="mb-2" />
                <div className="flex gap-6 justify-between items-center text-small">
                  <div className="flex gap-6 pl-3 items-center">
                    <div className="bg-zinc-300 w-8 h-8 grid place-content-center rounded-lg">
                      <i className="i-mdi-user user-icon"></i>
                    </div>
                    <SelectClientTypes clientTypes={clientTypes} />
                  </div>

                  <div className="flex text-small items-center">
                    <div className="px-3">Total a pagar:</div>
                    <div className="w-[100px] px-3  font-bold">
                      $ {formatMoney(getTotalPrice())}
                    </div>
                  </div>
                </div>
              </div>
            }
          />
          <div className="mt-2">
            <div>
              {!showObservations ? (
                <Button
                  size="sm"
                  onClick={() => setShowObservations(true)}
                  className="btn btn-black"
                >
                  Añadir observaciones
                </Button>
              ) : (
                <>
                  <Button
                    size="sm"
                    onClick={() => {
                      setShowObservations(false);
                      setObservations("");
                    }}
                    className="btn btn-danger"
                  >
                    Quitar observaciones
                  </Button>
                </>
              )}
            </div>
            <motion.textarea
              initial={{ height: 0, opacity: 0 }}
              animate={{
                height: showObservations ? "100px" : 0,
                opacity: showObservations ? 1 : 0,
              }}
              transition={{ duration: 0.3 }}
              style={{
                padding: showObservations ? "8px" : "0",
                marginTop: showObservations ? "8px" : "0",
              }}
              value={observations}
              onChange={(e) => setObservations(e.target.value)}
              placeholder="Ingrese sus observaciones aquí"
              className="observations-textarea"
            />
          </div>
          <Divider className="mb-2" />
          <div className="flex justify-between mb-4">
            <span className="subtitle">
              Total a pagar:{" "}
              <span className="font-bold">
                $ {formatMoney(getTotalPrice())}
              </span>
            </span>
            <Button
              onClick={handleCreateOrder}
              className="btn btn-primary"
              disabled={isLoading}
            >
              {isLoading ? "Creando pedido..." : "Confirmar orden"}
            </Button>
          </div>
        </div>
      </BottomSheet>
    </>
  );
};
