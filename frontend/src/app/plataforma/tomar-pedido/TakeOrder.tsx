"use client";

import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ProductOrderCard } from "@/components";
import { BottomSheetOrder } from "./BottomSheetOrder";
import { Product } from "@/interfaces";

interface Props {
  products: Product[];
}

export const TakeOrder: React.FC<Props> = ({ products }) => {
  const [inputText, setInputText] = useState("");

  const handleSearch = (e: any) => {
    setInputText(e.target.value);
  };

  const handleClearSearch = () => {
    setInputText("");
  };

  return (
    <>
      <div className="main-container">
        <h1 className="title">Tomar pedido</h1>

        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="/">Dashboard</a>
          </li>
          <li className="breadcrumb-item">Tomar Pedido</li>
        </ol>

        <div className="order-bar-container">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Busca un producto..."
              onChange={handleSearch}
              value={inputText}
            />
            {inputText ? (
              <button className="search-button" onClick={handleClearSearch}>
                <i className="i-mdi-close search-icon"></i>
              </button>
            ) : (
              <span className="search-button">
                <i className="i-mdi-search search-icon"></i>
              </span>
            )}
          </div>
          <div>
            <label htmlFor="client-type">Tipo de cliente:</label>
            <select
              className="select-client"
              name="client-type"
              id="client-type"
            >
              <option value="1">Pasajero</option>
              <option value="2">Taxista</option>
              <option value="3">Trabajador</option>
            </select>
          </div>
        </div>

        <section className="order-menu-container">
          <AnimatePresence>
            {products
              .filter(
                ({ name, description }) =>
                  name.toLowerCase().includes(inputText.toLowerCase()) ||
                  description.toLowerCase().includes(inputText.toLowerCase())
              )
              .map((product, i) => (
                <ProductOrderCard
                  key={i}
                  product={product}
                  inputText={inputText}
                />
              ))}
          </AnimatePresence>
        </section>
      </div>
      <BottomSheetOrder />
    </>
  );
};
