import Link from "next/link";
import {
  Facebook,
  Globe,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { websiteConfig } from "@/lib/configs/website-config";
import { SubscribeForm } from "@/fetures/forms/subscribe-form";

const socialLinks = [
  { icon: Facebook, label: "facebook", value: websiteConfig.social.facebook },

  { icon: Linkedin, label: "linkedin", value: websiteConfig.social.linkedin },
  {
    icon: Instagram,
    label: "instagram",
    value: websiteConfig.social.instagram,
  },
  { icon: Globe, label: "website", value: websiteConfig.social.website },
];

const contactLinks = [
  {
    icon: Phone,
    label: "phone",
    value: websiteConfig.contact.phone.value,
  },
  {
    icon: Mail,
    label: "email",
    value: websiteConfig.contact.email.value,
  },

  {
    icon: MapPin,
    label: "address",
    value: websiteConfig.contact.address.value,
  },
];

export function Footer() {
  return (
    <footer className="bg-card text-card-foreground _dark-text-shadow font-montserrat w-screen px-4 pt-12 pb-24 md:pb-8 xl:px-6">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-8 md:flex-row md:items-start md:justify-between">
        <div className="space-y-4 sm:w-[300px]">
          <h2 className="text-lg font-semibold">Zapisz się do newslettera</h2>
          <SubscribeForm />
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Menu</h2>
          <div className="flex items-center gap-4">
            {Object.values(websiteConfig.navigation).map(({ path, label }) => (
              <Link key={path} href={path} className="capitalize">
                {label}
              </Link>
            ))}
          </div>
        </div>
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Social media</h2>
          <div className="flex items-center gap-4">
            {socialLinks.map(({ label, value, icon: Icon }) => (
              <Link key={value} href={value} target="_blank" aria-label={label}>
                <Icon />
              </Link>
            ))}
          </div>
        </div>
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Kontakt</h2>
          <div className="flex items-center gap-4">
            {contactLinks.map(({ label, value, icon: Icon }) => (
              <Link key={value} href={value} target="_blank" aria-label={label}>
                <Icon />
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="text-card-foreground border-card-foreground/80 mx-auto mt-12 flex max-w-[1400px] flex-col-reverse items-center justify-between gap-y-3 border-t pt-6 text-center text-sm md:flex-row">
        <span>
          &copy; {new Date().getFullYear()}. Wszystkie prawa zastrzeżone
        </span>
        <Link href="/polityka-prywatnosci" className="hover:underline">
          Polityka prywatności
        </Link>
      </div>
    </footer>
  );
}
