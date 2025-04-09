"use server";

import { AddToCartformSchema } from "@/components/forms/add-to-cart-form";
import { currentUser } from "@/lib/auth";
import db from "@/lib/db";
import { z } from "zod";
import ShortUniqueId from "short-unique-id";
import { sendQuoteCreatedEmail } from "@/lib/mail";

export const addOrder = async (data: z.infer<typeof AddToCartformSchema>) => {
  const user = await currentUser();

  const uid = new ShortUniqueId({ length: 10 });

  const orderId = uid.rnd();

  await db.order.create({
    data: {
      orderId,
      shippingAdress: data.address,
      userId: user?.id || "",
      shippingFee: "",
      products: {
        createMany: {
          data: data.products.map((product) => ({
            name: product.productName,
            quantity: product.quantity,
            companyId: product.companyName,
          })),
        },
      },
      orderHistory: {
        create: {
          status: "REQUESTED",
        },
      },
    },
  });

  await sendQuoteCreatedEmail({
    products: data.products,
    username: user?.name || "",
    adress: data.address,
    country: user?.country || "",
    email: user?.email || "",
  });
};
