"use client";

import { ClientType, Product, Recargo } from "@/interfaces";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";

interface ProductFormProps {
  product?: Product;
  onSave: (product: Product) => void;
  clientTypes: ClientType[]
}

const ProductForm: React.FC<ProductFormProps> = ({ product, onSave, clientTypes }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<Product>({
    defaultValues: {
      nom_prod: product?.nom_prod || "",
      dprod: product?.dprod || "",
      precio_base: product?.precio_base || 0,
      recargos: product?.recargos || [],
    }
  });

  const [image, setImage] = useState<File | null>(null);
  const [recargos, setRecargos] = useState<Recargo[]>(product?.recargos || []);

  const onSubmit: SubmitHandler<Product> = async (data) => {
    let imageUrl = product?.img_prod as string;
    if (image) {
      // Subir imagen a Cloudinary
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", "your_upload_preset"); // Reemplaza con tu upload preset de Cloudinary

      const response = await fetch("https://api.cloudinary.com/v1_1/your_cloud_name/image/upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      imageUrl = result.secure_url;
    }

    onSave({ ...data, img_prod: imageUrl, recargos });
  };

  const handleAddRecargo = (recargo: Recargo) => {
    setRecargos([...recargos, recargo]);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Nombre:</label>
        <input
          type="text"
          {...register("nom_prod", { required: true })}
        />
        {errors.nom_prod && <span>Este campo es requerido</span>}
      </div>
      <div>
        <label>Descripción:</label>
        <input
          type="text"
          {...register("dprod", { required: true })}
        />
        {errors.dprod && <span>Este campo es requerido</span>}
      </div>
      <div>
        <label>Precio:</label>
        <input
          type="number"
          {...register("precio_base", { required: true, valueAsNumber: true })}
        />
        {errors.precio_base && <span>Este campo es requerido</span>}
      </div>
      <div>
        <label>Imagen:</label>
        <input
          type="file"
          onChange={(e) => setImage(e.target.files?.[0] || null)}
        />
      </div>
      <div>
        <label>Recargos:</label>
        {clientTypes.map((clientType) => (
          <div key={clientType.cod_tc}>
            <label>{clientType.dtipo_cliente}</label>
            <input
              type="number"
              onChange={(e) =>
                handleAddRecargo({
                  cod_rec: new Date().getTime(),
                  fkcod_tc_rec: clientType.cod_tc,
                  recargo_cliente: Number(e.target.value),
                })
              }
            />
          </div>
        ))}
      </div>
      <button type="submit">Guardar</button>
    </form>
  );
};

export default ProductForm;