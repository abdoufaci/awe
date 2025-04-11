"use server";

import { ModalPaymentsData } from "@/filters/use-admin-filter-modal";
import db from "@/lib/db";
import { OrderWithProducts, PaymentWithUser } from "@/types/types";

interface Props {
  pageParam?: string;
  paymentsData: ModalPaymentsData;
}

const PAYMENTS_BATCH = 10;

export const getPayments = async ({
  pageParam: cursor,
  paymentsData,
}: Props) => {
  let payments: PaymentWithUser[];
  if (cursor) {
    payments = await db.payment.findMany({
      where: {
        OR: [
          {
            User: {
              name: {
                contains: paymentsData.searchTerm,
                mode: "insensitive",
              },
            },
          },
          {
            amount: {
              contains: paymentsData.searchTerm,
              mode: "insensitive",
            },
          },
        ],
      },
      take: PAYMENTS_BATCH,
      skip: 1,
      cursor: {
        id: cursor,
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        User: true,
      },
    });
  } else {
    payments = await db.payment.findMany({
      where: {
        OR: [
          {
            User: {
              name: {
                contains: paymentsData.searchTerm,
                mode: "insensitive",
              },
            },
          },
          {
            amount: {
              contains: paymentsData.searchTerm,
              mode: "insensitive",
            },
          },
        ],
      },
      take: PAYMENTS_BATCH,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        User: true,
      },
    });
  }
  let nextCursor = null;
  if (payments.length === PAYMENTS_BATCH) {
    nextCursor = payments[payments.length - 1].id;
  }

  return {
    payments,
    nextCursor,
  };
};
