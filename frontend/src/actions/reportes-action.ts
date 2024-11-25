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
        cod_rd
      FROM 
        tmreporte_diario
      WHERE 
        fecha_rd = $1
      `,
      [data.fecha_rd]
    );

    if (resReporte.rows.length > 0) {
      await client.end();
      throw new Error("Ya existe un reporte diario para esta fecha");
    }

    //* Calcular ventas_rd
    let ventas_rd = data.autogenerarVentas ? 0 : data.ventas_rd;

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
        [data.fecha_rd]
      );
      ventas_rd = res.rows[0].ventas;

      if (!ventas_rd) {
        throw new Error("No hay ventas registradas para esta fecha");
      }
    }

    //* Creación del reporte diario
    const res = await client.query(
      `
      INSERT INTO 
        tmreporte_diario(
          fecha_rd,
          salarios_rd,
          arriendo_rd,
          gas_rd,
          servicios_rd,
          vehiculo_rd,
          banco_rd,
          compras_rd,
          varios_rd,
          ventas_rd
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
        data.fecha_rd,
        data.salarios_rd,
        data.arriendo_rd,
        data.gas_rd,
        data.servicios_rd,
        data.vehiculo_rd,
        data.banco_rd,
        data.compras_rd,
        data.varios_rd,
        ventas_rd,
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
        fecha_rd
      FROM 
        tmreporte_diario
      ORDER BY
        fecha_rd ASC
    `);

    const reportesDates = res.rows.map((row) => new Date(row.fecha_rd));

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
    const res = await client.query(
      `
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
};

export const groupByWeek = (data: any[]) => {
  const groupedFinance: any = {
    fecha_rd: 0,
    salarios_rd: 0,
    arriendo_rd: 0,
    gas_rd: 0,
    servicios_rd: 0,
    vehiculo_rd: 0,
    banco_rd: 0,
    compras_rd: 0,
    varios_rd: 0,
    ventas_rd: 0,
  };

  const grouped = data.reduce((acc: any, item: any) => {
    // Obtener la fecha del reporte
    const date = new Date(item.fecha_rd);

    // Calcular el primer día de la semana (lunes)
    const dayOfWeek = date.getDay();
    const diffToMonday = (dayOfWeek + 6) % 7; // Lunes es 0, Domingo es 6
    date.setDate(date.getDate() - diffToMonday); // Ajustar la fecha al lunes de esa semana

    // Usar el lunes de la semana como identificador
    const startDate = date.toISOString().split("T")[0]; // Formato YYYY-MM-DD
    const endDate = new Date(date); // Copiar la fecha
    endDate.setDate(date.getDate() + 6); // Sumar 6 días para obtener el domingo

    if (!acc[startDate]) {
      acc[startDate] = {
        startDate: date,
        endDate: endDate,
        dailyReports: [],
      };
    }

    // Agregar el reporte diario a la semana correspondiente
    acc[startDate].dailyReports.push(item);

    // Sumar los valores del reporte diario a los totales de la semana
    Object.keys(item).forEach((key) => {
      if (key !== "fecha_rd") {
        groupedFinance[key] += item[key];
        acc[startDate][key] = (acc[startDate][key] || 0) + item[key];
      }
    });

    return acc;
  }, {});

  return {
    finances: groupedFinance,
    reportes: Object.values(grouped),
  };
};

export const getReportes = async (startDate: string, endDate: string) => {
  try {
    const client = new Client();
    await client.connect();

    // Base query for fetching paginated records
    const query = `
      SELECT
        cod_rd,
        fecha_rd,
        salarios_rd,
        arriendo_rd,
        gas_rd,
        servicios_rd,
        vehiculo_rd,
        banco_rd,
        compras_rd,
        varios_rd,
        ventas_rd
      FROM
        tmreporte_diario
      WHERE
        fecha_rd >= $1 AND
        fecha_rd <= $2 
    `;
    const res = await client.query(query, [startDate, endDate]);

    await client.end();
    return groupByWeek(res.rows);
  } catch (error: any) {
    console.error(error);
    throw new Error(error.message);
  }
};
