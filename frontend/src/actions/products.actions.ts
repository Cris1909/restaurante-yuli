"use server";

import pg from "pg";
const { Client } = pg;

import { YuliApi } from "@/api";
import { Product } from "@/interfaces";
import { Status } from "@/enum";

export const getProductsFromAPI = async () => {
  try {
    const response = await YuliApi.get<Product[]>(`/productos/listar`);
    return response.data.map((p) => ({ ...p, recargos: p.recargos || [] }));
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
};

export const getProducts = async () => {
  try {
    const client = new Client();
    await client.connect();
    const res = await client.query(`
      SELECT
	      p.cod_prod,
	      p.nom_prod,
        p.dprod,
        p.precio_base,
        p.fkcods_prod,
        p.img_prod,
          json_agg( -- //* Agrega un array json
		        json_build_object( -- //* Construye un objeto json
              'cod_rec', r.cod_rec, 
              'recargo_cliente', r. recargo_cliente, 
              'fkcod_tc_rec', r. fkcod_tc_rec
            )
          ) AS recargos -- //? Asigna el array json a la propiedad recargos
      FROM
	      tmproductos AS p
	    LEFT JOIN tmrecargos AS r 
        ON p.cod_prod = r.fkcod_prod_rec
      GROUP BY
	      p.cod_prod;  
    `);
    const products: Product[] = res.rows.map((p: any) => ({
      ...p,
      recargos: p.recargos.filter((r: any) => r.cod_rec !== null),
    }));
    await client.end();
    return products;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
};

export const deleteProduct = async (cod_prod: number) => {
  try {
    const client = new Client();
    await client.connect();
    await client.query(
      `UPDATE tmproductos SET fkcods_prod = 0 WHERE cod_prod = $1`,
      [cod_prod]
    );
    await client.end();
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
};

export const changeProductStatus = async (cod_prod: number, status: Status) => {
  try {
    const client = new Client();
    await client.connect();
    await client.query(
      `UPDATE tmproductos SET fkcods_prod = $1 WHERE cod_prod = $2`,
      [status, cod_prod]
    );
    await client.end();
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
};
