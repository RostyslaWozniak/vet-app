import { env } from "@/env";
import { Resend } from "resend";

export const resend = new Resend(env.RESEND_API_KEY);

export async function sendReactEmail({
  email,
  subject,
  emailTemplate: EmailTemplate,
  name = env.RESEND_FROM_NAME,
}: {
  email: string;
  subject: string;
  emailTemplate: React.ReactNode;
  name?: string;
}) {
  const { data, error } = await resend.emails.send({
    from: `Vet App Notifications<${name}@${env.RESEND_DOMAIN}>`,
    to: email,
    subject,
    react: EmailTemplate,
  });

  if (error) {
    console.log({ error });
    return error;
  }
  return data;
}

export async function sendTextEmail({
  email,
  subject,
  text,
  name = env.RESEND_FROM_NAME,
}: {
  email: string;
  subject: string;
  text: string;
  name?: string;
}) {
  const { data, error } = await resend.emails.send({
    from: `Vet App<${name}@${env.RESEND_DOMAIN}>`,
    to: email,
    subject,
    text,
  });

  if (error) {
    console.log({ error });
    return error;
  }
  return data;
}
