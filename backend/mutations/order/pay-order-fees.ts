"use server";

import baseUrl from "@/lib/base-url";
import stripe from "@/lib/stripe";
import { Product } from "@prisma/client";
import { redirect } from "next/navigation";

export const payOrderFees = async (
  orderId: string,
  price: number,
  products: Product[]
) => {
  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: products.map((product) => product.name).join(","),
            },
            unit_amount: price * 100,
          },
          quantity: 1,
        },
      ],
      success_url: `${baseUrl}/dashboard/orders`,
      cancel_url: `${baseUrl}/error`,
      metadata: {
        orderId,
      },
    });

    if (session.url) {
      return session.url;
    }
  } catch (error) {
    console.log({
      error,
    });
    throw new Error("Payment error");
  }
};
