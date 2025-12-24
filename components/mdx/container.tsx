import { cn } from "@/lib/utils";
import React from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "../ui/resizable";

type Props = React.HTMLAttributes<HTMLDivElement> & {
  children?: React.ReactNode;
  resizable?: boolean;
  containerProps?: React.HTMLAttributes<HTMLDivElement>;
};

export default function Container({
  className,
  children,
  resizable,
  containerProps: { className: containerClassName, ...containerProps } = {},
  ...props
}: Props) {
  if (!resizable)
    return (
      <div
        className={cn(
          "w-full min-h-96 border rounded-xl p-4 bg-background grid place-items-center",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  return (
    <ResizablePanelGroup
      orientation="horizontal"
      defaultLayout={{ "main-panel": 100, "secondary-panel": 0 }}
      className={cn("w-full relative z-0 min-h-150 h-auto", className)}
      {...props}
    >
      <div
        className={cn(
          "absolute z-0 inset-0 right-2",
          "border rounded-xl bg-background",
          "bg-[radial-gradient(#d4d4d4_1px,transparent_1px)] bg-size-[20px_20px] dark:bg-[radial-gradient(#404040_1px,transparent_1px)]",
          className
        )}
        {...props}
      ></div>
      <ResizablePanel
        id="main-panel"
        minSize={200}
        defaultSize={"100%"}
        className="relative z-10"
      >
        <div
          className={cn(
            "w-full h-full border rounded-xl bg-background grid place-items-center",
            containerClassName
          )}
          {...containerProps}
        >
          {children}
        </div>
      </ResizablePanel>
      <ResizableHandle
        className={cn(
          "w-2 focus-visible:ring-0! focus-visible:ring-offset-0! bg-transparent",
          "after:h-10 after:w-1.5 after:bg-muted after:rounded-sm after:relative"
        )}
      />
      <ResizablePanel id="secondary-panel" defaultSize={0}>
        <div />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
