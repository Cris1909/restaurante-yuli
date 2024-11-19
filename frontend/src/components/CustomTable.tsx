import { formatMoney, getImage } from "@/helpers";
import { cn } from "@nextui-org/react";
import Image from "next/image";
import React from "react";

interface Column {
  header?: string;
  accessor: string;
  template?: (item: any) => React.ReactNode;
  type?: "icon" | "text" | "price";
}

interface Props {
  columns: Column[];
  data: any[];
  tableClassName: string;
  footerComponent?: React.ReactNode;
}

export const CustomTable: React.FC<Props> = ({
  columns,
  data,
  tableClassName,
  footerComponent,
}) => {
  const renderRow = (item: any, column: Column) => {
    return (
      <div key={column.accessor} className={`cell ${column.type}`}>
        {column.template ? (
          column.template(item)
        ) : column.type === "icon" ? (
          <Image
            width={32}
            height={32}
            src={getImage(item[column.accessor])}
            alt={item.nom_prod}
            className="table-image"
          />
        ) : column.type === "price" ? (
          `$ ${formatMoney(item[column.accessor])}`
        ) : (
          item[column.accessor]
        )}
      </div>
    );
  };

  return (
    <div className={cn("grid-table", tableClassName || "")}>
      {/* Header */}
      <div className="header">
        {columns.map((column) => (
          <div key={column.accessor} className={`cell ${column.type}`}>
            {column.type === "icon" ? (
              <i className="i-mdi-image-outline header-icon"></i>
            ) : (
              column.header
            )}
          </div>
        ))}
      </div>

      {/* Rows */}
      {data.map((item, index) => (
        <div className="row" key={index}>
          {columns.map((column) => renderRow(item, column))}
        </div>
      ))}

      {/* Footer */}
      {footerComponent}
    </div>
  );
};
