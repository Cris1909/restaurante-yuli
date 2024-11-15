"use client";

import { ProductOrderCard } from "@/components";
import { ClientType, Product, Recargo } from "@/interfaces";
import { useOrderStore } from "@/store";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { BottomSheetOrder } from "./BottomSheetOrder";

interface Props {
  products: Product[];
  clientTypes: ClientType[];
}

export const TakeOrder: React.FC<Props> = ({
  products,
  clientTypes,
}) => {
  const {
    setClientType,
    clientType,
    products: productsOrdered,
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

  const handleSelectClientType = (e: any) => {
    const clientType = clientTypes.find(
      (clientType) => clientType.id === +e.target.value
    );
    if (!clientType) return;
    setClientType(clientType);
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
              value={clientType?.id}
              onChange={handleSelectClientType}
            >
              {clientTypes.map((clientType) => (
                <option key={clientType.id} value={clientType.id}>
                  {clientType.dtipo_cliente}
                </option>
              ))}
            </select>
          </div>
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

      {productsOrdered.length ? <BottomSheetOrder clientTypes={clientTypes} /> : null}
    </>
  );
};
