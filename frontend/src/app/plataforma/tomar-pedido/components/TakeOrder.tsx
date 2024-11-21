"use client";

import { ProductOrderCard, SelectClientTypes } from "@/components";
import { ClientType, Product } from "@/interfaces";
import { useOrderStore } from "@/store";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { BottomSheetOrder } from "./BottomSheetOrder";

interface Props {
  products: Product[];
  clientTypes: ClientType[];
}

export const TakeOrder: React.FC<Props> = ({ products, clientTypes }) => {
  const {
    setClientType,
    products: productsOrdered,
    clearOrder,
  } = useOrderStore();

  const [inputText, setInputText] = useState("");

  const handleSearch = (e: any) => {
    setInputText(e.target.value);
  };

  const handleClearSearch = () => {
    setInputText("");
  };

  useEffect(() => {
    if (!clientTypes.length) return;
    const clientType = clientTypes[0];
    setClientType(clientType);
  }, []);

  return (
    <>
      <div className="main-container">
        <h1 className="title">Tomar pedido</h1>
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
          <SelectClientTypes clientTypes={clientTypes} />
        </div>

        <section className="order-menu-container">
          <AnimatePresence>
            {products
              .filter(
                ({ nom_prod, dprod }) =>
                  nom_prod.toLowerCase().includes(inputText.toLowerCase()) ||
                  dprod.toLowerCase().includes(inputText.toLowerCase())
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

      {productsOrdered.length ? (
        <BottomSheetOrder clientTypes={clientTypes} />
      ) : null}
    </>
  );
};
