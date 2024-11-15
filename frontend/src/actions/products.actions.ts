"use server";

import { YuliApi } from "@/api";
import { Product } from "@/interfaces";

export const getProducts = async () => {
  try {
    const response = await YuliApi.get<Product[]>(`/productos/listar`);
    return response.data.map((p) => ({ ...p, recargos: p.recargos || [] }));
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
};
