"use client";

import { ClientType, Product, Recargo } from "@/interfaces";
import {
  Button,
  Card,
  Divider,
  Input,
  Popover,
  Textarea,
  Tooltip,
} from "@nextui-org/react";
import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface ProductFormProps {
  product?: Product;
  clientTypes: ClientType[];
}

const ProductForm: React.FC<ProductFormProps> = ({ product, clientTypes }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Product>({
    defaultValues: {
      nom_prod: product?.nom_prod || "",
      dprod: product?.dprod || "",
      precio_base: product?.precio_base || 0,
      recargos: product?.recargos || [],
    },
  });

  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [recargos, setRecargos] = useState<Recargo[]>(product?.recargos || []);

  const onSubmit: SubmitHandler<Product> = async (data) => {
    let imageUrl = product?.img_prod as string;
    if (image) {
      // Subir imagen a Cloudinary
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", "your_upload_preset"); // Reemplaza con tu upload preset de Cloudinary

      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/your_cloud_name/image/upload",
        formData
      );

      imageUrl = response.data.secure_url;
    }

    // Aquí puedes manejar el guardado del producto con la URL de la imagen
  };

  const handleAddRecargo = (recargo: Recargo) => {
    setRecargos([...recargos, recargo]);
  };

  const handleUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const img = e.target.files?.[0];
    if (img) {
      const image = Object.assign(img);
      const url = URL.createObjectURL(image);
      setImagePreview(url);
      setImage(image);
    }
  };

  const handleDeleteImage = () => {
    setImage(null);
    setImagePreview(null);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-6 grid gap-4">
      <div className="flex flex-col lg:flex-row gap-4">
        <Card className="p-4 flex-1">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1 flex flex-col gap-4">
              <div>
                <h2 className="text-xl font-extrabold mb-2">Datos básicos</h2>
                <Divider />
              </div>
              <Input
                fullWidth
                labelPlacement="outside"
                size="md"
                label="Nombre"
                placeholder="Escribe el nombre del producto..."
                {...register("nom_prod", { required: true })}
                // helperText={errors.nom_prod && "Este campo es requerido"}
                // status={errors.nom_prod ? "error" : "default"}
              />
              <Textarea
                fullWidth
                labelPlacement="outside"
                size="md"
                label="Descripción"
                placeholder="Describe el producto..."
                {...register("dprod", { required: true })}
                // helperText={errors.dprod && "Este campo es requerido"}
                // status={errors.dprod ? "error" : "default"}
              />
              <Input
                fullWidth
                size="md"
                type="number"
                labelPlacement="outside"
                label="Precio base"
                placeholder="0"
                {...register("precio_base", {
                  required: true,
                  valueAsNumber: true,
                })}
                startContent={
                  <div className="pointer-events-none flex items-center">
                    <span className="text-default-400 text-small">$</span>
                  </div>
                }
                // helperText={errors.precio_base && "Este campo es requerido"}
                // status={errors.precio_base ? "error" : "default"}
              />
            </div>
          </div>
        </Card>
        <div className="flex flex-col md:flex-row gap-4">
          <Card className="p-4 md:w-full lg:w-[260px] flex flex-col gap-4">
            <div>
              <h2 className="text-xl font-extrabold mb-2">Recargos</h2>
              <Divider />
            </div>
            {clientTypes.map((clientType) => (
              <div key={clientType.cod_tc}>
                <Input
                  fullWidth
                  labelPlacement="outside"
                  size="md"
                  type="number"
                  label={clientType.dtipo_cliente + ":"}
                  placeholder="0"
                  onChange={(e) =>
                    handleAddRecargo({
                      cod_rec: new Date().getTime(),
                      fkcod_tc_rec: clientType.cod_tc,
                      recargo_cliente: Number(e.target.value),
                    })
                  }
                  startContent={
                    <div className="pointer-events-none flex items-center">
                      <span className="text-default-400 text-small">$</span>
                    </div>
                  }
                />
              </div>
            ))}
          </Card>
          <Card className="p-4 gap-4">
            <div>
              <h2 className="text-xl font-extrabold mb-2">
                Imagen del producto
              </h2>
              <Divider />
            </div>
            <div className="flex">
              {imagePreview ? (
                <div className="relative">
                  <Image
                    src={imagePreview}
                    alt="Imagen del producto"
                    className="object-cover rounded-xl border-light border"
                    width={260}
                    height={300}
                  />
                  <div className="absolute -top-2 -right-2 rounded-full bg-white ">
                    <Tooltip
                      content="Eliminar"
                      color="danger"
                      placement="bottom"
                    >
                      <button
                        onClick={handleDeleteImage}
                        className=" btn btn-icon btn-danger rounded-full"
                      >
                        <i className="i-mdi-close" />
                      </button>
                    </Tooltip>
                  </div>
                </div>
              ) : (
                <label
                  htmlFor="image-upload"
                  className="h-[260px] w-full flex flex-col items-center justify-center aspect-square rounded-lg border-1.5 border-dashed border-neutral-300 cursor-pointer hover:bg-muted/50 transition-colors"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center">
                    <i className="i-mdi-cloud-upload-outline text-neutral-400  text-6xl mb-2" />
                    <p className="text-sm text-muted-foreground">
                      <span className="font-semibold">Click para subir</span> la
                      imagen
                    </p>
                    <p className="text-xs text-muted-foreground">
                      PNG o JPG (Max. 5MB)
                    </p>
                  </div>
                  <input
                    id="image-upload"
                    type="file"
                    className="hidden"
                    accept="image/png, image/jpeg"
                    onChange={handleUploadImage}
                  />
                </label>
              )}
            </div>
          </Card>
        </div>
      </div>
      <div className="flex justify-end">

      <button className="btn btn-primary w-full lg:w-[292px]" type="submit">
        Guardar producto
      </button>
      </div>
    </form>
  );
};

export default ProductForm;
