"use client";

import React, { useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarMenuItem,
  NavbarMenu,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  Divider,
} from "@nextui-org/react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Cargos } from "@/enum/cargos.enum";

interface Props {}
 
const MENU_ITEMS = [
  {
    icon: "i-mdi-view-dashboard",
    name: "Dashboard",
    href: "/plataforma/dashboard",
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

export const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const pathname = usePathname();

  return (
    <Navbar
      className="transition-all fixed md:-translate-y-16"
      isBordered
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent justify="start">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        />
        <Image
          width={48}
          height={48}
          src="/images/yuli-logo.png"
          alt="Logo Yuli"
        />
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link href="#">Login</Link>
        </NavbarItem>
        <NavbarItem>
          <Button
            type="submit"
            onClick={() => signOut()}
            className={"bg-dark text-white logout-button"}
          >
            Cerrar sesión
          </Button>
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        {MENU_ITEMS.map(({ href, icon, name }, index) => (
          <NavbarMenuItem key={href}>
            <Link className="w-full text-dark" href={href} size="lg">
              <i className={icon} />
              <span className="ml-2">{name}</span>
            </Link>
          </NavbarMenuItem>
        ))}
        <Divider />
        <NavbarMenuItem>
          <Link className="w-full" href="/" size="lg" color="danger">
            <i className="i-mdi-logout" />
            <span className="ml-2">Cerrar sesión</span>
          </Link>
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
};
