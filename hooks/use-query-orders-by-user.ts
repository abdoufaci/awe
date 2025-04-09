import { getOrders } from "@/backend/queries/admin/get-orders";
import { getOrdersByUser } from "@/backend/queries/client/get-orders-by-user";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useOrdersByUserQuery = () => {
  const fetchOrdersByUser = async ({
    pageParam = undefined,
  }: {
    pageParam?: string;
  }) => {
    const orders = await getOrdersByUser({
      pageParam,
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
    queryKey: ["orders-by-user"],
    queryFn: fetchOrdersByUser,
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
