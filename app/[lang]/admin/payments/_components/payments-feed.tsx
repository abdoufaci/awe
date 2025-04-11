"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Edit, Trash } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useOrdersQuery } from "@/hooks/use-query-orders";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { useInView } from "react-intersection-observer";
import { useModal } from "@/hooks/useModalStore";
import { usePaymentsQuery } from "@/hooks/use-query-payments";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Props {
  dict: any;
}

function PaymentsFeed({ dict }: Props) {
  const {
    data: payments,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = usePaymentsQuery();

  const { onOpen } = useModal();

  const [isMounted, setIsMounted] = useState(false);

  const [Buttonref, ButtonInView] = useInView();

  useEffect(() => {
    if (ButtonInView) {
      fetchNextPage();
    }
  }, [ButtonInView]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Table>
      <TableCaption>
        {hasNextPage ? (
          <Button
            ref={Buttonref}
            disabled={isFetchingNextPage}
            onClick={() => fetchNextPage()}>
            {dict.orders.showMore}
          </Button>
        ) : (
          <h1>{dict.orders.youHaveReachedTheEnd}</h1>
        )}
      </TableCaption>

      <TableHeader className="sticky top-0 z-50 bg-white">
        <TableRow className="text-[#576070]">
          <TableHead>{dict.payments.paymentId}</TableHead>
          <TableHead>{dict.orders.name}</TableHead>
          <TableHead>{dict.orders.price}</TableHead>
          <TableHead>{dict.payments.DateTime}</TableHead>
          <TableHead>Type</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {payments?.pages?.map((page) =>
          page?.payments.map((payment) => (
            <TableRow
              key={payment.id}
              className="cursor-pointer text-[#929AA8]">
              <TableCell>{payment.paymentId}</TableCell>
              <TableCell className="flex items-center gap-2">
                <Avatar className="w-14 h-14">
                  <AvatarImage src={payment.User?.image || ""} />
                  <AvatarFallback className="bg-brand/10 cursor-pointer">
                    {payment.User?.name?.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-xs text-[#929AA8]">5564051</h3>
                  <h1 className="text-[#576070] font-medium ">
                    {payment.User.name}
                  </h1>
                </div>
              </TableCell>
              <TableCell>{payment.amount} €</TableCell>
              <TableCell>
                {format(payment.createdAt, "dd/MM/yyyy HH:mm'GMT' X")}
              </TableCell>
              <TableCell>{dict.payments[payment.type]}</TableCell>
            </TableRow>
          ))
        )}
        {isFetchingNextPage && <PaymentsFeed.Skeleton />}
      </TableBody>
      {isLoading && (
        <TableBody>
          <PaymentsFeed.Skeleton />
          <PaymentsFeed.Skeleton />
          <PaymentsFeed.Skeleton />
          <PaymentsFeed.Skeleton />
          <PaymentsFeed.Skeleton />
          <PaymentsFeed.Skeleton />
          <PaymentsFeed.Skeleton />
        </TableBody>
      )}
    </Table>
  );
}

export default PaymentsFeed;

PaymentsFeed.Skeleton = function PaymentsFeed() {
  return (
    <TableRow className="text-[#757575]">
      <TableCell className="font-medium text-center">
        <Skeleton className="w-16 h-5" />
      </TableCell>
      <TableCell className="text-black font-semibold flex items-center space-x-2">
        <Skeleton className="h-10 w-10 rounded-full" />
        <Skeleton className="w-20 h-5" />
      </TableCell>
      <TableCell>
        <Skeleton className="w-16 h-5" />
      </TableCell>
      <TableCell>
        <Skeleton className="w-16 h-5" />
      </TableCell>
      <TableCell>
        <Skeleton className="w-16 h-5" />
      </TableCell>
    </TableRow>
  );
};
