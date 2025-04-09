"use client";

import { getOrders } from "@/backend/queries/admin/get-orders";
import { useAdminFilterModal } from "@/filters/use-admin-filter-modal";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useOrdersQuery = () => {
  const { ordersData } = useAdminFilterModal();

  const fetchOrders = async ({
    pageParam = undefined,
  }: {
    pageParam?: string;
  }) => {
    const orders = await getOrders({
      pageParam,
      ordersData,
    });

    return orders;
  };

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isLoadingError,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["orders", ordersData],
    queryFn: fetchOrders,
    getNextPageParam: (lastPage) => lastPage?.nextCursor,
    initialPageParam: undefined,
    refetchInterval: false,
  });

  return {
    fetchNextPage,
    data,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isLoadingError,
    refetch,
  };
};
