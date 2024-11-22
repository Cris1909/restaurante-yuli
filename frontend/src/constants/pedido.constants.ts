import { Status } from "@/enum";

export const orderStatus: Record<
  number,
  {
    fullColor: string;
    dark: string;
    light: string;
    icon: string;
  }
> = {
  [Status.PENDIENTE]: {
    fullColor: "bg-warning-light text-warning-dark",
    dark: "text-warning-dark",
    light: "bg-warning-light",
    icon: "i-mdi-clock-outline",
  },
  [Status.ENTREGADO]: {
    fullColor: "bg-info-light text-info-dark",
    dark: "text-info-dark",
    light: "bg-info-light",
    icon: "i-ep-dish",
  },
  [Status.PAGADO]: {
    fullColor: "bg-success-light text-success-dark",
    dark: "text-success-dark",
    light: "bg-success-light",
    icon: "i-mdi-check-circle-outline",
  },
  [Status.CANCELADO]: {
    fullColor: "bg-danger-light text-danger-dark",
    dark: "text-danger-dark",
    light: "bg-danger-light",
    icon: "i-mdi-cancel-circle-outline",
  },
};
