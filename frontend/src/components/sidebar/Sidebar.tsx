"use client";

import { Cargos } from "@/enum/cargos.enum";
import { validateCargo } from "@/helpers";
import { useHydration } from "@/hooks";
import { useSidebarStore } from "@/store";
import { Button, Tooltip } from "@nextui-org/react";
import clsx from "clsx";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IUser } from "../../../nextauth";
import { MENU_ITEMS } from "@/constants";

interface Props {
  user: IUser;
}

export const Sidebar: React.FC<Props> = ({ user }) => {
  useHydration(useSidebarStore);
  const { toggleSidebar, sidebarExpanded } = useSidebarStore();

  const pathname = usePathname();

  const { fkcod_car_user, nom_user, dcar } = user;

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
        <h4 className="subtitle">{nom_user}</h4>
        <p className="paragraph">{dcar}</p>
      </div>

      <ul className="sidebar-menu">
        {MENU_ITEMS.filter((item) =>
          validateCargo(fkcod_car_user!, ...item.roles)
        ).map((item) => (
          <Tooltip
            key={item.name}
            content={item.name}
            placement="right"
            hidden={!sidebarExpanded}
          >
            <li
              className={clsx({
                active: pathname.startsWith(item.href),
              })}
            >
              <Link href={item.href}>
                <i className={item.icon}></i>
                <span>{item.name}</span>
              </Link>
            </li>
          </Tooltip>
        ))}
      </ul>
      <Tooltip
        content={"Cerrar sesión"}
        placement="right"
        hidden={!sidebarExpanded}
      >
        <Button
          type="submit"
          onClick={() => signOut()}
          isIconOnly={sidebarExpanded}
          className={"bg-dark text-white logout-button"}
        >
          <i className="i-mdi-logout logout-icon"></i>
          <span>Cerrar sesión</span>
        </Button>
      </Tooltip>
    </nav>
  );
};
