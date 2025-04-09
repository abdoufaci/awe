"use server";

import { currentUser } from "@/lib/auth";
import baseUrl from "@/lib/base-url";
import stripe from "@/lib/stripe";

export const paySubscription = async () => {
  try {
    const user = await currentUser();

    if (!user) return;

    const priceId = process.env.STRIPE_SUBSCRIPTION_PRICE_ID;

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${baseUrl}/dashboard/orders`,
      cancel_url: `${baseUrl}/error`,
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
