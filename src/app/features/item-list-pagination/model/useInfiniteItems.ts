import { useInfiniteQuery, type InfiniteData } from "@tanstack/react-query";
import { fetchItemsPage } from "@/entities/item/model/client-fetch";
import { Item } from "@/entities/item/model/types";
import { ITEMS_PAGE_SIZE } from "@/shared/config/constants";

interface InfiniteItemData {
  items: Item[];
  nextOffset: number | undefined;
}

export const useInfiniteItems = (initialItems: Item[]) => {
  return useInfiniteQuery({
    queryKey: ["items"],
    queryFn: async ({ pageParam = 0 }) => {
      if (pageParam === 0) {
        const nextOffset =
          initialItems.length < ITEMS_PAGE_SIZE ? undefined : ITEMS_PAGE_SIZE;
        return {
          items: initialItems,
          nextOffset: nextOffset,
        };
      }

      const items = await fetchItemsPage(pageParam);
      const nextOffset =
        items.length < ITEMS_PAGE_SIZE
          ? undefined
          : pageParam + ITEMS_PAGE_SIZE;

      return { items, nextOffset };
    },

    initialPageParam: 0,
    initialData: {
      pages: [
        {
          items: initialItems,
          nextOffset:
            initialItems.length < ITEMS_PAGE_SIZE ? undefined : ITEMS_PAGE_SIZE,
        },
      ],
      pageParams: [0],
    } as InfiniteData<InfiniteItemData, number>,

    getNextPageParam: (lastPage) => lastPage.nextOffset,
  });
};
