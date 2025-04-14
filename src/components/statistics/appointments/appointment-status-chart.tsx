"use client";

import { Bar, BarChart, CartesianGrid, Cell, XAxis, YAxis } from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import type { $Enums } from "@prisma/client";
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

type AppointmentStatusChartProps = {
  appointments: Appointment[];
};

export function AppointmentStatusChart({
  appointments,
}: AppointmentStatusChartProps) {
  // Count appointments by status
  const statusCounts = {
    COMPLETED: appointments.filter((app) => app.status === "COMPLETED").length,
    PENDING: appointments.filter((app) => app.status === "PENDING").length,
    CONFIRMED: appointments.filter((app) => app.status === "CONFIRMED").length,
    CANCELLED: appointments.filter((app) => app.status === "CANCELLED").length,
  };

  const data = [
    { status: "completed", label: "Zakończone", value: statusCounts.COMPLETED },
    { status: "pending", label: "Oczekuje", value: statusCounts.PENDING },
    {
      status: "confirmed",
      label: "Potwierdzone",
      value: statusCounts.CONFIRMED,
    },
    { status: "cancelled", label: "Anulowane", value: statusCounts.CANCELLED },
  ];

  return (
    <ChartContainer config={{}} className="h-[300px]">
      <BarChart
        accessibilityLayer
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="label" />
        <YAxis tickFormatter={(value) => `${value}`} tickCount={5} />
        <ChartTooltip content={<ChartTooltipContent indicator="dot" />} />
        <Bar dataKey="value" radius={[4, 4, 0, 0]} name="Ilość">
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={
                {
                  completed: "var(--color-emerald-500)",
                  pending: "var(--color-amber-500)",
                  confirmed: "var(--color-cyan-500)",
                  cancelled: "var(--color-red-500)",
                }[entry.status]
              }
            />
          ))}
        </Bar>
      </BarChart>
    </ChartContainer>
  );
}
