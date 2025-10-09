"use client";

import { ITEM_SALE_STATUS_MAP } from "@/shared/config/constants";
import React from "react";
import { Button } from "@/shared/ui/button";

export type ItemSaleStatusKey = keyof typeof ITEM_SALE_STATUS_MAP;

type Props = {
  value?: string | null;
  onChange: (key: ItemSaleStatusKey | null) => void;
};

function ItemSoldFilter({ value, onChange }: Props) {
  const handleClick = (key: ItemSaleStatusKey) => {
    onChange(value === key ? null : key);
  };

  return (
    <div className="flex gap-2">
      {Object.entries(ITEM_SALE_STATUS_MAP).map(([key, label]) => (
        <Button
          key={key}
          onClick={() => handleClick(key as ItemSaleStatusKey)}
          className={`px-3 py-1 rounded-md border text-sm transition ${
            value === key
              ? "font-bold"
              : "bg-white text-black hover:bg-gray-100"
          }`}
        >
          {label}
        </Button>
      ))}
    </div>
  );
}

export default React.memo(ItemSoldFilter);
