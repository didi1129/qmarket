"use client";

import { Tooltip, TooltipContent, TooltipTrigger } from "@/shared/ui/tooltip";
import ItemTransactionConfirmModal from "./ItemTransactionConfirmModal";
import { ItemTransactionConfirm } from "../model/itemTypes";

export default function SoldButton({
  itemId,
  itemName,
  itemGender,
  userId,
  isForSale,
}: ItemTransactionConfirm) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <ItemTransactionConfirmModal
          itemId={itemId}
          itemName={itemName}
          itemGender={itemGender}
          userId={userId}
          isForSale={isForSale}
        />
      </TooltipTrigger>
      <TooltipContent>{isForSale ? "판매완료" : "구매완료"}</TooltipContent>
    </Tooltip>
  );
}
