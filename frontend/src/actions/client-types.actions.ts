"use server";

import { YuliApi } from "@/api";
import { ClientType } from "@/interfaces";
import { Client } from "pg";

export const getClientTypesAPI = async () => {
  try {
    const response = await YuliApi.get<[]>(`/tipo-clientes/listar`);
    return response.data;
  } catch (error: any) {
    console.log(error)
    throw new Error(error.message);
  }
};

export const getClientTypes = async () => {
  try {
    const client = new Client();
    await client.connect();
    const res = await client.query(`
      SELECT
        tc.cod_tc,
        tc.dtipo_cliente
      FROM
        tmtipo_clientes AS tc;
    `);
    const recargos: ClientType[] = res.rows;
    await client.end();
    return recargos;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
};