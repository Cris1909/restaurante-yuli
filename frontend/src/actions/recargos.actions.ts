"use server";

import { YuliApi } from "@/api";
import { Recargo } from "@/interfaces";
import { Client } from "pg";

export const getRecargosAPI = async () => {
  try {
    const response = await YuliApi.get<[]>(`/recargos/listar`);
    return response.data;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
};

export const getRecargos = async () => {
  try {
    const client = new Client();
    await client.connect();
    const res = await client.query(`
      SELECT
        r.cod_rec,
        r.recargo_cliente,
        r.fkcod_tc_rec
      FROM
        tmrecargos AS r;
    `);
    const recargos: Recargo[] = res.rows;
    await client.end();
    return recargos;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
};
