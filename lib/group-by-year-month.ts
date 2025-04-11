import { months } from "@/constants/months";

export type GroupedChartData = {
  year: number;
  data: { month: string; count: number }[];
};

export function groupByYearAndMonth(
  items: { createdAt: Date }[]
): GroupedChartData[] {
  return items.reduce((acc: GroupedChartData[], item) => {
    const createdAt = new Date(item.createdAt);
    const year = createdAt.getFullYear();
    const month = createdAt.getMonth();

    let yearGroup = acc.find((group) => group.year === year);

    if (!yearGroup) {
      yearGroup = {
        year,
        data: months.map((name) => ({ month: name, count: 0 })),
      };
      acc.push(yearGroup);
    }

    yearGroup.data[month].count += 1;

    return acc;
  }, []);
}
