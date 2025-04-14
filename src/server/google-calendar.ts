import "use-server";
import { google } from "googleapis";
import { addMinutes, endOfDay, startOfDay } from "date-fns";
import { db } from "./db";
import { env } from "@/env";

export async function getCalendarEventTimes(
  clerkUserId: string,
  { start, end }: { start: Date; end: Date },
) {
  const oAuthClient = await getOAuthClient(clerkUserId);

  const events = await google.calendar("v3").events.list({
    calendarId: "primary",
    eventTypes: ["default"],
    singleEvents: true,
    timeMin: start.toISOString(),
    timeMax: end.toISOString(),
    maxResults: 2500,
    auth: oAuthClient,
  });

  return (
    events.data.items
      ?.map((event) => {
        if (event.start?.date != null && event.end?.date != null) {
          return {
            start: startOfDay(event.start.date),
            end: endOfDay(event.end.date),
          };
        }

        if (event.start?.dateTime != null && event.end?.dateTime != null) {
          return {
            start: new Date(event.start.dateTime),
            end: new Date(event.end.dateTime),
          };
        }
      })
      .filter((date) => date != null) ?? []
  );
}

export async function createCalendarEvent({
  userId,
  guestName,
  guestEmail,
  startTime,
  guestNotes,
  durationInMinutes,
  eventName,
}: {
  userId: string;
  guestName: string;
  guestEmail: string;
  startTime: Date;
  guestNotes?: string | null;
  durationInMinutes: number;
  eventName: string;
}) {
  const oAuthClient = await getOAuthClient(userId);
  const calendarUser = await db.user.findUnique({ where: { id: userId } });
  if (calendarUser?.email == null) {
    throw new Error("User has no email");
  }

  const calendarEvent = await google.calendar("v3").events.insert({
    calendarId: "primary",
    auth: oAuthClient,
    sendUpdates: "all",
    requestBody: {
      attendees: [
        { email: guestEmail, displayName: guestName },
        {
          email: calendarUser.email,
          displayName: calendarUser.name,
          responseStatus: "accepted",
        },
      ],
      description: guestNotes ? `Additional Details: ${guestNotes}` : undefined,
      start: {
        dateTime: startTime.toISOString(),
      },
      end: {
        dateTime: addMinutes(startTime, durationInMinutes).toISOString(),
      },
      summary: `${guestName} + ${calendarUser.name}: ${eventName}`,
    },
  });

  return calendarEvent.data;
}

async function getOAuthClient(userId: string) {
  // 1. Get user's email from your DB
  const user = await db.user.findUnique({
    where: { id: userId },
    select: { email: true },
  });

  if (!user?.email) {
    throw new Error("User email not found");
  }

  const client = new google.auth.OAuth2(
    env.GOOGLE_CALENDAR_CLIENT_ID,
    env.GOOGLE_CALENDAR_CLIENT_SECRET,
    env.GOOGLE_CALENDAR_REDIRECT_URI,
  );

  const authUrl = client.generateAuthUrl({
    access_type: "offline",
    prompt: "consent",
    scope: ["https://www.googleapis.com/auth/calendar.events"],
    login_hint: user.email, // Critical for targeting the right account
    // state: userId, // Pass through to callback
  });
  return authUrl;
}
