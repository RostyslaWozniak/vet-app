"use server";

import {
  appointmentActionSchema,
  type AppointmentActionSchema,
} from "@/lib/schema/appointment-schema";
import { db } from "../db";
import { getCurrentUser } from "@/auth/current-user";
import { DAYS_OF_WEEK_IN_ORDER } from "@/data/constants";
import type { $Enums } from "@prisma/client";

export async function createAppointment(unsafeData: AppointmentActionSchema) {
  console.log({ unsafeData });
  const { data, success } = appointmentActionSchema.safeParse(unsafeData);

  if (!success) {
    return "Bład walidacji";
  }

  const service = await db.service.findUnique({
    where: {
      id: data.serviceId,
    },
  });
  if (!service) return "Brak usługi";
  // console.log({ data });

  const startDate = data.startTime; // Appointment's start time
  const endDate = new Date(
    data.startTime.getTime() + service.durationInMinutes * 60000,
  ); // Appointment's end time

  console.log({ startDate, endDate });

  const availabilities = await db.vetScheduleAvailability.findMany({
    where: {
      vetSchedule: {
        user: {
          vetProfile: {
            services: {
              some: {
                serviceId: data.serviceId,
              },
            },
          },
        },
      },
    },
    select: {
      dayOfWeek: true,
      startTime: true,
      endTime: true,
      vetScheduleId: true,
    },
  });

  const { isAvailable, vetScheduleIds } = checkIfIsDateAvailable(
    startDate,
    endDate,
    availabilities,
  );

  if (!isAvailable) {
    return "The requested time is not available.";
  }

  const currentUser = await getCurrentUser();
  if (!currentUser) {
    await db.appointment.create({
      data: {
        contactName: data.guestName,
        contactEmail: data.guestEmail,
        vetScheduleId: vetScheduleIds[0]!,
        serviceId: data.serviceId,
        startTime: data.startTime,
        endTime: endDate,
      },
    });
  } else {
    await db.appointment.create({
      data: {
        userId: currentUser.id,
        contactName: data.guestName,
        contactEmail: data.guestEmail,
        vetScheduleId: vetScheduleIds[0]!,
        serviceId: data.serviceId,
        startTime: data.startTime,
        endTime: endDate,
      },
    });
  }
}

function checkIfIsDateAvailable(
  startDate: Date,
  endDate: Date,
  availabilities: {
    vetScheduleId: string;
    startTime: string;
    endTime: string;
    dayOfWeek: $Enums.ScheduleDayOfWeek;
  }[],
) {
  // Get the day of the week for startDate (0 = Sunday, 1 = Monday, etc.)
  const appointmentDayOfWeek = startDate.getDay();

  // Convert startTime and endTime of appointment into minutes since midnight
  const startMinutes = startDate.getHours() * 60 + startDate.getMinutes();
  const endMinutes = endDate.getHours() * 60 + endDate.getMinutes();
  const vetScheduleIds: string[] = [];

  const isAvailable = availabilities.some((availability) => {
    // Match the day of the week

    if (
      availability.dayOfWeek !== DAYS_OF_WEEK_IN_ORDER[appointmentDayOfWeek - 1]
    ) {
      return false;
    }

    // Convert the availability startTime and endTime to minutes since midnight
    const availabilityStart = convertTimeToMinutes(availability.startTime);
    const availabilityEnd = convertTimeToMinutes(availability.endTime);

    // Check if the appointment times overlap with the availability
    if (startMinutes >= availabilityStart && endMinutes <= availabilityEnd) {
      if (!vetScheduleIds.includes(availability.vetScheduleId)) {
        vetScheduleIds.push(availability.vetScheduleId);
      }
      return true;
    }
    return false;
  });

  return { isAvailable, vetScheduleIds };
}

// Helper function to convert time strings (e.g., "11:00") to minutes since midnight
function convertTimeToMinutes(timeString: string) {
  const [hours, minutes] = timeString.split(":").map(Number);
  if (hours == undefined || minutes == undefined) {
    throw new Error("Invalid time format");
  }
  return hours * 60 + minutes;
}
