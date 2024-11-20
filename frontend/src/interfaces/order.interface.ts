interface Producto {
  cod_prod: number;
  img_prod: string;
  nom_prod: string;
  precio_base: number;
  recargo_clie: number;
  cantidad_platos: number;
}

export interface Orden {
  cod_fac: number;
  monto_total: number;
  fecha_fac: string;
  hora_fac: string;
  obs_fac: string;
  fkcods_fac: number;
  fktc_fac: number;
  dtipo_cliente: string;
  productos: Producto[];
}
