"use client";

import { Button } from "../button";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ButtonToBack() {
  const router = useRouter();
  return (
    <Button variant="ghost" onClick={() => router.back()}>
      <ChevronLeft /> 돌아가기
    </Button>
  );
}
