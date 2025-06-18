import { env } from "@/env";
import { resend } from "@/lib/services/resend";
import { tryCatch } from "@/lib/try-catch";
import { db } from "@/server/db";
import { NextResponse } from "next/server";

export async function GET() {
  const tomorow = new Date().setDate(new Date().getDate() + 1);
  const tomorowStartDate = new Date(new Date(tomorow).setHours(0, 0, 0, 0));
  const tomorowEndDate = new Date(new Date(tomorow).setHours(23, 59, 59, 999));

  const appointments = await db.appointment.findMany({
    where: {
      startTime: {
        gte: tomorowStartDate,
        lte: tomorowEndDate,
      },
      status: {
        not: "CANCELLED",
      },
    },
    select: {
      id: true,
      contactName: true,
      startTime: true,
      contactEmail: true,
      service: {
        select: {
          name: true,
        },
      },
    },
  });

  const { data: response, error } = await tryCatch(
    resend.batch.send(
      appointments.map((appointment) => ({
        from: `Vet App Przypomnienie o jutrzejszej wizycie <${process.env.RESEND_FROM_NAME}@${process.env.RESEND_DOMAIN}>`,
        to: appointment.contactEmail!,
        subject: "Przypominamy o jutrzejszej wizycie w VetApp",
        text: `Cześć ${appointment.contactName}, przypominamy o jutrzejszej wizycie w VetApp o ${new Date(
          appointment.startTime,
        ).getHours()}:${new Date(appointment.startTime).getMinutes()} na usłudze ${appointment.service.name}. Jeśli chcesz anulować wizytę, kliknij tutaj: ${env.BASE_URL}/profile/appointments/${appointment.id}`,
      })),
    ),
  );

  return NextResponse.json({ ok: true, response, error });
}
