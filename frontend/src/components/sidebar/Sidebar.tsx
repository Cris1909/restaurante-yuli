"use client";

import { useHydration } from "@/hooks";
import { useSidebarStore } from "@/store";
import Image from "next/image";
import Link from "next/link";

const MENU_ITEMS = [
  {
    icon: "i-mdi-view-dashboard",
    name: "Dashboard",
    href: "/plataforma",
  },
  {
    icon: "i-mdi-users-group",
    name: "Usuarios",
    href: "/plataforma/usuarios",
  },
  {
    icon: "i-mdi-file-chart-outline",
    name: "Productos",
    href: "/plataforma/productos",
  },
  {
    icon: "i-mdi-file-document-plus-outline",
    name: "Tomar pedido",
    href: "/plataforma/tomar-pedido",
  },
  {
    icon: "i-mdi-file-chart-outline",
    name: "Reportes",
    href: "/plataforma/reportes",
  },
  {
    icon: "i-mdi-oven",
    name: "Cocina",
    href: "/plataforma/cocina",
  },
  {
    icon: "i-mdi-clipboard-text-clock-outline",
    name: "Pedidos",
    href: "/plataforma/pedidos",
  },
  {
    icon: "i-mdi-cash-register",
    name: "Facturación",
    href: "/plataforma/facturacion",
  },
];

export const Sidebar = () => {
  useHydration(useSidebarStore);
  const { toggleSidebar } = useSidebarStore();

  return (
    <nav className="sidebar">
      <div className="top-menu">
        <button>
          <i className="settings-button i-mdi-settings"></i>
        </button>
        <button onClick={toggleSidebar}>
          <i className="i-mdi-hamburger-menu"></i>
        </button>
      </div>
      <div className="info-menu">
        <Image
          width={100}
          height={100}
          src="/images/yuli-logo.png"
          alt="Logo Yuli"
        />
        <h4 className="subtitle">Luis Barrera</h4>
        <p className="paragraph">Administrador</p>
      </div>

      <ul className="sidebar-menu">
        {MENU_ITEMS.map((item) => (
          <li key={item.name}>
            <Link href={item.href}>
              <i className={item.icon}></i>
              <span>{item.name}</span>
            </Link>
          </li>
        ))}
      </ul>

      <button className="btn btn-black logout-button">
        <i className="i-mdi-logout logout-icon"></i>
        <span>Cerrar sesión</span>
      </button>
    </nav>
  );
};
