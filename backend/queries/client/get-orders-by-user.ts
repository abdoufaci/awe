"use server";

import { currentUser } from "@/lib/auth";
import db from "@/lib/db";
import { OrderWithProducts } from "@/types/types";

interface Props {
  pageParam?: string;
}

const ORDERS_BATCH = 20;

export const getOrdersByUser = async ({ pageParam: cursor }: Props) => {
  const user = await currentUser();

  let orders: OrderWithProducts[];
  if (cursor) {
    orders = await db.order.findMany({
      where: {
        userId: user?.id,
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
        userId: user?.id,
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
