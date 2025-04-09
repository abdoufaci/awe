"use server";

import { currentUser } from "@/lib/auth";
import db from "@/lib/db";
import { ActivateSchema } from "@/schemas";
import { z } from "zod";

export const activateAccount = async (
  data: z.infer<typeof ActivateSchema>,
  selectedCountry: {
    code: string;
    flag: string;
    name: string;
  }
) => {
  const user = await currentUser();

  if (!user) return;

  await db.user.update({
    where: {
      id: user?.id,
    },
    data: {
      phone: `${selectedCountry.code}${data.phone}`,
      country: selectedCountry.name,
    },
  });
};
