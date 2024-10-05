"use client";

import { useHydration } from "@/hooks";
import { useSidebarStore } from "@/store";
import clsx from "clsx";

interface Props {
  children: React.ReactNode;
}

export const Providers: React.FC<Props> = ({ children }) => {
  useHydration(useSidebarStore);
  const { sidebarExpanded } = useSidebarStore();

  return (
    // <NextUIProvider>
    //   <NextThemesProvider attribute="class" defaultTheme="dark">
    <div
      className={clsx("provider-container", { "sb-expanded": sidebarExpanded })}
    >
      {children}
    </div>
    //   </NextThemesProvider>
    // </NextUIProvider>
  );
};
