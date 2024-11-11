"use client";

import { ProductQuantity } from "@/components";
import { useOrderStore } from "@/store";
import clsx from "clsx";
import Image from "next/image";
import { useState } from "react";

export const BottomSheetOrder = () => {
  const [isOpen, setisOpen] = useState(false);

  const { products } = useOrderStore();

  return (
    <>
      <div className="order-detail">
        <p className="subtitle">
          Total a pagar: <b> $30.000 </b>
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
                <div className="cell full-width">Brocoli Beef</div>
                <div className="cell">$ {product.img_prod.toLocaleString()}</div>
                <div className="cell">
                  <ProductQuantity productId={product.cod_prod} />
                </div>
                <div className="cell">
                  $ {(product.precio_base * product.quantity).toLocaleString()}
                </div>
              </div>
            ))}

            {/* Footer */}
            <div className="footer">
              <div className="cell icon">
                <i className="i-mdi-user user-icon"></i>
              </div>
              <div className="cell full-width">
                Tipo de cliente: <strong>Pasajero</strong>
              </div>
              <div className="cell"></div>
              <div className="cell">Total a pagar</div>
              <div className="cell">$ {20}</div>
            </div>
          </div>
          {/* <div className="order-table">
            <div className="title-bar-resume">
              <i className="i-mdi-image-outline"></i>
              <span className="name">Nombre</span>
              <span className="price">Precio</span>
              <span className="quantity">Cantidad</span>
              <span className="subtotal">Subtotal</span>
            </div>
            <div className="info-delivery">
              <Image
                className="image-food"
                src="/public/images/bandeja paisa.jpg"
                alt=""
                width={32}
                height={32}
              />
              <span className="name">Bandeja Paisa</span>
              <span className="price">$ 15.000</span>
              <span className="quantity-selector">
                <button className="quantity-left" id="decrease">
                  <i className="i-mdi-minus"></i>
                </button>
                <span className="quantity-numer" id="quantity">
                  1
                </span>
                <button className="quantity-right" id="increase">
                  <i className="i-mdi-plus"></i>
                </button>
              </span>
              <span className="total-spend">$ 30.000</span>
            </div>

            <div className="total-delivery">
              <i className="i-mdi-user user-icon"></i>
              <span className="delivery-text">
                Tipo de Cliente: <span className="type-client">Pasajero</span>
              </span>
              <span className="delivery-total-spend">Total a pagar</span>
              <span className="delivery-spend">$ 30.000</span>
            </div>
          </div> */}
          <hr className="separator-2" />
          <div className="footer-order">
            <span className="text-footer">
              Total a pagar: <span className="price">$ 30.000</span>
            </span>
            <button className="btn btn-primary">Confirmar orden</button>
          </div>
        </div>
      </div>
    </>
  );
};
