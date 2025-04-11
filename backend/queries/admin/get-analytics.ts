import { currentUser } from "@/lib/auth";
import db from "@/lib/db";
import { groupByYearAndMonth } from "@/lib/group-by-year-month";

export const getAnalytics = async () => {
  const user = await currentUser();

  if (user?.role !== "ADMIN") {
    throw new Error("Unauthorized");
  }

  const orders = await db.order.findMany({
    select: {
      createdAt: true,
    },
  });

  const subscribers = await db.subscription.findMany({
    include: {
      user: {
        include: {
          orders: true,
        },
      },
    },
  });

  const groupedOrders = groupByYearAndMonth(orders);
  const groupedSubscribers = groupByYearAndMonth(subscribers);

  return {
    orders,
    subscribers,
    groupedOrders,
    groupedSubscribers,
    usersWithOrders: subscribers
      .filter((sub) => !!sub.user.orders.length)
      .map((sub) => sub.user),
  };
};
