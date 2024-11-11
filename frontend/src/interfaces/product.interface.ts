export interface Product {
  cod_prod: string;
  nom_prod: string;
  img_prod: string;
  dprod: string;
  precio_base: number;
}

export interface ProductOrdered {
  cod_prod: string;
  nom_prod: string;
  img_prod: string;
  precio_base: number;
  quantity: number;
}