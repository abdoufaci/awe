"use server";

import { ModalOrdersData } from "@/filters/use-admin-filter-modal";
import db from "@/lib/db";
import { OrderWithProducts } from "@/types/types";

interface Props {
  pageParam?: string;
  ordersData: ModalOrdersData;
}

const ORDERS_BATCH = 10;

export const getOrders = async ({ pageParam: cursor, ordersData }: Props) => {
  let orders: OrderWithProducts[];
  if (cursor) {
    orders = await db.order.findMany({
      where: {
        OR: [
          {
            products: {
              some: {
                OR: [
                  {
                    name: {
                      contains: ordersData.searchTerm,
                      mode: "insensitive",
                    },
                  },
                  {
                    company: {
                      name: {
                        contains: ordersData.searchTerm,
                        mode: "insensitive",
                      },
                    },
                  },
                ],
              },
            },
          },
          {
            country: {
              contains: ordersData.searchTerm,
              mode: "insensitive",
            },
          },
          {
            shippingAdress: {
              contains: ordersData.searchTerm,
              mode: "insensitive",
            },
          },
          {
            user: {
              name: {
                contains: ordersData.searchTerm,
                mode: "insensitive",
              },
            },
          },
        ],
      },
      take: ORDERS_BATCH,
      skip: 1,
      cursor: {
        id: cursor,
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        products: {
          include: {
            company: true,
          },
        },
        user: true,
        orderHistory: {
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });
  } else {
    orders = await db.order.findMany({
      where: {
        OR: [
          {
            products: {
              some: {
                OR: [
                  {
                    name: {
                      contains: ordersData.searchTerm,
                      mode: "insensitive",
                    },
                  },
                  {
                    company: {
                      name: {
                        contains: ordersData.searchTerm,
                        mode: "insensitive",
                      },
                    },
                  },
                ],
              },
            },
          },
          {
            country: {
              contains: ordersData.searchTerm,
              mode: "insensitive",
            },
          },
          {
            shippingAdress: {
              contains: ordersData.searchTerm,
              mode: "insensitive",
            },
          },
          {
            user: {
              name: {
                contains: ordersData.searchTerm,
                mode: "insensitive",
              },
            },
          },
        ],
      },
      take: ORDERS_BATCH,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        products: {
          include: {
            company: true,
          },
        },
        user: true,
        orderHistory: {
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });
  }
  let nextCursor = null;
  if (orders.length === ORDERS_BATCH) {
    nextCursor = orders[orders.length - 1].id;
  }

  return {
    orders,
    nextCursor,
  };
};
