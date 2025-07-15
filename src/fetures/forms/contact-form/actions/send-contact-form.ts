"use server";

import { sendTextEmail } from "@/lib/services/resend";
import {
  contactFormSchema,
  type ContactFormSchema,
} from "../lib/contact-form-schema";

export async function sendContactForm(
  data: ContactFormSchema,
): Promise<string | null> {
  const parsedData = contactFormSchema.parse(data);

  try {
    await sendTextEmail({
      email: "contact@webjoin.pl",
      subject: "Wiadomość z formularza kontaktowego VetApp",
      text: `Imie: ${parsedData.username}\nEmail: ${parsedData.email}\nWiadomość: ${parsedData.message}`,
      name: "contact-form",
    });
    return null;
  } catch {
    return "Coś poszło nie tak. Spróbuj ponownie.";
  }
}
