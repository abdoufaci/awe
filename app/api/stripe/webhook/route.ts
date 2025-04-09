import db from "@/lib/db";
import { sendFeesPayedEmail } from "@/lib/mail";
import stripe from "@/lib/stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: Request) {
  try {
    const body = await req.text();
    const headersList = await headers();
    const signature = headersList.get("stripe-signature");

    if (!signature) {
      return new NextResponse("No signature found", { status: 400 });
    }

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
      //@ts-ignore
      console.log(`❌ Error message: ${err.message}`);
      //@ts-ignore
      res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    if (event.type === "customer.subscription.created") {
      return new NextResponse(null, { status: 200 });
    }

    if (event.type === "checkout.session.completed") {
      if (event.data.object.mode === "payment") {
        const orderId = event.data.object.metadata?.orderId;

        const customerDetails = event.data.object.customer_details;
        if (customerDetails?.email) {
          const user = await db.user.findUnique({
            where: { email: customerDetails.email },
          });
          if (!user) throw new Error("User not found");

          await sendFeesPayedEmail({
            username: user.name || "",
            email: customerDetails.email,
          });
        }

        await db.order.update({
          where: {
            id: orderId,
          },
          data: {
            status: "PAIED",
            orderHistory: {
              create: {
                status: "PAIED",
              },
            },
          },
        });
      }

      if (event.data.object.mode === "subscription") {
        const customerId = event.data.object.customer as string;
        const customerDetails = event.data.object.customer_details;
        if (customerDetails?.email) {
          const user = await db.user.findUnique({
            where: { email: customerDetails.email },
          });
          if (!user) throw new Error("User not found");

          let endDate = new Date();
          endDate.setMonth(endDate.getMonth() + 1);

          if (!user.customerId) {
            await db.user.update({
              where: {
                id: user.id,
              },
              data: {
                customerId,
              },
            });
          }
          await db.subscription.upsert({
            where: { userId: user.id! },
            create: {
              userId: user.id,
              startDate: new Date(),
              endDate: endDate,
            },
            update: {
              startDate: new Date(),
              endDate: endDate,
            },
          });
        }
      }

      return new NextResponse(null, { status: 200 });
    }

    return new NextResponse(null, { status: 400 });
  } catch (error) {
    console.log({
      error,
    });

    return new NextResponse(`error is post ${error}`, { status: 500 });
  }
}
