"use client";

import { createUser } from "@/actions/users-actions";
import { PasswordInput } from "@/components";
import { Cargo } from "@/interfaces";
import {
  Card,
  Divider,
  Input,
  Button,
  CardBody,
  CardHeader,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as z from "zod";

export const UserSchema = z.object({
  ced_user: z
    .string()
    .min(1, "La cédula es obligatoria")
    .max(12, "La cédula no debe exceder los 12 caracteres"),
  nom_user: z
    .string()
    .min(1, "El nombre es obligatorio")
    .max(100, "El nombre no debe exceder los 100 caracteres"),
  email_user: z
    .string()
    .email("Debe ser un correo electrónico válido")
    .max(100, "El correo electrónico no debe exceder los 100 caracteres"),
  password_user: z
    .string()
    .min(1, "La contraseña es obligatoria")
    .max(100, "La contraseña no debe exceder los 100 caracteres"),
  fkcod_car_user: z
    .number({
      required_error: "El código de cargo es obligatorio",
      invalid_type_error: "El código de cargo debe ser un número",
    })
});

interface UserFormData {
  ced_user: string;
  nom_user: string;
  email_user: string;
  password_user: string;
  fkcod_car_user: number;
}

interface Props {
  cargos: Cargo[];
}

export const UserForm: React.FC<Props> = ({ cargos }) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors},
  } = useForm<UserFormData>({});

  const onSubmit: SubmitHandler<UserFormData> = async (data) => {
    try {
      setIsLoading(true);
      await createUser({...data, fkcod_car_user: +data.fkcod_car_user});
      setIsLoading(false);
      toast.success("Usuario creado correctamente");
      router.push("/plataforma/usuarios");
    } catch (error) {
      if (error instanceof z.ZodError) {
        error.errors.forEach((err) => {
          toast.error(err.message);
        });
      } else {
        toast.error("Error al crear el usuario");
      }
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-6 grid lg:grid-cols-2">
      <Card className="p-4 animate__fade-in-up">
        <CardBody className="flex flex-col gap-4">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <Input
              fullWidth
              labelPlacement="outside"
              size="md"
              type="number"
              label="Cédula"
              placeholder="Ingrese la cédula"
              {...register("ced_user", { required: true })}
              isDisabled={isLoading}
              isInvalid={!!errors.ced_user}
              errorMessage={errors.ced_user?.message}
              isRequired
            />
            <Input
              fullWidth
              labelPlacement="outside"
              size="md"
              label="Nombre"
              type="text"
              placeholder="Ingrese el nombre"
              {...register("nom_user", { required: true })}
              isDisabled={isLoading}
              isInvalid={!!errors.nom_user}
              errorMessage={errors.nom_user?.message}
              isRequired
            />
            <Input
              fullWidth
              labelPlacement="outside"
              size="md"
              type="email"
              label="Correo electrónico"
              placeholder="correo@gmail.com"
              {...register("email_user", { required: true })}
              isDisabled={isLoading}
              isInvalid={!!errors.email_user}
              errorMessage={errors.email_user?.message}
              isRequired
            />
            <PasswordInput
              register={register("password_user", { required: true })}
              isDisabled={isLoading}
              isInvalid={!!errors.password_user}
              errorMessage={errors.password_user?.message}
              isRequired
            />
            <div>
              <Select
                fullWidth
                size="md"
                label="Código de Cargo"
                labelPlacement="outside"
                placeholder="Seleccione un cargo"
                {...register("fkcod_car_user", { required: true })}
                disabled={isLoading}
                isInvalid={!!errors.fkcod_car_user}
                errorMessage={errors.fkcod_car_user?.message}
                isRequired
              >
                {cargos.map((cargo) => (
                  <SelectItem key={cargo.cod_car} value={cargo.cod_car}>
                    {cargo.dcar}
                  </SelectItem>
                ))}
              </Select>
            </div>
            <Divider />
            <button className="btn btn-primary" disabled={isLoading}>
              {isLoading ? "Cargando..." : "Crear Usuario"}
            </button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};