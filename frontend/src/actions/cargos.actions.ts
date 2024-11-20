import { Cargo } from "@/interfaces";
import { Client } from "pg";

export const getCargos = async () => {
  try {
    const client = new Client();
    await client.connect();
    const res = await client.query(`
      SELECT
        cod_car,
        dcar
      FROM
        tmcargos;
    `);
    const cargos: Cargo[] = res.rows;
    await client.end();
    return cargos;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
};
