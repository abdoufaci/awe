"use server";

import { CreateQuoteformSchema } from "@/components/forms/create-quote-form";
import { currentUser } from "@/lib/auth";
import db from "@/lib/db";
import { sendQuoteConfirmedEmail } from "@/lib/mail";
import { z } from "zod";

export const confirmOrder = async ({
  data,
  orderId,
}: {
  orderId: string;
  data: z.infer<typeof CreateQuoteformSchema>;
}) => {
  const user = await currentUser();

  const order = await db.order.update({
    where: {
      id: orderId,
    },
    data: {
      shippingFee: data.shippingFee,
      status: "CONFIRMED",
      products: {
        updateMany: data.products.map((product) => ({
          where: {
            id: product.id,
          },
          data: {
            price: product.price,
          },
        })),
      },
      orderHistory: {
        create: {
          status: "CONFIRMED",
        },
      },
    },
    include: {
      products: true,
      user: true,
    },
  });

  await sendQuoteConfirmedEmail({
    deliveryFee: Number(data.shippingFee),
    products: order.products,
    username: order.user?.name!,
    email: order.user?.email || "",
  });
};
