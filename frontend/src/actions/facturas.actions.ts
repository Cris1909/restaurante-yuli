"use server";

import { Client } from "pg";

export const createFacturaWithDetails = async (
  factura: any,
  detalle_factura: any[]
) => {
  try {
    const client = new Client();
    await client.connect();

    // Insertar la factura
    const insertFacturaQuery = `
      INSERT INTO tdfactura (monto_total, obs_fac, tc_fac, fkced_vendedor)
      VALUES ($1, $2, $3, $4)
      RETURNING cod_fac;
    `;
    const insertFacturaValues = [
      factura.monto_total,
      factura.obs_fac,
      factura.tc_fac,
      factura.fkced_vendedor,
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
