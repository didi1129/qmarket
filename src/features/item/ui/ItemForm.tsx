"use client";

import { ScrollArea } from "@/shared/ui/scroll-area";
import { Button } from "@/shared/ui/button";
import { useItemForm } from "../model/useItemForm";
import { ItemFormType } from "../model/schema";
import { ItemDetail } from "./ItemDetailClient";
import ItemNameField from "./form/ItemNameField";
import PriceField from "./form/PriceField";
import MessageField from "./form/MessageField";

interface ItemFormProps {
  mode: "create" | "update";
  isForSale: boolean;
  initialData?: ItemFormType | ItemDetail;
  onSuccess?: () => void;
  onClose?: () => void;
}

export default function ItemForm({
  mode,
  isForSale,
  initialData,
  onSuccess,
  onClose,
}: ItemFormProps) {
  const { form, onSubmit, isPending } = useItemForm({
    mode,
    isForSale,
    initialData,
    onSuccess,
  });

  return (
    <ScrollArea className="max-h-[60vh] pr-4">
      <form onSubmit={form.handleSubmit(onSubmit)} className="mb-4 item-form">
        <div className="grid gap-8 px-2">
          <ItemNameField form={form} />
          <PriceField form={form} />
          <MessageField form={form} />
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onClose}>
            닫기
          </Button>
          <Button disabled={isPending}>
            {isPending
              ? mode === "update"
                ? "수정 중..."
                : "등록 중..."
              : mode === "update"
                ? "수정하기"
                : "등록하기"}
          </Button>
        </div>
      </form>
    </ScrollArea>
  );
}
