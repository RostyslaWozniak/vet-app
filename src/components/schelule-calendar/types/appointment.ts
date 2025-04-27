import type { $Enums } from "@prisma/client";

type User = {
  id: string;
  name: string;
  email: string;
  phoneNumber: string | null;
};

export type AppointmentType = {
  startTime: Date;
  endTime: Date;
  id: string;
  user: User | null;
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
  startTimes: string[];
  endTimes: string[];
  // startTime: string | undefined;
  // endTime: string | undefined;
};

export type AppointmentPosition = {
  top: string;
  height: string;
};
