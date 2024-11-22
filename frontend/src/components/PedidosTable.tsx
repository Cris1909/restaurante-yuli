/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { capitalazeText, formatHour } from "@/helpers";
import { Pedido } from "@/interfaces";
import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import React, { useMemo } from "react";
import { CustomTable } from "./CustomTable";
import { StatusChip } from "./StatusChip";
import { updateStatusFactura } from "@/actions/facturas.actions";
import { Status } from "@/enum";
import { toast } from "react-toastify";
import { orderStatus } from "@/constants";

interface Props {
  pedidos: Pedido[];
  showStatusActions?: boolean;
}

export const PedidosTable: React.FC<Props> = ({
  pedidos,
  showStatusActions = false,
}) => {
  const router = useRouter();

  const handleChangeStatus = async (cod: number, status: Status) => {
    try {
      await updateStatusFactura(cod, status);
      router.refresh();
      toast.success("Estado actualizado correctamente");
    } catch (error) {
      toast.error("Error al cambiar el estado del pedido");
    }
  };

  const items: any[] = useMemo(() => {
    const cols = [
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
        template: (item: Pedido) => `${formatHour(item.hora_fac)}`,
      },
      { header: "Tipo cliente", accessor: "dtipo_cliente", type: "text" },
      {
        header: "Estado",
        accessor: "dstatus",
        type: "text",
        template: (item: Pedido) => (
          <StatusChip status={item.fkcods_fac}>
            {capitalazeText(item.dstatus)}
          </StatusChip>
        ),
      },
      {
        header: "Acciones",
        accessor: "",
        template: (item: Pedido) => (
          <div className="flex items-center gap-2">
            {showStatusActions ? (
              <Popover color="default" placement="bottom">
                <PopoverTrigger>
                  <Button className="text-dark" color="primary" size="sm">
                    Cambiar estado
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="p-0 overflow-hidden">
                  <div className="flex flex-col gap-2 p-2">
                    {item.fkcods_fac !== Status.ENTREGADO ? (
                      <Button
                        size="sm"
                        className={orderStatus[Status.ENTREGADO].fullColor}
                        onClick={() =>
                          handleChangeStatus(item.cod_fac, Status.ENTREGADO)
                        }
                      >
                        <i className="i-ep-dish" />
                        Marcar como entregado
                      </Button>
                    ) : null}
                    <Button
                      size="sm"
                      className={orderStatus[Status.PAGADO].fullColor}
                      onClick={() =>
                        handleChangeStatus(item.cod_fac, Status.PAGADO)
                      }
                    >
                      <i className="i-mdi-check-circle-outline" />
                      Marcar como pagado
                    </Button>
                    <Button
                      size="sm"
                      className={orderStatus[Status.CANCELADO].fullColor}
                      onClick={() =>
                        handleChangeStatus(item.cod_fac, Status.CANCELADO)
                      }
                    >
                      <i className="i-mdi-cancel-circle-outline" />
                      Marcar como cancelado
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            ) : null}
                <Button
              className="bg-blue text-white"
              isIconOnly
              size="sm"
              onClick={() => router.push(`/plataforma/pedidos/${item.cod_fac}`)}
            >
              <i className="i-mdi-arrow-top-right" />
            </Button>
          </div>
        ),
      },
    ];

    return cols;
  }, [pedidos]);

  return <CustomTable columns={items} data={pedidos} />;
};
