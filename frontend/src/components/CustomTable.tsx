import { formatMoney, getImage } from "@/helpers";
import {
  cn,
  Image,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import React, { Key, useMemo } from "react";

interface Column {
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
  tableClassName: string;
  footerComponent?: React.ReactNode;
  emptyMessage?: string;
}

export const CustomTable: React.FC<Props> = ({
  columns,
  data,
  tableClassName,
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
            radius="sm"
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
  }, [data]);

  return (
    <>
      <Table bottomContent={footerComponent}>
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
        <TableBody items={items}>
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

  // return (
  //   <div className={cn("grid-table", tableClassName || "")}>
  //     {/* Header */}
  //     <div className="header">
  //       {columns.map((column) => (
  //         <div key={column.accessor} className={`cell ${column.type}`}>
  //           {column.type === "icon" ? (
  //             <i className="i-mdi-image-outline header-icon"></i>
  //           ) : (
  //             column.header
  //           )}
  //         </div>
  //       ))}
  //     </div>

  //     {/* Rows */}
  //     {data.length > 0 ? (
  //       data.map((item, index) => (
  //         <div className="row" key={index}>
  //           {columns.map((column) => renderRow(item, column))}
  //         </div>
  //       ))
  //     ) : (
  //       <div className="empty-message">{emptyMessage}</div>
  //     )}

  //     {/* Footer */}
  //
  //   </div>
  // );
};
