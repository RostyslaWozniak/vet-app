import type { $Enums } from "@prisma/client";

export type AppointmentType = {
  startTime: Date;
  endTime: Date;
  id: string;
  userId: string | null;
  contactName: string | null;
  contactEmail: string | null;
  contactPhone: string | null;
  status: $Enums.AppointmentStatus;
  createdAt: Date;
  service: {
    id: string;
    name: string;
    description: string | null;
    durationInMinutes: number;
  };
};

export type WeekDayInfo = {
  name: string;
  date: Date;
  dayOfMonth: string;
  isToday: boolean;
};

export type AppointmentPosition = {
  top: string;
  height: string;
};
