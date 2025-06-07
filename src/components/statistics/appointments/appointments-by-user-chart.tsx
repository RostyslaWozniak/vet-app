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
  { name: "Dzisiaj", value: "today" },
  { name: "Zakończone", value: "completed" },
  { name: "Potwierdzone", value: "confirmed" },
  { name: "Oczekujące", value: "pending" },
  { name: "Anulowane", value: "cancelled" },
] as const;

const COLORS = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
];

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

      confirmed: appointments.filter((a) => a.status === "CONFIRMED").length,
      pending: appointments.filter((a) => a.status === "PENDING").length,
      cancelled: appointments.filter((a) => a.status === "CANCELLED").length,
      today: appointments.filter((a) => {
        const appointmentDate = new Date(a.startTime);
        const today = new Date();
        return (
          appointmentDate.toDateString() === today.toDateString() &&
          a.status !== "CANCELLED"
        );
      }).length,
    }),
  );

  return (
    <>
      <div className="space-y-2 space-x-2">
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
      {data.every((item) => item[activeChart] === 0) || data.length === 0 ? (
        <div className="flex h-[300px] w-full items-center justify-center">
          <p className="text-muted-foreground text-sm">
            Brak danych do wyświetlenia
          </p>
        </div>
      ) : (
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
                percent === 0 ? "" : `${name}: ${(percent * 100).toFixed(0)}%`
              }
              labelLine={false}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip content={<ChartTooltipContent />} />
          </PieChart>
        </ChartContainer>
      )}
    </>
  );
}
