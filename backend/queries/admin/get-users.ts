import db from "@/lib/db";

export const getUsers = async (isClient: boolean) => {
  return await db.user.findMany({
    where: {
      role: isClient
        ? "USER"
        : {
            not: "USER",
          },
    },
    include: {
      orders: {
        include: {
          products: {
            include: {
              company: true,
            },
          },
        },
      },
      subscription: true,
    },
  });
};
