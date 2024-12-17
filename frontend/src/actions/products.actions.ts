"use server";

import pg from "pg";
const { Client } = pg;

import { Status } from "@/enum";
import { Product } from "@/interfaces";
import { revalidatePath } from "next/cache";
import { uploadFile } from "./files.actions";
import { auth } from "@/lib/auth";

export const getProducts = async ({
  includeDeactivated = false,
  includeAdditionals = false,
}: {
  includeDeactivated?: boolean;
  includeAdditionals?: boolean;
} = {}) => {
  try {
    const client = new Client();
    await client.connect();

    // Construye dinámicamente la cláusula WHERE
    let whereClause = includeAdditionals ? "" : "p.es_adicional = false AND ";

    whereClause += includeDeactivated
      ? "p.fkcods_prod IN (1, 2)" // Mostrar activos (1) y desactivados (2)
      : "p.fkcods_prod = 1"; // Mostrar solo activos (1)

    const res = await client.query(`
      SELECT
        p.cod_prod,
        p.nom_prod,
        p.dprod,
        p.precio_base,
        p.fkcods_prod,
        p.img_prod,
        p.es_adicional,
        json_agg(
          json_build_object(
            'cod_rec', r.cod_rec, 
            'recargo_cliente', r.recargo_cliente, 
            'fkcod_tc_rec', r.fkcod_tc_rec
          )
        ) AS recargos
      FROM
        tmproductos AS p
      LEFT JOIN tmrecargos AS r 
        ON p.cod_prod = r.fkcod_prod_rec
      WHERE
        p.fkcods_prod != 0 AND ${whereClause}
      GROUP BY
        p.cod_prod
      ORDER BY
        p.es_adicional;  
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
  const session = await auth();
  if (!session) return null;
  try {
    const client = new Client();
    await client.connect();
    await client.query(
      `UPDATE tmproductos SET fkcods_prod = 0 WHERE cod_prod = $1`,
      [cod_prod]
    );

    await client.end();
    revalidatePath("/plataforma/tomar-pedido");
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
};

export const changeProductStatus = async (cod_prod: number, status: Status) => {
  const session = await auth();
  if (!session) return null;
  try {
    const client = new Client();
    await client.connect();
    await client.query(
      `UPDATE tmproductos SET fkcods_prod = $1 WHERE cod_prod = $2`,
      [status, cod_prod]
    );
    await client.end();

    revalidatePath("/plataforma/tomar-pedido");
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
};

export const createProduct = async (
  fileFormData: FormData,
  data: {
    nom_prod: string;
    dprod: string;
    precio_base: number;
    recargos: {
      recargo_cliente: number;
      fkcod_tc_rec: number;
    }[];
    es_adicional: boolean;
  }
) => {
  const session = await auth();
  if (!session) return null;
  const { nom_prod, dprod, precio_base, recargos, es_adicional } = data;
  fileFormData.append(
    "upload_preset",
    process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!
  );
  try {
    // Subir la imagen a un servicio de almacenamiento en la nube
    const { public_id } = await uploadFile(fileFormData);

    const client = new Client();
    await client.connect();

    // Insertar el producto
    const insertProduct = `
      INSERT INTO tmproductos (nom_prod, dprod, precio_base, img_prod, es_adicional)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING cod_prod;
    `;
    const insertProductValues = [
      nom_prod,
      dprod,
      precio_base,
      public_id,
      es_adicional,
    ];

    const productRes = await client.query(insertProduct, insertProductValues);
    const cod_prod = productRes.rows[0].cod_prod;

    // Insertar los recargos
    const insertRecargos = `
      INSERT INTO tmrecargos (fkcod_prod_rec, fkcod_tc_rec, recargo_cliente)
      VALUES ($1, $2, $3);
    `;

    const insertRecargosPromises = recargos.map(async (recargo) => {
      const insertRecargosValues = [
        cod_prod,
        recargo.fkcod_tc_rec,
        recargo.recargo_cliente,
      ];
      return client.query(insertRecargos, insertRecargosValues);
    });

    await Promise.all(insertRecargosPromises);

    await client.end();

    revalidatePath("/plataforma/tomar-pedido");
  } catch (error: any) {
    console.log(error.response);
  }
};
