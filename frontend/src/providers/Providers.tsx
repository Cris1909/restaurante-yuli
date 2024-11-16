"use client";

import { useHydration } from "@/hooks";
import { useSidebarStore } from "@/store";
import { NextUIProvider } from "@nextui-org/react";
import clsx from "clsx";

interface Props {
  children: React.ReactNode;
}

export const Providers: React.FC<Props> = ({ children }) => {
  useHydration(useSidebarStore);
  const { sidebarExpanded } = useSidebarStore();

  return (
    <div
      className={clsx("provider-container", {
        "sb-expanded": sidebarExpanded,
      })}
    >
      <NextUIProvider>{children}</NextUIProvider>
    </div>
  );
};
