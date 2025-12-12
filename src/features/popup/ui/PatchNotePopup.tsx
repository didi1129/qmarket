"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog";
import { Button } from "@/shared/ui/button";

export function PatchNotePopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // 팝업을 한 번만 보여주기 위한 로컬 스토리지 체크
    const hasSeenPopup = localStorage.getItem("hasSeenPatchNotePopup");

    if (!hasSeenPopup) {
      setOpen(true);
    }
  }, []);

  const handleClose = () => {
    setOpen(false);
    // 팝업을 다시 보지 않도록 저장
    localStorage.setItem("hasSeenPatchNotePopup", "true");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            🎉 패치노트 업데이트
          </DialogTitle>
          <DialogDescription className="pt-4 text-base text-center">
            &apos;패치노트&apos;가 업데이트 되었습니다.
            <br /> 새로운 업데이트 내역을 확인해보세요!
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={handleClose}>
            닫기
          </Button>
          <Button
            onClick={() => {
              handleClose();
              window.location.href = "/patch-note";
            }}
          >
            확인하러 가기
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
