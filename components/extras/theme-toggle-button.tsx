"use client";

import React, { useEffect, useState } from "react";

import style from "./theme-toggle-button.module.css";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { setCookie } from "@/lib/cookies";

type Props = React.HTMLAttributes<HTMLButtonElement> & {};

export default function ThemeToggleButton({ className, ...props }: Props) {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const isDark = theme === "dark";

  useEffect(() => {
    const theme = document.body.classList.contains("dark") ? "dark" : "light";
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTheme(theme);
  }, []);

  function toggleTheme() {
    const callback = () => {
      document.body.classList.toggle("dark");
      setCookie(
        "theme",
        document.body.classList.contains("dark") ? "dark" : "light",
        15
      );
      setTheme(document.body.classList.contains("dark") ? "dark" : "light");
    };

    // Check if View Transitions API is supported
    if (document.startViewTransition) {
      document.startViewTransition(callback);
    } else {
      // Fallback for browsers that don't support View Transitions API
      callback();
    }
  }

  return (
    <Button
      variant={"ghost"}
      className={cn(
        "h-8 p-2 aspect-square bg-none hover:bg-none cursor-pointer",
        "text-current text-2xl",
        className
      )}
      onClick={(e) => {
        e.preventDefault();
        toggleTheme();
        // setTimeout(() => setIsModalOpen(true), 1000);
      }}
      {...props}
    >
      <svg
        aria-hidden="true"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        data-theme={isDark ? "dark" : "light"}
        className={`${style.icon}`}
      >
        <mask id="moon" className={`${style.icon} ${style.moon}`}>
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="white"
            className={`${style.icon}`}
          ></rect>
          <circle
            cx="40"
            cy="8"
            r="11"
            fill="black"
            className={`${style.icon}`}
          ></circle>
        </mask>
        <circle
          id="sun"
          cx="12"
          cy="12"
          r="11"
          mask="url(#moon)"
          className={`${style.icon} ${style.sun}`}
        ></circle>
        <g id="sun-beams" className={`${style.icon} ${style.sunBeams}`}>
          <line
            x1="12"
            y1="1"
            x2="12"
            y2="3"
            className={`${style.icon}`}
          ></line>
          <line
            x1="12"
            y1="21"
            x2="12"
            y2="23"
            className={`${style.icon}`}
          ></line>
          <line
            x1="4.22"
            y1="4.22"
            x2="5.64"
            y2="5.64"
            className={`${style.icon}`}
          ></line>
          <line
            x1="18.36"
            y1="18.36"
            x2="19.78"
            y2="19.78"
            className={`${style.icon}`}
          ></line>
          <line
            x1="1"
            y1="12"
            x2="3"
            y2="12"
            className={`${style.icon}`}
          ></line>
          <line
            x1="21"
            y1="12"
            x2="23"
            y2="12"
            className={`${style.icon}`}
          ></line>
          <line
            x1="4.22"
            y1="19.78"
            x2="5.64"
            y2="18.36"
            className={`${style.icon}`}
          ></line>
          <line
            x1="18.36"
            y1="5.64"
            x2="19.78"
            y2="4.22"
            className={`${style.icon}`}
          ></line>
        </g>
      </svg>
    </Button>
  );
}
