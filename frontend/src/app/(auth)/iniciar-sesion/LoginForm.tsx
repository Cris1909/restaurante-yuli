"use client";

import { Card, CardBody, CardHeader, Divider, Input } from "@nextui-org/react";

import { loginEmail, loginUser } from "@/actions/auth-action";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as z from "zod";
import { PasswordInput } from "@/components";

export const LoginSchema = z.object({
  email: z
    .string()
    .min(1, "El correo electrónico es obligatorio")
    .max(100, "El correo electrónico no debe exceder los 100 caracteres"),
  password: z
    .string()
    .min(1, "La contreseña es obligatoria")
    .max(200, "La contreseña no debe exceder los 200 caracteres"),
});

interface LoginData {
  email: string;
  password: string;
}

export const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginData>({});

  const onSubmit: SubmitHandler<LoginData> = async (data) => {
    try {
      setIsLoading(true);
      const response = await loginUser(data);
      setIsLoading(false);
      if (!response) {
        reset();
        return toast.error("Credenciales incorrectas");
      }
      router.push("/plataforma");
      toast.success("Inicio de sesión exitoso");
    } catch (err: any) {
      toast.error(err.message);
      setIsLoading(false);
    }
  };

  console.log(errors);

  return (
    <Card className="h-auto lg:mr-[150px] mr-auto p-10 md:rounded-md max-w-[520px] w-full ml-auto animate__fade-in-up">
      <CardHeader className="pb-0">
        <h2 className="title">Iniciar sesión</h2>
      </CardHeader>
      <CardBody className="flex flex-col gap-4">
        <div className="text-default-500  text-base">
          Ingresa a la plataforma del{" "}
          <span className="text-default-600 font-bold">Restaurante Yuli</span>
        </div>
        <Divider />
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <Input
            fullWidth
            labelPlacement="outside"
            size="md"
            type="email"
            label="Correo electrónico"
            placeholder="correo@gmail.com"
            {...register("email", { required: true })}
            isDisabled={isLoading}
            isInvalid={!!errors.email}
            errorMessage={errors.email?.message}
            isRequired
            autoComplete="email"
          />
          <PasswordInput
            isRequired
            isDisabled={isLoading}
            isInvalid={!!errors.password}
            errorMessage={errors.password?.message}
            register={register("password", { required: true })}
            autoComplete="current-password"
          />
          <Divider />
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isLoading}
          >
            {isLoading ? "Cargando..." : "Iniciar sesión"}
          </button>
        </form>
      </CardBody>
    </Card>
  );
};
