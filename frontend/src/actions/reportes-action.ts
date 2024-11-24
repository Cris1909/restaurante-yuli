"use server";

import { Status } from "@/enum";
import { revalidatePath } from "next/cache";
import { Client } from "pg";

export const getGastosFijos = async () => {
  try {
    const client = new Client();
    await client.connect();
    const res = await client.query(`
      SELECT 
        cod_gf,
        salarios,
        arriendo,
        gas,
        servicios,
        vehiculo,
        banco
      FROM 
        tmgastos_fijos
      ORDER BY
        cod_gf DESC
      `);
    const gastosFijos = res.rows[0];
    await client.end();
    return gastosFijos;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
};

export const createReporteDiario = async (data: any) => {
  try {
    const client = new Client();
    await client.connect();

    //* Validar si está creado el reporte diario
    const resReporte = await client.query(
      `
      SELECT 
        cod_gd
      FROM 
        tmreporte_diario
      WHERE 
        fecha_gd = $1
      `,
      [data.fecha_gd]
    );

    if (resReporte.rows.length > 0) {
      await client.end();
      throw new Error("Ya existe un reporte diario para esta fecha");
    }

    //* Calcular ventas_gd
    let ventas_gd = data.autogenerarVentas ? 0 : data.ventas_gd;

    if (data.autogenerarVentas) {
      const res = await client.query(
        `
        SELECT 
          SUM(monto_total) as ventas
        FROM 
          tdfactura
        WHERE 
          fkcods_fac = ${Status.PAGADO} AND
          fecha_fac = $1
        `,
        [data.fecha_gd]
      );
      ventas_gd = res.rows[0].ventas;

      if (!ventas_gd) {
        throw new Error("No hay ventas registradas para esta fecha");
      }
    }

    //* Creación del reporte diario
    const res = await client.query(
      `
      INSERT INTO 
        tmreporte_diario(
          fecha_gd,
          salarios_gd,
          arriendo_gd,
          gas_gd,
          servicios_gd,
          vehiculo_gd,
          banco_gd,
          compras_gd,
          varios_gd,
          ventas_gd
        )
      VALUES (
        $1,
        $2,
        $3,
        $4,
        $5,
        $6,
        $7,
        $8,
        $9,
        $10
      )
      `,
      [
        data.fecha_gd,
        data.salarios_gd,
        data.arriendo_gd,
        data.gas_gd,
        data.servicios_gd,
        data.vehiculo_gd,
        data.banco_gd,
        data.compras_gd,
        data.varios_gd,
        ventas_gd,
      ]
    );

    await client.end();
    revalidatePath("/plataforma/reportes");
    revalidatePath("/plataforma/reportes/crear");

    return { success: true };
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
};

export const getReportesDateRanges = async () => {
  try {
    const client = new Client();
    await client.connect();
    const res = await client.query(`
      SELECT 
        fecha_gd
      FROM 
        tmreporte_diario
      ORDER BY
        fecha_gd ASC
    `);

    const reportesDates = res.rows
      .map((row) => new Date(row.fecha_gd))

    if (reportesDates.length === 0) {
      await client.end();
      return [];
    }

    // Generar rangos de fechas
    const dateRanges: Array<string[]> = [];
    let currentStart = reportesDates[0];

    for (let i = 1; i < reportesDates.length; i++) {
      const currentDate = reportesDates[i];
      const previousDate = reportesDates[i - 1];

      // Verificar si hay un día faltante
      if (
        currentDate.getTime() - previousDate.getTime() >
        24 * 60 * 60 * 1000
      ) {
        // Si hay brecha, cerrar el rango actual
        dateRanges.push([
          currentStart.toISOString().split("T")[0],
          previousDate.toISOString().split("T")[0],
        ]);

        // Iniciar un nuevo rango
        currentStart = currentDate;
      }
    }

    // Agregar el rango final
    dateRanges.push([
      currentStart.toISOString().split("T")[0],
      reportesDates[reportesDates.length - 1].toISOString().split("T")[0],
    ]);

    await client.end();

    return dateRanges;
  } catch (error: any) {
    console.error(error);
    return [];
  }
};

export const createGastosFijos = async (data: any) => {
  try {
    const client = new Client();
    await client.connect();
    const res = await client.query(`
      INSERT INTO 
        tmgastos_fijos(
          salarios,
          arriendo,
          gas,
          servicios,
          vehiculo,
          banco
        )
      VALUES (
        $1,
        $2,
        $3,
        $4,
        $5,
        $6
      )
      `,
      [
        data.salarios,
        data.arriendo,
        data.gas,
        data.servicios,
        data.vehiculo,
        data.banco,
      ]
    );
    await client.end();
    revalidatePath("/plataforma/reportes");
    revalidatePath("/plataforma/reportes/crear");
    revalidatePath("/plataforma/reportes/gastos-fijos");
    return { success: true };
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
}
