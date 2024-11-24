/* eslint-disable react-hooks/exhaustive-deps */
import { formatMoney, getImage } from "@/helpers";
import {
  cn,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import Image from "next/image";
import React, { Key, useMemo } from "react";

export interface Column {
  header?: string;
  accessor: string;
  template?: (item: any) => React.ReactNode;
  type?: "icon" | "text" | "price";
  align?: "start" | "center" | "end";
  width?: number;
}

interface Props {
  columns: Column[];
  data: any[];
  footerComponent?: React.ReactNode;
  emptyMessage?: string;
}

export const CustomTable: React.FC<Props> = ({
  columns,
  data,
  footerComponent,
  emptyMessage = "No hay datos disponibles",
}) => {
  const renderRow = (item: any, columnKey: Key) => {
    const column = columns.find((c) => c.accessor === columnKey);
    if (!column) return null;
    return (
      <div key={column.accessor}>
        {column.template ? (
          column.template(item)
        ) : column.type === "icon" ? (
          <Image
            width={32}
            height={32}
            src={getImage(item[column.accessor])}
            alt={item.nom_prod}
            className="rounded-md object-cover object-center w-8 h-8"
          />
        ) : column.type === "price" ? (
          `$ ${formatMoney(item[column.accessor])}`
        ) : (
          item[column.accessor]
        )}
      </div>
    );
  };

  const items = useMemo(() => {
    return data.map((d, id) => ({ ...d, id }));
  }, [data, columns]);

  return (
    <>
      <Table bottomContent={footerComponent} aria-label="Custom table">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              align={column.align}
              className="bg-dark text-white"
              width={
                column.width
                  ? column.width
                  : column.type === "icon"
                  ? 56
                  : undefined
              }
              key={column.accessor}
            >
              {column.type === "icon" ? (
                <div className="grid place-content-center">
                  <i className={cn("", column.header)} />
                </div>
              ) : (
                column.header
              )}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody emptyContent={emptyMessage} items={items}>
          {(item) => (
            <TableRow>
              {(columnKey) => (
                <TableCell>{renderRow(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
};
