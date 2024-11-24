import { Metadata } from "next";
import { ReporteForm } from "../components/ReporteForm";
import { getGastosFijos, getReportesDateRanges } from "@/actions/reportes-action";

export const metadata: Metadata = {
  title: "Crear Reporte",
  description: "Crear un reporte diario basado en gastos fijos",
};

export default async function CrearReportePage() {
  // Obtiene los datos de gastos fijos desde tu backend o base de datos
  const [gastosFijos, reportesCreados] = await Promise.all([
    getGastosFijos(),
    getReportesDateRanges(),
  ]);

  return (
    <div className="main-container">
      <h1 className="title">Crear Reporte Diario</h1>
      {/* Pasamos los datos como props al formulario */}
      <ReporteForm gastosFijos={gastosFijos} reportesCreados={reportesCreados} />
    </div>
  );
}
