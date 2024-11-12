"use server";

import { YuliApi } from "@/api";

export const getRecargos = async () => {
  try {
    const response = await YuliApi.get<[]>(`/recargos/listar`);
    return response.data;
  } catch (error: any) {
    console.log(error)
    throw new Error(error.message);
  }
};
