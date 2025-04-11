"use client";

import { PlusCircle, XCircle } from "lucide-react";

import { cn } from "@/lib/utils";
import { useState } from "react";
import { MotionWrapper } from "@/components/motion-wrapper";
import Markdown from "react-markdown";
import { PawsBgCard } from "../sections/components/paws-bg-card";

type AccorderonProps = {
  questions: { question: string; answer: string }[];
  className?: string;
};

export function Accordion({ questions, className }: AccorderonProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  return (
    <div className={cn("w-full", className)}>
      {questions.map(({ question, answer }, index) => (
        <MotionWrapper
          key={index}
          transition={{ duration: 0.5, delay: 0.2 * index }}
        >
          <PawsBgCard
            className="relative flex items-center justify-between rounded-2xl"
            childrenClassName="flex items-center justify-between"
          >
            <p className="text-primary-foreground flex-grow">{question}</p>
            <button
              aria-label="toggle question"
              onClick={() =>
                setActiveIndex(activeIndex === index ? null : index)
              }
            >
              <div className="text-primary-foreground relative min-h-10 min-w-10">
                <PlusCircle
                  className={cn(
                    "absolute inset-0 h-full w-full scale-100 stroke-[1.5px] transition-transform duration-300",
                    {
                      "scale-0 rotate-45": activeIndex === index,
                    },
                  )}
                />
                <XCircle
                  className={cn(
                    "absolute inset-0 h-full w-full scale-0 stroke-[1.5px] transition-transform duration-300",
                    {
                      "scale-100 rotate-90": activeIndex === index,
                    },
                  )}
                />
              </div>
              <span className="absolute inset-0 cursor-pointer" />
            </button>
          </PawsBgCard>
          <div
            className={cn(
              "grid grid-rows-[0fr] transition-[grid-template-rows] duration-300",
              {
                "grid-rows-[1fr]": index === activeIndex,
              },
            )}
          >
            <div
              className={cn(
                "text-foreground overflow-hidden py-2 opacity-1 transition-all duration-300 md:px-8",
                {
                  "pb-8 opacity-1": index === activeIndex,
                },
              )}
            >
              <Markdown
                components={{
                  li: ({ children }) => (
                    <li className="text-foreground ml-6 list-disc md:text-lg">
                      {children}
                    </li>
                  ),
                  p: ({ children }) => (
                    <p className="text-foreground pt-2 md:text-xl">
                      {children}
                    </p>
                  ),
                }}
              >
                {answer}
              </Markdown>
            </div>
          </div>
        </MotionWrapper>
      ))}
    </div>
  );
}
