"use client";

import { getOrders } from "@/backend/queries/admin/get-orders";
import { getPayments } from "@/backend/queries/admin/get-payments";
import { useAdminFilterModal } from "@/filters/use-admin-filter-modal";
import { useInfiniteQuery } from "@tanstack/react-query";

export const usePaymentsQuery = () => {
  const { paymentsData } = useAdminFilterModal();

  const fetchPayments = async ({
    pageParam = undefined,
  }: {
    pageParam?: string;
  }) => {
    const payments = await getPayments({
      pageParam,
      paymentsData,
    });

    return payments;
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
    queryKey: ["payments", paymentsData],
    queryFn: fetchPayments,
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
