import ThemeToggleButton from "@/components/extras/theme-toggle-button";
import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import React from "react";

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      children: (
        <div className="w-full block border-b border-muted pb-2">
          <h2 className="text-xl font-bold">Nexul UI</h2>
        </div>
      ),
    },
    themeSwitch: {
      component: <ThemeToggleButton />,
    },
    githubUrl: "https://github.com/NeuroNexul/ui.nexul.in",
  };
}
