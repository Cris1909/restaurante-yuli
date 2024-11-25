"use server";

import { Recargo } from "@/interfaces";
import { auth } from "@/lib/auth";
import { Client } from "pg";

export const getRecargos = async () => {
  const session = await auth();
  if (!session) return null;
  try {
    const client = new Client();
    await client.connect();
    const res = await client.query(`
      SELECT
        cod_rec,
        recargo_cliente,
        fkcod_tc_rec
      FROM
        tmrecargos;
    `);
    const recargos: Recargo[] = res.rows;
    await client.end();
    return recargos;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
};
