import { Cargos } from "@/enum/cargos.enum";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function RouterPage() {
  const session = await auth();

  if (!session) {
    redirect("/");
  }

  const { user } = session;

  if ([Cargos.ADMIN, Cargos.SUPER_ADMIN].includes(user.fkcod_car_user)) {
    redirect("/plataforma/dashboard");
  }
  if ([Cargos.COCINERA, Cargos.COCINERA_JEFE].includes(user.fkcod_car_user)) {
    redirect("/plataforma/cocina");
  }
  if([Cargos.MESERA].includes(user.fkcod_car_user)) {
    redirect("/plataforma/mesas");
  }
  return null;
}
