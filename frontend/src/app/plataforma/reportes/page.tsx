import { getReportes } from "@/actions/reportes-action";
import { Button } from "@nextui-org/react";
import { Metadata } from "next";
import Link from "next/link";
import { ReportesManager } from "./components/ReportesManager";

export const metadata: Metadata = {
  title: "Reportes",
  description: "Reportes de la plataforma",
};

export default async function ReportesPage() {
  const reportes = await getReportes("2024-11-20", "2024-11-30");

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
    <ReportesManager
    reportes={reportes}
    />
      </div>
    </div>
  );
}
