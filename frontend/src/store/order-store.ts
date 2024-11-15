import { ClientType, ProductOrdered } from "@/interfaces";
import { create } from "zustand";

interface State {
  products: ProductOrdered[];
  clientType: ClientType | null;
}

interface Actions {
  addProductToOrder: (product: ProductOrdered) => void;
  incraseProductQuantity: (productId: string) => void;
  decraseProductQuantity: (productId: string) => void;
  removeProduct: (productId: string) => void;

  getProductInOrder: (productId: string) => ProductOrdered | undefined;

  clearOrder: () => void;
  setClientType: (clientType: ClientType) => void;

  getTotalPrice: () => number;
}

export const useOrderStore = create<State & Actions>()((set, get) => ({
  products: [],
  clientType: null,
  addProductToOrder: (productOrdered: ProductOrdered) => {
    const { products } = get();

    // 1. Revisar si el producto existe en el carrito
    const productInOrder = products.some(
      (product) => product.cod_prod === productOrdered.cod_prod
    );

    if (!productInOrder) {
      set({ products: [...products, productOrdered] });
      return;
    }

    // 2. Si el producto existe en el carrito, actualizar la cantidad
    const updatedOrderProducts = products.map((product) => {
      if (product.cod_prod === productOrdered.cod_prod) {
        return {
          ...product,
          quantity: product.quantity + productOrdered.quantity,
        };
      }

      return product;
    });

    set({ products: updatedOrderProducts });
  },
  incraseProductQuantity: (productId: string) => {
    const { products } = get();
    const updatedOrderProducts = products.map((product) => {
      if (product.cod_prod === productId) {
        return {
          ...product,
          quantity: product.quantity + 1,
        };
      }
      return product;
    });

    set({ products: updatedOrderProducts });
  },
  decraseProductQuantity: (productId: string) => {
    const { products, removeProduct, getProductInOrder } = get();

    const product = getProductInOrder(productId);

    if (!product) return;

    if (product.quantity === 1) {
      return removeProduct(productId);
    }

    const updatedOrderProducts = products.map((product) => {
      if (product.cod_prod === productId) {
        return {
          ...product,
          quantity: product.quantity - 1,
        };
      }
      return product;
    });

    set({ products: updatedOrderProducts });
  },
  removeProduct: (productId: string) => {
    const { products } = get();
    const updatedOrderProducts = products.filter(
      (product) => product.cod_prod !== productId
    );

    set({ products: updatedOrderProducts });
  },
  getProductInOrder: (productId: string) => {
    const { products } = get();
    return products.find((product) => product.cod_prod === productId);
  },
  clearOrder: () => {
    set({ products: [] });
  },
  setClientType: (clientType: ClientType) => {
    set({ clientType });
  },
  getTotalPrice: () => {
    const { products, clientType } = get();
    console.log(products);

    const total = products.reduce((acc, product) => {
      const recargo = product.recargos.find(
        (recargo) => recargo.fkcod_tc_rec === clientType?.id
      );
      return (
        acc +
        (product.precio_base + recargo?.recargoCliente! || 0) * product.quantity
      );
    }, 0);

    return total;
  },
}));