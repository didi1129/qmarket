import { ReactNode } from "react";
import { useMediaQuery } from "@/shared/hooks/useMediaQuery";
import { TABLET_MIN_WIDTH } from "@/shared/config/constants";
import { Tooltip, TooltipTrigger, TooltipContent } from "./tooltip";
import { Popover, PopoverTrigger, PopoverContent } from "./popover";

interface AdaptiveInfoProps {
  content: ReactNode;
  children: ReactNode;
}

export function AdaptiveInfo({ content, children }: AdaptiveInfoProps) {
  const isDesktop = useMediaQuery(`(min-width: ${TABLET_MIN_WIDTH}px)`);

  // 데스크탑: Tooltip (hover 동작)
  if (isDesktop) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent side="bottom" className="whitespace-pre-line">
          {content}
        </TooltipContent>
      </Tooltip>
    );
  }

  // 태블릿, 모바일: Popover (touch 동작)
  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className="w-full bg-foreground text-background text-sm translate-x-4">
        {content}
      </PopoverContent>
    </Popover>
  );
}
