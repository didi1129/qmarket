"use client";

import getFilteredItems from "../model/getFilteredItems";
import { useQuery } from "@tanstack/react-query";
import ItemCard from "@/features/item/ui/ItemCard";
import { ItemCategory } from "@/features/item/model/itemTypes";
import { cn } from "@/shared/lib/utils";

interface ItemListProps {
  category?: ItemCategory;
  isForSale?: boolean;
  isSold?: boolean;
  className?: string;
}

export default function ItemList({
  category,
  isForSale,
  isSold,
  className,
}: ItemListProps) {
  const { data, isPending } = useQuery({
    queryKey: ["filtered-items", category, isForSale, isSold],
    queryFn: () => getFilteredItems({ category, isForSale, isSold }),
  });

  if (isPending) return <div>로딩 중...</div>;

  return (
    <div className={cn("pb-10 shrink-0", className)}>
      <div className="flex flex-col h-[400px] overflow-auto rounded-2xl border border-border">
        {data?.length === 0 ? (
          <div className="flex items-center justify-center h-full text-sm text-gray-500">
            등록된 아이템이 없습니다.
          </div>
        ) : (
          <>
            {data?.map((item) => (
              <ItemCard key={item.id} item={item} />
            ))}
          </>
        )}
      </div>
    </div>
  );
}
