"use server";

import { Status } from "@/enum";
import { auth } from "@/lib/auth";
import { Client } from "pg";

export const createFacturaWithDetails = async (
  factura: any,
  detalle_factura: any[]
) => {
  try {
    const session = await auth();
    if (!session) return null;  

    const client = new Client();
    await client.connect();

    // Insertar la factura
    const insertFacturaQuery = `
      INSERT INTO tdfactura (monto_total, obs_fac, fktc_fac, fkced_vendedor, fkcods_fac)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING cod_fac;
    `;
    const insertFacturaValues = [
      factura.monto_total,
      factura.obs_fac,
      factura.fktc_fac,
      session.user.ced_user,
      Status.PENDIENTE
    ];
    const res = await client.query(insertFacturaQuery, insertFacturaValues);
    const cod_fac = res.rows[0].cod_fac;

    // Insertar los detalles de la factura
    const insertDetalleQuery = `
      INSERT INTO tddfactura (cantidad_platos, precio_base, recargo_clie, fkcod_prod_dfac, fkcod_fac_dfac)
      VALUES ($1, $2, $3, $4, $5);
    `;

    const insertDetallePromises = detalle_factura.map(async (detalle) => {
      const insertDetalleValues = [
        detalle.cantidad_platos,
        detalle.precio_base,
        detalle.recargo_clie,
        detalle.fkcod_prod_dfac,
        cod_fac,
      ];
      return client.query(insertDetalleQuery, insertDetalleValues);
    });

    await Promise.all(insertDetallePromises);

    await client.end();
    return cod_fac;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
};

export const getPedidosPendientes = async () => {
  try {
    const client = new Client();
    await client.connect();

    const query = `
      SELECT
	      f.cod_fac,
	      f.monto_total,
	      f.fecha_fac,
	      f.hora_fac,
	      f.obs_fac,
	      f.fkcods_fac,
        f.fktc_fac,
	      tc.dtipo_cliente,
	      json_agg(json_build_object(
	        'cod_prod', p.cod_prod,
	        'img_prod', p.img_prod,
	        'nom_prod', p.nom_prod,
	        'precio_base', fd.precio_base,
	        'recargo_clie', fd.recargo_clie,
	        'cantidad_platos',fd.cantidad_platos
	      )) AS productos
      FROM
	      tdfactura AS f
	      LEFT JOIN tddfactura AS fd ON f.cod_fac = fd.fkcod_fac_dfac
	      LEFT JOIN tmproductos AS p ON fd.fkcod_prod_dfac = p.cod_prod
        LEFT JOIN tmtipo_clientes AS tc ON f.fktc_fac = tc.cod_tc
      WHERE
        f.fkcods_fac = ${Status.PENDIENTE}
      GROUP BY
	      f.cod_fac, tc.dtipo_cliente
      ORDER BY
        f.fecha_fac ASC;
    `;
    const res = await client.query(query);

    await client.end();
    return res.rows;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
}

export const updateStatusFactura = async (cod_fac: number, status: Status) => {
  try {
    const client = new Client();
    await client.connect();

    const query = `
      UPDATE tdfactura
      SET fkcods_fac = $1
      WHERE cod_fac = $2;
    `;
    const values = [status, cod_fac];
    const res = await client.query(query, values);

    if (res.rowCount === 0) {
      throw new Error("No se pudo actualizar el estado de la factura");
    }

    await client.end();
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
}