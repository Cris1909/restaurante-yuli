"use client";

import { createReporteDiario } from "@/actions/reportes-action";
import {
  getLocalTimeZone,
  today,
  toCalendarDate,
  parseDate,
} from "@internationalized/date";
import {
  Button,
  Calendar,
  Card,
  CardBody,
  DateInput,
  DatePicker,
  DateValue,
  Divider,
  Input,
  Switch,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as z from "zod";

const ReportSchema = z.object({
  fecha_gd: z.date(),
  compras_gd: z.number().min(0, "Debe ser mayor o igual a 0"),
  varios_gd: z.number().min(0, "Debe ser mayor o igual a 0"),
  salarios_gd: z.number().min(0, "Debe ser mayor o igual a 0"),
  arriendo_gd: z.number().min(0, "Debe ser mayor o igual a 0"),
  gas_gd: z.number().min(0, "Debe ser mayor o igual a 0"),
  servicios_gd: z.number().min(0, "Debe ser mayor o igual a 0"),
  vehiculo_gd: z.number().min(0, "Debe ser mayor o igual a 0"),
  banco_gd: z.number().min(0, "Debe ser mayor o igual a 0"),
  ventas_gd: z.number().optional(),
  autogenerarVentas: z.boolean(),
});

interface ReportFormData {
  compras_gd: number;
  varios_gd: number;
  salarios_gd: number;
  arriendo_gd: number;
  gas_gd: number;
  servicios_gd: number;
  vehiculo_gd: number;
  banco_gd: number;
  ventas_gd?: number;
}

interface InputProps {
  label: string;
  name: keyof ReportFormData;
}

const GASTOS_OPERATIVOS: InputProps[] = [
  { label: "Salarios", name: "salarios_gd" },
  { label: "Arriendo", name: "arriendo_gd" },
  { label: "Gas", name: "gas_gd" },
  { label: "Servicios", name: "servicios_gd" },
  { label: "Vehículo", name: "vehiculo_gd" },
  { label: "Banco", name: "banco_gd" },
];

const GASTOS_INVERSION: InputProps[] = [
  { label: "Compras", name: "compras_gd" },
  { label: "Varios", name: "varios_gd" },
];

interface Props {
  gastosFijos: any;
  reportesCreados: any[];
}

export const ReporteForm: React.FC<Props> = ({
  gastosFijos,
  reportesCreados,
}) => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [autogenerarVentas, setAutogenerarVentas] = useState(true);
  const [date, setDate] = useState<any>(null);

  useEffect(() => {
    const fechasInvalidas = reportesCreados.flat();
    if (fechasInvalidas.includes(today(getLocalTimeZone()).toString())) {
      return;
    }
    setDate(today(getLocalTimeZone()));
  }, [reportesCreados]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },

  } = useForm<ReportFormData>({
    defaultValues: {
      salarios_gd: gastosFijos.salarios || 0,
      arriendo_gd: gastosFijos.arriendo || 0,
      gas_gd: gastosFijos.gas || 0,
      servicios_gd: gastosFijos.servicios || 0,
      vehiculo_gd: gastosFijos.vehiculo || 0,
      banco_gd: gastosFijos.banco || 0,
    },
  });

  const parseToNumber = (fields: any) => {
    Object.keys(fields).forEach((key) => {
      fields[key] = fields[key] ? +fields[key] : 0;
    });
    return fields;
  };

  const onSubmit: SubmitHandler<ReportFormData> = async (data) => {
    const fecha_gd = date?.toDate("UTC");

    try {
      setIsLoading(true);

      const newReporte = {
        autogenerarVentas,
        ...parseToNumber(data),
        fecha_gd,
      };

      try {
        ReportSchema.parse(newReporte);
      } catch (error) {
        if (error instanceof z.ZodError) {
          error.errors.forEach((err) => {
            toast.error(err.message);
          });
          return;
        }
      }

      await createReporteDiario({
        ...newReporte,
        fecha_gd: date.toString(),
      });
      toast.success("Reporte creado correctamente");
      reset();
      router.push("/plataforma/reportes");
    } catch (error: any) {
      toast.error(error.message || "Ocurrió un error");
    } finally {
      setIsLoading(false);
    }
  };

  const isDateUnavailable = (date: DateValue) => {
    return reportesCreados.some(
      (interval: any) =>
        date.compare(parseDate(interval[0])) >= 0 &&
        date.compare(parseDate(interval[1])) <= 0
    );
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-6 flex flex-col lg:flex-row gap-4"
    >
      <section className="flex-1 grid md:grid-cols-2 gap-4">
        {/* Gastos de Inversión */}
        <Card className="self-start animate__fade-in-up">
          <CardBody className="p-4 flex flex-col gap-4">
            <section className="flex flex-col gap-2">
              <div>
                <h2 className="text-xl font-extrabold mb-2">
                  Gastos de Inversión
                </h2>
                <Divider />
              </div>
              {GASTOS_INVERSION.map(({ label, name }) => (
                <Input
                  key={name}
                  fullWidth
                  label={label}
                  type="number"
                  placeholder={`Ingrese el monto`}
                  {...register(name, { required: true })}
                  isInvalid={!!errors[name]}
                  errorMessage={errors[name]?.message}
                  isRequired
                />
              ))}
            </section>
          </CardBody>
        </Card>
        {/* Gastos Operativos */}
        <Card className="self-start animate__fade-in-up">
          <CardBody className="p-4 flex flex-col gap-4">
            <section className="flex flex-col gap-2">
              <div>
                <h2 className="text-xl font-extrabold mb-2">
                  Gastos Operativos
                </h2>
                <Divider />
              </div>
              {GASTOS_OPERATIVOS.map(({ label, name }) => (
                <Input
                  key={name}
                  fullWidth
                  label={label}
                  type="number"
                  placeholder={`Ingrese el monto`}
                  {...register(name, { required: true })}
                  isInvalid={!!errors[name]}
                  errorMessage={errors[name]?.message}
                  isRequired
                />
              ))}
            </section>
          </CardBody>
        </Card>
      </section>

      {/* Selección de Fecha */}
      <section>
        <Card className="animate__fade-in-up">
          <CardBody className="p-4 flex flex-col gap-2">
            <div>
              <h2 className="text-xl font-extrabold mb-2">Fecha del reporte</h2>
              <Divider />
            </div>
            <div className="mx-auto flex flex-col gap-2">
              <DateInput
                label="Fecha"
                value={date}
                onChange={(date) => setDate(date)}
                isDateUnavailable={isDateUnavailable}
                isRequired
              />
              <Calendar
                value={date}
                onChange={(date) => setDate(date)}
                isDateUnavailable={isDateUnavailable}
                showMonthAndYearPickers
                errorMessage=""
                classNames={{
                  base: "w-80",
                  content: "w-80",
                  errorMessage: "hidden",
                  gridHeaderCell: "w-10",
                  cell: "w-10 h-10 grid place-items-center",
                }}
                maxValue={today(getLocalTimeZone())}
              />
            </div>

            <Divider />
            <Switch
              isSelected={autogenerarVentas}
              onValueChange={setAutogenerarVentas}
            >
              Autogenerar Ventas
            </Switch>
            {!autogenerarVentas && (
              <Input
                fullWidth
                min={0}
                label="Ventas"
                type="number"
                placeholder="Ingrese las ventas"
                {...register("ventas_gd", {required: true})}
                isInvalid={!!errors.ventas_gd}
                errorMessage={errors.ventas_gd?.message}
                isRequired
              />
            )}

            <Divider />

            {/* Botón de Envío */}
            <Button
              className="btn btn-primary"
              type="submit"
              isDisabled={isLoading || !isValid || !date}
            >
              {isLoading ? "Cargando..." : "Crear Reporte"}
            </Button>
          </CardBody>
        </Card>
      </section>
    </form>
  );
};
