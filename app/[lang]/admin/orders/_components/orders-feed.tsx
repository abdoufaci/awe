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

interface Props {
  dict: any;
}

function OrdersFeed({ dict }: Props) {
  const {
    data: orders,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useOrdersQuery();

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
          <TableHead>ID</TableHead>
          <TableHead>{dict.orders.name}</TableHead>
          <TableHead>{dict.orders.country}</TableHead>
          <TableHead>{dict.orders.date}</TableHead>
          <TableHead>{dict.orders.products}</TableHead>
          <TableHead>{dict.orders.price}</TableHead>
          <TableHead>{dict.orders.status}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders?.pages?.map((page) =>
          page?.orders.map((order) => (
            <TableRow
              onClick={() => onOpen("editOrder", { order, dict })}
              key={order.id}
              className="cursor-pointer text-[#929AA8]">
              <TableCell>{order.orderId}</TableCell>
              <TableCell>{order.user.name}</TableCell>
              <TableCell>{order.country}</TableCell>
              <TableCell>{format(order.createdAt, "MM/dd/yyyy")}</TableCell>
              <TableCell>{order.products.length}</TableCell>
              <TableCell>
                {order.status === "REQUESTED"
                  ? "/"
                  : order.products.reduce(
                      (acc, product) => acc + parseInt(product?.price || "0"),
                      0
                    )}
              </TableCell>
              <TableCell>
                <Button
                  //@ts-ignore
                  variant={order.status}
                  className="p-1 px-2 text-xs">
                  {dict.orders[order.status]}
                </Button>
              </TableCell>
            </TableRow>
          ))
        )}
        {isFetchingNextPage && <OrdersFeed.Skeleton />}
      </TableBody>
      {isLoading && (
        <TableBody>
          <OrdersFeed.Skeleton />
          <OrdersFeed.Skeleton />
          <OrdersFeed.Skeleton />
          <OrdersFeed.Skeleton />
          <OrdersFeed.Skeleton />
          <OrdersFeed.Skeleton />
          <OrdersFeed.Skeleton />
        </TableBody>
      )}
    </Table>
  );
}

export default OrdersFeed;

OrdersFeed.Skeleton = function SkeletonOrdersFeed() {
  return (
    <TableRow className="text-[#757575]">
      <TableCell className="text-black font-semibold flex items-center space-x-2">
        <Skeleton className="h-10 w-10 rounded-full" />
        <Skeleton className="w-20 h-5" />
      </TableCell>
      <TableCell className="font-medium text-center">
        <Skeleton className="w-16 h-5" />
      </TableCell>
      <TableCell>
        <Skeleton className="w-16 h-5" />
      </TableCell>
      <TableCell>
        <Skeleton className="w-16 h-5" />
      </TableCell>
      <TableCell className="text-right">
        <Skeleton className="w-16 h-5" />
      </TableCell>
      <TableCell className="text-right">
        <Skeleton className="w-16 h-5" />
      </TableCell>
      <TableCell className="text-right flex justify-end items-start gap-5 transform translate-y-[-25%]">
        <Skeleton className="w-20 h-5" />
      </TableCell>
    </TableRow>
  );
};
