"use client";

import { useRouter } from "next/navigation";
import { CustomTable } from "@/components/CustomTable";
import React, { useState } from "react";
import { capitalazeText, formatHour } from "@/helpers";
import {
  Button,
  Chip,
  Divider,
  Pagination,
  Select,
  SelectItem,
  Tooltip,
} from "@nextui-org/react";
import { DateRangePicker } from "@nextui-org/react";
import { parseDate } from "@internationalized/date";
import { ClientType } from "@/interfaces";
import { Status } from "@/enum";
import { StatusChip } from "@/components";

const orderStatusColors: any = {
  [Status.PENDIENTE]: "bg-warning-light text-warning-dark",
  [Status.ENTREGADO]: "bg-info-light text-info-dark",
  [Status.PAGADO]: "bg-success-light text-success-dark",
  [Status.CANCELADO]: "bg-danger-light text-danger-dark",
};

interface Pedido {
  cod_fac: number;
  monto_total: number;
  fecha_fac: string;
  hora_fac: string;
  fktc_fac: number;
  fkcods_fac: number;
  dtipo_cliente: string;
  dstatus: string;
}

interface Props {
  pedidos: Pedido[];
  totalPages: number;
  clientTypes: ClientType[];
  filters: {
    currentPage: number;
    pageSize: number;
    fktc_fac?: string;
    sortDirection?: "asc" | "desc";
    startDate?: string;
    endDate?: string;
  };
}

export const PedidosTable: React.FC<Props> = ({
  pedidos,
  totalPages,
  clientTypes,
  filters: {
    currentPage,
    pageSize,
    fktc_fac,
    sortDirection,
    startDate,
    endDate,
  },
}) => {
  const router = useRouter();

  const [filters, setFilters] = useState({
    fktc_fac: fktc_fac || "",
    sortDirection: sortDirection || "asc",
    startDate: startDate || "",
    endDate: endDate || "",
  });

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handlePageChange = (newPage: number) => {
    handleApplyFilters(newPage);
  };

  const handleApplyFilters = (page: number = 1) => {
    const queries = new URLSearchParams();
    queries.set("page", page + "");
    Object.entries(filters).forEach(([key, value]) => {
      if (!value) return;
      if (key === "fktc_fac" && value === "all") return;
      queries.set(key, value);
    });
    router.push("?" + queries.toString());
  };

  return (
    <div>
      {/* Filtros */}
      <div className="flex flex-col lg:flex-row justify-between mb-4 gap-y-2 lg:items-end">
        <div className="flex flex-col md:flex-row gap-2">
          <DateRangePicker
            className="lg:w-72"
            label="Filtrar por Fecha"
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

          <div className="flex flex-row gap-2">
            <Select
              size="md"
              className="md:w-48"
              startContent={<i className="i-mdi-user" />}
              label="Filtar por tipo de cliente"
              selectedKeys={new Set([filters.fktc_fac || "all"])}
              onSelectionChange={(values) =>
                handleFilterChange("fktc_fac", values.currentKey || "")
              }
            >
              {clientTypes.map((tc) => (
                <SelectItem key={tc.cod_tc} value={tc.cod_tc}>
                  {tc.dtipo_cliente}
                </SelectItem>
              ))}
            </Select>

            <Select
              label="Ordenar por fecha"
              selectedKeys={new Set([filters.sortDirection || ""])}
              onSelectionChange={(values) =>
                handleFilterChange("sortDirection", values.currentKey || "")
              }
              className="md:w-48"
            >
              <SelectItem key={"asc"} value="asc">
                Ascendente
              </SelectItem>
              <SelectItem key={"desc"} value="desc">
                Descendente
              </SelectItem>
            </Select>
          </div>
        </div>
        <Divider className="md:hidden" />
        <Button onClick={() => handleApplyFilters()} className="btn btn-black">
          Aplicar Filtros
        </Button>
      </div>

      {/* Tabla */}
      <CustomTable
        columns={[
          { header: "Código", accessor: "cod_fac", type: "text" },
          { header: "Monto Total", accessor: "monto_total", type: "price" },
          {
            header: "Fecha",
            accessor: "fecha_fac",
            type: "text",
            template: (item: Pedido) =>
              `${new Date(item.fecha_fac).toLocaleDateString("es-CO")}`,
          },
          {
            header: "Hora",
            accessor: "hora_fac",
            type: "text",
            template: (item) => `${formatHour(item.hora_fac)}`,
          },
          { header: "Tipo cliente", accessor: "dtipo_cliente", type: "text" },
          {
            header: "Estado",
            accessor: "dstatus",
            type: "text",
            template: (item: Pedido) => (
              <StatusChip status={item.fkcods_fac}>{capitalazeText(item.dstatus)}</StatusChip>

            ),
          },
          {
            header: "Acciones",
            accessor: "",
            template: (item: Pedido) => (
              <Button
                className="bg-blue text-white"
                isIconOnly
                size="sm"
                onClick={() => router.push(`/plataforma/pedidos/${item.cod_fac}`)}
              >
                <i className="i-mdi-arrow-top-right" />
              </Button>
            ),
          },
        ]}
        data={pedidos}
      />
      {/* Paginación */}
      <div className="mt-2">
        <Pagination
          isCompact
          showControls
          total={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          classNames={{
            cursor: "bg-dark",
          }}
        />
      </div>
    </div>
  );
};
