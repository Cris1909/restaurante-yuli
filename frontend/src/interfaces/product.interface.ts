import { Recargo } from "./recargos.interface";

export interface Product {
  cod_prod: string;
  nom_prod: string;
  img_prod: string;
  dprod: string;
  precio_base: number;
  recargos: Recargo[];
}

export interface ProductOrdered {
  cod_prod: string;
  nom_prod: string;
  img_prod: string;
  precio_base: number;
  quantity: number;
  recargos: Recargo[];
}