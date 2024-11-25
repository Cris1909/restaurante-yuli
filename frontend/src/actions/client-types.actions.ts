"use server";

import { ClientType } from "@/interfaces";
import { auth } from "@/lib/auth";
import { Client } from "pg";

export const getClientTypes = async () => {
  const session = await auth();
  if (!session) return null;
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