"use client";

import { BadgeQuestionMark } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { useRouter } from "next/navigation";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/shared/ui/tooltip";

interface Props {
  onClose?: () => void;
}

export default function FAQButton({ onClose }: Props) {
  const router = useRouter();

  const handleClick = () => {
    router.push("/faq");
    onClose?.(); // 사이드바 닫기
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button size="icon" title="FAQ" variant="outline" onClick={handleClick}>
          <BadgeQuestionMark />
        </Button>
      </TooltipTrigger>
      <TooltipContent>FAQ</TooltipContent>
    </Tooltip>
  );
}
