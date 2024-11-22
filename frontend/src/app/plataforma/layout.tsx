import { Sidebar } from "@/components";

import "../../css/platform/main.css";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { NavBar } from "@/components";

export default async function PlatformLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) {
    redirect("/");
  }

  return (
    <div className="relative">
      <Sidebar user={session.user} />
      <NavBar />
      <main>{children}</main>
    </div>
  );
}
