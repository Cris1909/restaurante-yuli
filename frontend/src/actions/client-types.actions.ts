"use server";

import { YuliApi } from "@/api";

export const getClientTypes = async () => {
  try {
    const response = await YuliApi.get<[]>(`/tipo-clientes/listar`);
    return response.data;
  } catch (error: any) {
    console.log(error)
    throw new Error(error.message);
  }
};
