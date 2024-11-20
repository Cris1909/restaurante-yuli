import { Sidebar } from "@/components";

import "../../css/platform/main.css";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

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
    <>
      <Sidebar user={session.user} />
      <main>{children}</main>
    </>
  );
}
