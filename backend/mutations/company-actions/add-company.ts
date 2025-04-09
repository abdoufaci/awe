"use server";

import { AddCompanyformSchema } from "@/components/forms/add-company-form";
import { currentUser } from "@/lib/auth";
import db from "@/lib/db";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const addCompany = async (
  data: z.infer<typeof AddCompanyformSchema>
) => {
  //   const user = await currentUser();

  //   if(!user || user.role != "ADMIN") {
  //     throw new Error("Unauthorized");
  //   }

  await db.company.create({
    data: {
      ...data,
    },
  });

  revalidatePath("/");
};
