import { Cargos } from "@/enum/cargos.enum";

export const MENU_ITEMS = [
  {
    icon: "i-mdi-view-dashboard",
    name: "Dashboard",
    href: "/plataforma",
    roles: [Cargos.ADMIN],
  },
  {
    icon: "i-mdi-users-group",
    name: "Usuarios",
    href: "/plataforma/usuarios",
    roles: [Cargos.ADMIN],
  },
  {
    icon: "i-ep-dish",
    name: "Productos",
    href: "/plataforma/productos",
    roles: [Cargos.ADMIN],
  },
  {
    icon: "i-mdi-file-document-plus-outline",
    name: "Tomar pedido",
    href: "/plataforma/tomar-pedido",
    roles: [Cargos.ADMIN, Cargos.MESERA],
  },
  {
    icon: "i-mdi-file-chart-outline",
    name: "Reportes",
    href: "/plataforma/reportes",
    roles: [Cargos.ADMIN],
  },
  {
    icon: "i-mdi-oven",
    name: "Cocina",
    href: "/plataforma/cocina",
    roles: [Cargos.ADMIN, Cargos.COCINERA_JEFE, Cargos.COCINERA],
  },
  {
    icon: "i-mdi-clipboard-text-clock-outline",
    name: "Pedidos",
    href: "/plataforma/pedidos",
    roles: [Cargos.ADMIN],
  },
  {
    icon: "i-mdi-cash-register",
    name: "Caja",
    href: "/plataforma/caja",
    roles: [Cargos.ADMIN],
  },
];
