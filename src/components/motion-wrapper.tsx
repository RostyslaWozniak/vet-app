"use client";

import { cn } from "@/lib/utils";
import { motion, type MotionProps } from "framer-motion";

type MotionWrapperProps = {
  children: React.ReactNode;
  className?: string;
} & MotionProps;

export function MotionWrapper({
  children,
  className,
  ...props
}: MotionWrapperProps) {
  return (
    <motion.div
      className={cn(className)}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px 0px 0px" }}
      transition={{ duration: 0.3 }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
