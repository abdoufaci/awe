"use server";

import db from "@/lib/db";
import { sendOrderUpdatedEmail } from "@/lib/mail";

export const acceptBankAccount = async (orderId: string) => {
  const order = await db.order.update({
    where: {
      id: orderId,
    },
    data: {
      status: "SHIPPING",
      orderHistory: {
        create: {
          status: "SHIPPING",
        },
      },
    },
    include: {
      user: true,
      products: true,
    },
  });

  await sendOrderUpdatedEmail({
    email: order.user.email,
    orderId: order.orderId,
    products: order.products,
    status: "SHIPPING",
  });
};
