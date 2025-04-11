import db from "@/lib/db";

export const getCompaniesByCategory = async (category: string) => {
  return await db.company.findMany({
    where: {
      category,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};
