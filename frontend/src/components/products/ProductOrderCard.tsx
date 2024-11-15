"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import React from "react";
import { Product } from "@/interfaces";
import { ProductQuantity } from "./ProductQuantity";
import { useOrderStore } from "@/store";

interface Props {
  product: Product;
  inputText: string;
}

export const ProductOrderCard: React.FC<Props> = ({ product, inputText }) => {
  const { clientType } = useOrderStore();

  const {
    cod_prod,
    nom_prod,
    img_prod,
    dprod,
    precio_base,
    recargos = [],
  } = product;

  const { addProductToOrder, getProductInOrder } = useOrderStore();
  const productInOrder = getProductInOrder(cod_prod);

  const highlightMatches = (text: string, keyword: string) => {
    if (!keyword) return text;

    const regex = new RegExp(`(${keyword})`, "gi"); // Expresión regular para buscar todas las coincidencias
    const parts = text.split(regex);

    return parts.map((part, index) =>
      part.toLowerCase() === keyword.toLowerCase() ? (
        <span key={index} className="highlight">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  const calculateRecargo = () => {
    if (!clientType) return 0;
    const recargo = recargos.find(
      (recargo) => recargo.fkcod_tc_rec === clientType.id
    );
    if (!recargo) return 0;
    return recargo.recargoCliente;
  };

  const handleAddProduct = () => {
    addProductToOrder({
      cod_prod,
      nom_prod,
      precio_base,
      quantity: 1,
      img_prod,
      recargos,
    });
  };

  return (
    <motion.div
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      className="card-menu-meals"
    >
      <Image width={120} height={120} src={img_prod} alt={nom_prod} />
      <div className="content-card">
        {/* Nombre con texto resaltado */}
        <h3>{highlightMatches(nom_prod, inputText)}</h3>{" "}
        {/* Descripción con texto resaltado */}
        {/* <p className="line-2">{highlightMatches(dprod, inputText)}</p>{" "} */}
        <p className="line-2">{dprod}</p>{" "}
        <div className="price-add-container">
          <span>$ {precio_base + calculateRecargo()}</span>
          {productInOrder ? (
            <ProductQuantity productId={cod_prod} />
          ) : (
            <button
              className="btn btn-primary"
              id=""
              onClick={handleAddProduct}
            >
              Agregar
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};
