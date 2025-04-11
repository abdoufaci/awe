"use client";

import { ChartContainer } from "@/components/ui/chart";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  type ChartConfig,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { GroupedChartData } from "@/lib/group-by-year-month";

interface Props {
  orders: GroupedChartData[];
  subscribers: GroupedChartData[];
  dict: any;
}

export default function AnalyticsChart({ orders, subscribers, dict }: Props) {
  const [year, setYear] = useState(() => new Date().getFullYear());
  const [chartName, setChartName] = useState("orders");
  const charts = [
    {
      label: dict.analytic.orders as string,
      name: "orders",
      chart: orders,
    },
    {
      label: dict.analytic.subscribers as string,
      name: "subscribers",
      chart: subscribers,
    },
  ];

  return (
    <>
      <div className="max-[460px]:flex-col-reverse flex items-center justify-between border-b px-4 pt-2">
        <div className="max-[460px]:self-start flex gap-8">
          {charts.map(({ label, name }) => (
            <button
              key={name}
              className={`relative text-sm py-4 ${
                chartName === name
                  ? "text-[#232323] font-medium"
                  : "text-[#A7ABAF]"
              }`}
              onClick={() => {
                setChartName(name);
              }}>
              {label}
              {chartName === name && (
                <div className="absolute bottom-[-2px] w-full h-[3px] bg-[#0582FE] rounded-full" />
              )}
            </button>
          ))}
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger className="max-[460px]:self-end flex items-center justify-between min-w-[80px] rounded-lg border shadow-sm text-xs p-2 focus:outline-none">
            {year}
            <ChevronDown className="size-4 text-[#A7ABAF]" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[80px]">
            {charts
              .find((chart) => chart.name === chartName)
              ?.chart.map((item: any) => item.year)
              .map((value: any) => (
                <DropdownMenuItem
                  key={value}
                  onClick={() => {
                    setYear(value);
                  }}
                  className={`hover:cursor-pointer text-xs ${
                    year === value && "bg-muted"
                  }`}>
                  {value}
                </DropdownMenuItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <ChartContainer
        config={
          {
            count: {
              label: charts.find((chart) => chart.name === chartName)?.label,
            },
          } as ChartConfig
        }
        className="min-h-[200px] w-full p-4 pt-8 pl-0">
        <AreaChart
          accessibilityLayer
          data={
            //@ts-ignore
            charts
              .find((chart) => chart.name === chartName)
              ?.chart.find((chart: any) => chart.year === year).data
          }>
          <defs>
            <linearGradient id="charts" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#0582FE" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#0582FE" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <YAxis tickLine={false} tickMargin={10} axisLine={false} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          <Area
            dataKey="count"
            stroke="#0582FE"
            fillOpacity={1}
            fill="url(#charts)"
          />
        </AreaChart>
      </ChartContainer>
    </>
  );
}
