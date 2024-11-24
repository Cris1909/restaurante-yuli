import { Button } from "@nextui-org/react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Reportes",
  description: "Reportes de la plataforma",
};

export default function ReportesPage() {
  return (
    <div className="main-container">
      <h1 className="title">Reportes</h1>
      <div className="mt-4">
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
          className="btn btn-primary"
        >
          Crear reporte
        </Button>
      </div>
    </div>
  );
}
