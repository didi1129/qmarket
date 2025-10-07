"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import ItemCard from "@/entities/item/ui/ItemCard";
import { Item } from "@/entities/item/model/types";
import { supabase } from "@/shared/api/supabase-client";
import ItemUploadModal from "@/features/item-upload-modal/ui/ItemUploadModal";
import { useEffect, useRef } from "react";

interface Props {
  userId: string;
}

export const fetchMyItems = async (
  userId: string,
  limit: number = 10,
  offset: number = 0
): Promise<Item[]> => {
  const { data, error } = await supabase
    .from("items")
    .select(
      `
        id, item_name, price, image,
        is_online, item_source, nickname, is_sold, user_id, item_gender
    `
    )
    .eq("user_id", userId)
    .order("id", { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) {
    console.error("서버 초기 데이터 로딩 오류:", error);
    throw new Error(error.message);
  }

  return data as Item[];
};

export default function ItemCardWidget({ userId }: Props) {
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["my-items", userId],
      queryFn: ({ pageParam = 0 }) => fetchMyItems(userId, 10, pageParam),
      getNextPageParam: (lastPage, allPages) => {
        if (lastPage.length < 10) return undefined;
        return allPages.length * 10;
      },
      initialPageParam: 0,
    });

  const items = data?.pages.flat() ?? [];

  useEffect(() => {
    if (!loadMoreRef.current || !hasNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 }
    );

    observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  if (items.length === 0) {
    return (
      <div className="flex flex-col gap-4 items-center justify-center">
        등록한 아이템이 없습니다.
        <ItemUploadModal />
      </div>
    );
  }

  return (
    <div className="pb-10">
      <ol className="space-y-4">
        {items.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </ol>

      {/* 무한 스크롤 */}
      <div ref={loadMoreRef} className="h-10">
        {isFetchingNextPage ? (
          <p className="text-center mt-4 text-gray-500 text-sm">
            아이템 로드 중...
          </p>
        ) : hasNextPage ? null : (
          <p className="text-center mt-4 text-gray-500 text-sm">
            마지막 페이지입니다.
          </p>
        )}
      </div>
    </div>
  );
}
