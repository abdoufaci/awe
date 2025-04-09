"use server";

import { UploadDocumentformSchema } from "@/components/forms/upload-document-form";
import db from "@/lib/db";
import { sendOrderUpdatedEmail } from "@/lib/mail";
import { z } from "zod";

export const uploadBankDocument = async (
  data: z.infer<typeof UploadDocumentformSchema>,
  orderId: string
) => {
  const order = await db.order.update({
    where: {
      id: orderId,
    },
    data: {
      bankDocument: data.document,
      status: "DOCCONFIRMATION",
      orderHistory: {
        create: {
          status: "DOCCONFIRMATION",
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
    status: "document confirmation",
  });
};
