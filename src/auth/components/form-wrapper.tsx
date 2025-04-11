"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { OAuthButtons } from "./oauth-buttons";

type FormContainerProps = {
  children: React.ReactNode;
  title: string;
  description: string;
  href: string;
  imageUrl: string;
  linkLabel: string;
};

export const FormContainer = ({
  children,
  title,
  description,
  href,
  imageUrl,
  linkLabel,
}: FormContainerProps) => {
  return (
    <div className="bg-card flex h-[40rem] w-full max-w-[64rem] overflow-hidden rounded-2xl md:shadow-2xl">
      <div className="mx-auto w-full max-w-[400px] space-y-10 overflow-y-auto px-5 md:py-10">
        <div className="space-y-3">
          <h1 className="text-center text-2xl font-bold md:text-3xl">
            {title} do <span className="text-primary">Vet App</span>
          </h1>
          <p className="text-muted-foreground text-center text-sm md:text-base">
            {description}
          </p>
        </div>
        <div className="space-y-5">
          <OAuthButtons />
          {children}
          <Link href={href} className="block text-center hover:underline">
            {linkLabel}
          </Link>
        </div>
      </div>
      <div className="relative hidden aspect-[9/10] w-[40%] bg-gray-300 md:block">
        <div className="bg-primary/10 absolute inset-0 z-20"></div>
        <motion.img
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          src={imageUrl}
          className="h-full w-full object-cover object-[10%] duration-300"
          alt={`Vet App ${title} image`}
          loading="lazy"
        />
      </div>
    </div>
  );
};
