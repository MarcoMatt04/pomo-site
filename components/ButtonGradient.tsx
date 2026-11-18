"use client";
import React from "react";
import { HoverBorderGradient } from "./ui/hover-border-gradient";

type HoverBorderGradientDemoProps = {
    text: string;
};

export function ButtonGradient({ text }: HoverBorderGradientDemoProps) {



  return (
    <div className="flex justify-center text-center">
      <HoverBorderGradient
        containerClassName="rounded-full"
        as="button"
        className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2 text-md"
      >
        <span>{ text }</span>
      </HoverBorderGradient>
    </div>
  );
}
