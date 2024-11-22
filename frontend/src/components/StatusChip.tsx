import { orderStatus } from "@/constants";
import { Chip, cn } from "@nextui-org/react";

interface Props {
  children: React.ReactNode;
  status: number;
}

export const StatusChip: React.FC<Props> = ({ children, status }) => {
  return (
    <Chip className={orderStatus[status].fullColor}>
      <span className="flex items-center gap-0.5">
        <i className={cn("text-small", orderStatus[status].icon)} />
        {children}
      </span>
    </Chip>
  );
};
