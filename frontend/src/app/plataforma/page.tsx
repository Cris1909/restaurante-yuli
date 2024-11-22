import { MENU_ITEMS } from "@/constants";
import { Card, CardBody, cn, Divider } from "@nextui-org/react";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="main-container">
      <h1 className="title">Bienvenido a Restaurante Yuli</h1>
      <Divider className="my-4" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {MENU_ITEMS.map(({ href, icon, name }) => (
          <Card key={href} as={Link} href={href} className="bg-dark text-white">
            <CardBody className="text-center">
              <div>
                <i className={cn(icon, "text-6xl")} />
              </div>
              <h3 className="text-lg">{name}</h3>
            </CardBody>
          </Card>
        ))}
      </div>

      <Divider className="my-4" />
    </div>
  );
}
