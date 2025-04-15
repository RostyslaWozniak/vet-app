"use client";

import { Cell, Pie, PieChart, Tooltip } from "recharts";

import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";
import type { $Enums } from "@prisma/client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
type Appointment = {
  vetSchedule: {
    user: {
      name: string;
    };
  };
  status: $Enums.AppointmentStatus;
  id: string;
  service: {
    name: string;
    description: string | null;
    durationInMinutes: number;
  };
  startTime: Date;
};

type AppointmentsByUserChartProps = {
  groupedAppointments: Record<string, Appointment[]>;
};

const charts = [
  { name: "Wszystkie", value: "total" },
  { name: "Zakończone", value: "completed" },
  { name: "Nadchodzące", value: "upcoming" },
  { name: "Anulowane", value: "cancelled" },
] as const;

export function AppointmentsByUserChart({
  groupedAppointments,
}: AppointmentsByUserChartProps) {
  const [activeChart, setActiveChart] =
    useState<(typeof charts)[number]["value"]>("total");

  const data = Object.entries(groupedAppointments).map(
    ([name, appointments]) => ({
      name,
      total: appointments.length,
      completed: appointments.filter((a) => a.status === "COMPLETED").length,
      upcoming: appointments.filter(
        (a) =>
          a.status === "CONFIRMED" ||
          (a.status === "PENDING" && a.startTime > new Date()),
      ).length,
      cancelled: appointments.filter((a) => a.status === "CANCELLED").length,
    }),
  );

  const COLORS = [
    "var(--chart-1)",
    "var(--chart-2)",
    "var(--chart-3)",
    "var(--chart-4)",
    "var(--chart-5)",
  ];

  return (
    <>
      <div className="space-x-2">
        {charts.map(({ name, value }) => (
          <Button
            key={value}
            onClick={() => setActiveChart(value)}
            variant={activeChart === value ? "secondary" : "outline"}
          >
            {name}
          </Button>
        ))}
      </div>
      <ChartContainer config={{}} className="h-[300px] w-full">
        <PieChart>
          <Pie
            isAnimationActive={false}
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={80}
            outerRadius={100}
            paddingAngle={5}
            dataKey={activeChart}
            nameKey="name"
            label={({ name, percent }) =>
              `${name}: ${(percent * 100).toFixed(0)}%`
            }
            labelLine={false}
          >
            {data.map((entry, index) => {
              console.log(entry);
              return (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              );
            })}
          </Pie>
          <Tooltip content={<ChartTooltipContent />} />
        </PieChart>
      </ChartContainer>
    </>
  );
}
