"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { useInView } from "react-intersection-observer";
import { useOrdersByUserQuery } from "@/hooks/use-query-orders-by-user";
import OrderCard from "./order-card";

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
    refetch,
  } = useOrdersByUserQuery();

  const [Buttonref, ButtonInView] = useInView();

  useEffect(() => {
    if (ButtonInView) {
      fetchNextPage();
    }
  }, [ButtonInView]);

  return (
    <div className="flex flex-col space-y-3 w-full max-w-[1700px] mx-auto">
      {isLoading ? (
        <div className="flex flex-col items-center gap-5 ">
          <OrdersFeed.Skelton />
          <OrdersFeed.Skelton />
          <OrdersFeed.Skelton />
          <OrdersFeed.Skelton />
        </div>
      ) : (
        <div className="flex flex-col items-center gap-5 place-items-center">
          {orders?.pages.map((page) =>
            page?.orders.map((order) => (
              <OrderCard key={order.id} order={order} dict={dict} />
            ))
          )}
        </div>
      )}
      {hasNextPage && (
        <div className="flex justify-center w-full">
          {isFetchingNextPage ? (
            <div className="flex flex-col items-center gap-5 w-full ">
              <OrdersFeed.Skelton />
              <OrdersFeed.Skelton />
              <OrdersFeed.Skelton />
              <OrdersFeed.Skelton />
            </div>
          ) : (
            <Button
              ref={Buttonref}
              disabled={isFetchingNextPage}
              onClick={() => fetchNextPage()}>
              {dict.orders.showMore}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

OrdersFeed.Skelton = function SkeltonTravel() {
  return <Skeleton className="h-[285px] w-full rounded-xl" />;
};

export default OrdersFeed;
