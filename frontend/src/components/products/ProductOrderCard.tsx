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
  const { _id, name, img, description, price } = product;

  const { addProductToOrder, getProductInOrder } = useOrderStore();
  const productInOrder = getProductInOrder(_id);

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

  const handleAddProduct = () => {
    addProductToOrder({
      _id,
      name,
      price,
      quantity: 1,
      img,
    });
  };

  return (
    <motion.div
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      className="card-menu-meals"
    >
      <Image width={120} height={120} src={img} alt={name} />
      <div className="content-card">
        <h3>{highlightMatches(name, inputText)}</h3>{" "}
        {/* Nombre con texto resaltado */}
        <p className="line-2">
          {highlightMatches(description, inputText)}
        </p>{" "}
        {/* Descripción con texto resaltado */}
        <div className="price-add-container">
          <span>${price}</span>
          {productInOrder ? (
            <ProductQuantity productId={_id} />
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
