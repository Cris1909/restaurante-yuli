export enum Status {
  ELIMINADO = 0,
  ACTIVO = 1,
  DESACTIVADO = 2,
}

export const StatusLabels = {
  [Status.ELIMINADO]: "Eliminado",
  [Status.ACTIVO]: "Activo",
  [Status.DESACTIVADO]: "Desactivado",
};
