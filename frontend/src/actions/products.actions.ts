"use server";

import { YuliApi } from "@/api";
import { Product } from "@/interfaces";

export const getProducts = async () => {
  try {
    const response = await YuliApi.get<Product[]>(`/productos/traer`);
    return response.data;
  } catch (error: any) {
    console.log(error)
    throw new Error(error.message);
  }
};
