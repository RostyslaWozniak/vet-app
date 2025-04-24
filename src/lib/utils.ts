import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function timeToInt(time: string) {
  return parseFloat(time.replace(":", "."));
}

export function groupBy<T>(
  array: T[],
  key: (item: T) => string,
): Record<string, T[]> {
  const result: Record<string, T[]> = {};
  array.forEach((item) => {
    const keyVal = key(item);
    result[keyVal] ??= [];
    result[keyVal].push(item);
  });
  return result;
}

export function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

export function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
