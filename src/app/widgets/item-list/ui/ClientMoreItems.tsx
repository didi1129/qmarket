"use client";

import { useInfiniteItems } from "@/features/item-list-pagination/model/useInfiniteItems";
import ItemRow from "@/entities/item/ui/ItemRow";
import { Item } from "@/entities/item/model/types";
import { useRef, useEffect, useMemo } from "react";

interface ClientMoreItemsProps {
  initialItems: Item[];
}

export default function ClientMoreItems({
  initialItems,
}: ClientMoreItemsProps) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, error } =
    useInfiniteItems(initialItems);

  const loadMoreRef = useRef(null);

  const allItems = useMemo(() => {
    if (!data) return initialItems;

    return data.pages.flatMap((page, index) => {
      // 두번째 페이지부터
      if (index === 0) return [];
      return page.items;
    });
  }, [data, initialItems]);

  // Intersection Observer (무한 스크롤)
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

    return () => {
      observer.disconnect();
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  if (error) {
    return (
      <div className="text-center p-8 text-red-600">
        데이터 로딩 중 오류 발생: {error.message}
      </div>
    );
  }

  return (
    <div className="mt-6 pt-6">
      <div className="space-y-4">
        {/* 추가 데이터 로드 */}
        {allItems.map((item) => (
          <ItemRow key={item.id} item={item} />
        ))}
      </div>

      {/* 무한 스크롤 트리거 영역 */}
      <div ref={loadMoreRef} className="h-10">
        {isFetchingNextPage ? (
          <p className="text-center mt-4">추가 상품 로드 중...</p>
        ) : hasNextPage ? (
          <></>
        ) : (
          <p className="text-center mt-4 text-gray-500">
            모든 상품을 불러왔습니다.
          </p>
        )}
      </div>
    </div>
  );
}
