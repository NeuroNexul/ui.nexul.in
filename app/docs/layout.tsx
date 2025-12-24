import { source } from "@/lib/source";
import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { baseOptions } from "@/lib/layout.shared";
import { cn } from "@/lib/cn";

export default function Layout({ children }: LayoutProps<"/docs">) {
  return (
    <DocsLayout
      {...baseOptions()}
      tree={source.pageTree}
      sidebar={{
        className: cn(
          "data-[collapsed=false]:!bg-background data-[collapsed=false]:border-none transition-[width,inset-block,translate]",
          "[&>div:last-child>div]:justify-end"
        ),
      }}
    >
      {children}
    </DocsLayout>
  );
}
