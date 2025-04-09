"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useModal } from "@/hooks/useModalStore";
import { UserWithOrders } from "@/types/types";
import { User } from "@prisma/client";
import { format } from "date-fns";

interface Props {
  users: UserWithOrders[];
  dict: any;
}

function ClientsTable({ users, dict }: Props) {
  const { onOpen } = useModal();

  return (
    <Table>
      <TableHeader className="sticky top-0 z-50 bg-white">
        <TableRow className="text-[#576070]">
          <TableHead>{dict.orders.name}</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>{dict.company.phone}</TableHead>
          <TableHead>{dict.users.joinDate}</TableHead>
          <TableHead>{dict.orders.country}</TableHead>
          <TableHead>{dict.users.subscription}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow
            onClick={() => onOpen("clientDetails", { client: user, dict })}
            key={user.id}
            className="cursor-pointer text-[#929AA8]">
            <TableCell className="flex items-center gap-2">
              <Avatar className="w-14 h-14">
                <AvatarImage src={user?.image || ""} />
                <AvatarFallback className="bg-brand/10 cursor-pointer">
                  {user?.name?.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-xs text-[#929AA8]">5564051</h3>
                <h1 className="text-[#576070] font-medium ">{user.name}</h1>
              </div>
            </TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user?.phone ? user.phone : "-"}</TableCell>
            <TableCell>
              {format(user?.createdAt || new Date(), "dd/MM/yyyy")}
            </TableCell>
            <TableCell>{user?.country ? user.country : "-"}</TableCell>
            <TableCell>
              {!!user?.subscription
                ? format(
                    user?.subscription?.startDate || new Date(),
                    "dd/MM/yyyy"
                  )
                : "-"}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default ClientsTable;
