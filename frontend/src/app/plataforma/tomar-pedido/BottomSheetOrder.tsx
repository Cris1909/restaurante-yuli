"use client";

import { ProductQuantity, SelectClientTypes } from "@/components";
import { ClientType, Recargo } from "@/interfaces";
import { useOrderStore } from "@/store";
import clsx from "clsx";
import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { createFacturaWithDetails } from "@/actions/facturas.actions"; // Asegúrate de importar la función correctamente
import { toast } from "react-toastify";

import "@/css/bottom-sheet.css";
import { formatMoney } from "@/helpers";

interface Props {
  clientTypes: ClientType[];
}

export const BottomSheetOrder: React.FC<Props> = ({ clientTypes }) => {

  const [isOpen, setisOpen] = useState(false);
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
      tc_fac: clientType?.cod_tc,
      fkced_vendedor: "88220270", // TODO: obtener el ced del vendedor, desde el server
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
          onClick={() => setisOpen(true)}
        >
          Ver orden
        </button>
      </div>

      <div
        className={clsx("bottom-sheet-backdrop", { open: isOpen })}
        id="bottom-sheet-backdrop"
        onClick={() => setisOpen(false)}
      ></div>

      <div
        className={clsx("bottom-sheet", {
          open: isOpen,
        })}
        id="bottom-sheet"
      >
        <div className="bottom-sheet-content">
          <div className="bottom-sheet-head">
            <h2 className="title">Resumen del pedido</h2>
            <button
              className="close-btn"
              id="close-bottom-sheet"
              onClick={() => setisOpen(false)}
            >
              <i className="i-mdi-close"></i>
            </button>
          </div>
          <hr />
          <div className="grid-table">
            {/* Header */}
            <div className="header">
              <div className="cell icon">
                <i className="i-mdi-image-outline header-icon"></i>
              </div>
              <div className="cell">Nombre</div>
              <div className="cell">Precio</div>
              <div className="cell">Cantidad</div>
              <div className="cell">Subtotal</div>
            </div>

            {/* Row */}
            {products.map((product) => (
              <div className="row" key={product.cod_prod}>
                <div className="cell icon">
                  <Image
                    width={32}
                    height={32}
                    src={product.img_prod}
                    alt="Brocoli Beef"
                    className="product-image"
                  />
                </div>
                <div className="cell full-width">{product.nom_prod}</div>
                <div className="cell">
                  ${" "}
                  {formatMoney(
                    product.precio_base + calculateRecargo(product.recargos)
                  )}
                </div>
                <div className="cell">
                  <ProductQuantity productId={product.cod_prod} />
                </div>
                <div className="cell">
                  ${" "}
                  {formatMoney(
                    (product.precio_base + calculateRecargo(product.recargos)) *
                    product.quantity
                  )}
                </div>
              </div>
            ))}

            {/* Footer */}
            <div className="footer">
              <div className="cell icon">
                <i className="i-mdi-user user-icon"></i>
              </div>
              <div className="cell full-width">
                <SelectClientTypes clientTypes={clientTypes} />
              </div>
              <div className="cell"></div>
              <div className="cell">Total a pagar</div>
              <div className="cell">$ {formatMoney(getTotalPrice())}</div>
            </div>
          </div>
          <div className="mt-2">
            <div>
              {!showObservations ? (
                <button
                  onClick={() => setShowObservations(true)}
                  className="btn btn-black"
                >
                  Añadir observaciones
                </button>
              ) : (
                <>
                  <button
                    onClick={() => {
                      setShowObservations(false);
                      setObservations("");
                    }}
                    className="btn btn-secondary"
                  >
                    Quitar observaciones
                  </button>
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
          <hr className="separator-2" />
          <div className="footer-order">
            <span className="text-footer">
              Total a pagar:{" "}
              <span className="price">
                $ {formatMoney(getTotalPrice())}
              </span>
            </span>
            <button
              onClick={handleCreateOrder}
              className="btn btn-primary"
              disabled={isLoading}
            >
              {isLoading ? "Creando pedido..." : "Confirmar orden"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
