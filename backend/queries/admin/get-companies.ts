import db from "@/lib/db";

export const getCompanies = async () => {
  return await db.company.findMany();
};
