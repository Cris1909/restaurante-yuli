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
import { MENU_ITEMS } from "@/constants";
import { usePathname } from "next/navigation";

interface Props {}

export const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const pathname = usePathname();

  return (
    <Navbar
      className="transition-all md:-translate-y-16"
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
          <NavbarMenuItem>
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
