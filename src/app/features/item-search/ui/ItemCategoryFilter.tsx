import { ITEM_CATEGORY_MAP } from "@/shared/config/constants";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import React from "react";

interface Props {
  value: string | null;
  onChange: (value: string | null) => void;
}

function ItemCategoryFilter({ value, onChange }: Props) {
  return (
    <Select value={value ?? ""} onValueChange={(val) => onChange(val || null)}>
      <SelectTrigger className="w-[126px]">
        <SelectValue placeholder="카테고리 선택" />
      </SelectTrigger>
      <SelectContent>
        {Object.entries(ITEM_CATEGORY_MAP).map(([key, label]) => (
          <SelectItem key={key} value={key}>
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default React.memo(ItemCategoryFilter);
