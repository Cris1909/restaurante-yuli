"use client";

import { CustomTable } from "@/components";
import { formatMoney } from "@/helpers";
import { useSearchParams } from "@/hooks";
import { parseDate } from "@internationalized/date";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Chip,
  cn,
  DateRangePicker,
  Divider,
} from "@nextui-org/react";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useMemo } from "react";

interface Reportes {
  cod_rd: number;
  fecha_rd: Date;
  salarios_rd: number;
  arriendo_rd: number;
  gas_rd: number;
  servicios_rd: number;
  vehiculo_rd: number;
  banco_rd: number;
  compras_rd: number;
  varios_rd: number;
  ventas_rd: number;
}

interface ReporteRange {
  startDate: string;
  endDate: string;
  dailyReports: Reportes[];
  isTotalReport?: boolean;
}

const CardTotal = ({
  title,
  total,
  headerClassName = "bg-dark",
}: {
  title: string;
  total: number;
  headerClassName?: string;
}) => (
  <Card className="p-4">
    <CardHeader
      className={cn(
        "text-white rounded-lg text-small h-10 p-0 flex flex-col justify-center items-center px-4",
        headerClassName
      )}
    >
      <span>{title}</span>
    </CardHeader>
    <CardBody className="p-0 pt-2 px-2">{formatMoney(total)}</CardBody>
  </Card>
);

const sumar = (...args: number[]) => args.reduce((acc, curr) => acc + curr, 0);

export const ReporteDiario: React.FC<ReporteRange> = ({
  dailyReports,
  endDate,
  startDate,
  isTotalReport = false,
}) => {
  const totals: Reportes = useMemo(() => {
    return dailyReports.reduce(
      (totals: any, row: any) => {
        Object.keys(row).forEach((key) => {
          if (key !== "fecha_rd") totals[key] = (totals[key] || 0) + row[key];
        });
        return totals;
      },
      { fecha_rd: "TOTAL" }
    );
  }, [dailyReports, isTotalReport]);

  const data = useMemo(() => {
    if (isTotalReport) return [totals];
    return [...dailyReports, totals];
  }, [dailyReports, totals]);

  const columnsGroup1: any = useMemo(() => {
    const colums = isTotalReport
      ? []
      : [
          {
            header: "Día",
            accessor: "fecha_rd",
            template: (item: any) => {
              if (item.fecha_rd === "TOTAL") return "TOTAL";

              const fecha = new Date(item.fecha_rd);
              const diaSemana = fecha.toLocaleDateString("es-CO", {
                weekday: "long",
              }); // Obtén el día de la semana
              const diaMes = fecha.toLocaleDateString("es-CO", {
                day: "2-digit",
              }); // Día del mes
              const mes = fecha.toLocaleDateString("es-CO", { month: "short" }); // Mes abreviado

              // Capitaliza el día de la semana y arma el formato
              return `${diaSemana.toUpperCase()} ${diaMes} ${mes}`;
            },
          },
        ];

    return [
      ...colums,
      {
        header: "Compras",
        accessor: "compras_rd",
        type: "price",
        align: "center",
      },
      {
        header: "Varios",
        accessor: "varios_rd",
        type: "price",
        align: "center",
      },
    ];
  }, []);

  const columnsGroup2: any = useMemo(
    () => [
      {
        header: "Salarios",
        accessor: "salarios_rd",
        type: "price",
        align: "center",
      },
      {
        header: "Arriendo",
        accessor: "arriendo_rd",
        type: "price",
        align: "center",
      },
      {
        header: "Gas",
        accessor: "gas_rd",
        type: "price",
        align: "center",
      },
      {
        header: "Servicios",
        accessor: "servicios_rd",
        type: "price",
        align: "center",
      },
      {
        header: "Vehículo",
        accessor: "vehiculo_rd",
        type: "price",
        align: "center",
      },
      {
        header: "Banco",
        accessor: "banco_rd",
        type: "price",
        align: "center",
      },
    ],
    []
  );

  const columnsGroup3: any = useMemo(
    () => [
      {
        header: "Ventas",
        accessor: "ventas_rd",
        type: "price",
        align: "center",
      },
    ],
    []
  );

  const gastosInversion = sumar(totals.compras_rd, totals.varios_rd);
  const gastosOperativos = sumar(
    totals.salarios_rd,
    totals.arriendo_rd,
    totals.gas_rd,
    totals.servicios_rd,
    totals.vehiculo_rd,
    totals.banco_rd
  );
  const utilidad = totals.ventas_rd - (gastosInversion + gastosOperativos);

  return (
    <div className="mt-2">
      {isTotalReport ? null : (
        <div className="flex items-center gap-2 px-2">
          <h2 className="subtitle font-bold">Reporte Semana:</h2>
          <Chip className="bg-orange-100">
            {new Date(startDate).toLocaleDateString("es-CO")}
          </Chip>
          <span>-</span>
          <Chip className="bg-orange-100">
            {new Date(endDate).toLocaleDateString("es-CO")}
          </Chip>
        </div>
      )}

      <div className="flex px-2 py-4 gap-4 overflow-x-scroll">
        <div className="flex flex-col gap-4">
          <CustomTable
            columns={columnsGroup1}
            data={data}
            classNames={{
              wrapper: clsx("w-[400px]", {
                "w-[250px]": isTotalReport,
              }),
            }}
          />

          <div className="flex">
            <CardTotal title="Gastos de Inversión" total={gastosInversion} />
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <CustomTable
            columns={columnsGroup2}
            data={data}
            classNames={{
              wrapper: "w-[660px]",
            }}
          />
          <div className="flex justify-between">
            <CardTotal title="Gastos Operativos" total={gastosOperativos} />
            <CardTotal title="Ventas" total={totals.ventas_rd} />
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <CustomTable
            columns={columnsGroup3}
            data={data}
            classNames={{
              wrapper: "w-[150px]",
            }}
          />
          <CardTotal
            title="Utilidad"
            total={utilidad}
            headerClassName="bg-primary text-dark"
          />
        </div>
      </div>
    </div>
  );
};

interface Props {
  groupedData: { reportes: ReporteRange[]; finances: Reportes };
  startDate?: string;
  endDate?: string;
}

export const ReportesManager = ({ groupedData, startDate, endDate }: Props) => {
  
  const { filters, handleFilterChange, handleApplyFilters } = useSearchParams({
    startDate: startDate || "",
    endDate: endDate || "",
  });

  return (
    <div className="mt-4">
      <div className="flex flex-col md:flex-row justify-between gap-2">
        <div className="flex gap-2">
          <DateRangePicker
            aria-label="Date range picker for reports"
            className="lg:w-72"
            size="md"
            value={
              [filters.startDate, filters.endDate].every((e) => e.length)
                ? {
                    start: parseDate(filters.startDate),
                    end: parseDate(filters.endDate),
                  }
                : null
            }
            onChange={(value) => {
              handleFilterChange("startDate", value.start.toString());
              handleFilterChange("endDate", value.end.toString());
            }}
          />
          <Button className="btn btn-primary px-8" onClick={handleApplyFilters}>
            Aplicar filtros
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <Button
            as={Link}
            href="/plataforma/reportes/gastos-fijos"
            className="btn btn-primary"
          >
            Editar gastos fijos
          </Button>
          <Button
            as={Link}
            href="/plataforma/reportes/crear"
            className="btn btn-black"
          >
            Crear reporte
          </Button>
        </div>
      </div>
      {groupedData ? (
        <>
          <Divider className="my-4" />

          <ReporteDiario
            dailyReports={[groupedData.finances]}
            endDate={new Date(endDate!).toString()}
            startDate={new Date(startDate!).toString()}
            isTotalReport
          />
          {groupedData.reportes?.map(
            ({ dailyReports, endDate, startDate }, i) => (
              <>
                <Divider className="my-4" />
                <ReporteDiario
                  key={startDate}
                  dailyReports={dailyReports}
                  startDate={startDate}
                  endDate={endDate}
                />
              </>
            )
          )}
        </>
      ) : (
        <div className="">
          <Divider className="my-4" />
          {startDate && endDate ? (
            <h2 className="subtitle">No hay reportes para mostrar</h2>
          ) : (
            <h2 className="subtitle">
              Selecciona un rango de fechas para ver los reportes
            </h2>
          )}
        </div>
      )}
    </div>
  );
};
