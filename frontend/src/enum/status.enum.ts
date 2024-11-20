export enum Status {
  ELIMINADO = 0,
  ACTIVO = 1,
  DESACTIVADO = 2,
  PENDIENTE = 3,
  ENTREGADO = 4,
}

export const StatusLabels = {
  [Status.ELIMINADO]: "Eliminado",
  [Status.ACTIVO]: "Activo",
  [Status.DESACTIVADO]: "Desactivado",
  [Status.PENDIENTE]: "Pendiente",
  [Status.ENTREGADO]: "Entregado",
};
