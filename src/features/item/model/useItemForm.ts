"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ItemFormType, ItemFormSchema } from "./schema";
import {
  ITEM_CATEGORY_MAP,
  ITEM_GENDER_MAP,
  ITEM_SOURCES_MAP,
} from "@/shared/config/constants";
import {
  useCreateItemMutation,
  useUpdateItemMutation,
} from "./itemMutations";
import { getKeyByValue } from "@/shared/lib/getKeyByValue";
import { ItemDetail } from "../ui/ItemDetailClient";

interface UseItemFormProps {
  mode: "create" | "update";
  isForSale: boolean;
  initialData?: ItemFormType | ItemDetail;
  onSuccess?: () => void;
}

/**
 * ItemForm의 폼 상태/초기값/제출 로직을 관리하는 커스텀 훅
 */
export function useItemForm({
  mode,
  isForSale,
  initialData,
  onSuccess,
}: UseItemFormProps) {
  const getDefaultValues = (): ItemFormType => {
    if (mode === "update" && initialData && "id" in initialData && typeof initialData.id === "number") {
      // 수정 모드: ItemFormType
      const data = initialData as ItemFormType;
      return {
        ...data,
        item_source:
          getKeyByValue(ITEM_SOURCES_MAP, data.item_source) ||
          data.item_source,
        item_gender:
          getKeyByValue(ITEM_GENDER_MAP, data.item_gender) ||
          data.item_gender,
        category:
          getKeyByValue(ITEM_CATEGORY_MAP, data.category) ||
          data.category,
      };
    }

    if (mode === "create" && initialData && "name" in initialData) {
      // 상세 페이지에서 바로 등록: ItemDetail
      const item = initialData as ItemDetail;
      return {
        item_name: item.name,
        image: item.image ?? "/images/empty.png",
        price: 0,
        item_source:
          getKeyByValue(ITEM_SOURCES_MAP, item.item_source) ||
          ("gatcha" as const),
        item_gender:
          getKeyByValue(ITEM_GENDER_MAP, item.item_gender) ||
          ("m" as const),
        is_sold: false,
        category:
          getKeyByValue(ITEM_CATEGORY_MAP, item.category) ||
          ("hair" as const),
        message: "",
      };
    }

    // 기본 빈 폼
    return {
      item_name: "",
      image: "/images/empty.png",
      price: 0,
      item_source: "gatcha" as const,
      item_gender: "m" as const,
      is_sold: false,
      category: "hair" as const,
      message: "",
    };
  };

  const form = useForm<ItemFormType>({
    resolver: zodResolver(ItemFormSchema),
    defaultValues: getDefaultValues(),
  });

  const createItemMutation = useCreateItemMutation({
    onSuccessCallback: onSuccess,
    isForSale,
  });

  const updateItemMutation = useUpdateItemMutation({
    onSuccessCallback: onSuccess,
    isForSale,
  });

  const onSubmit = (values: ItemFormType) => {
    if (mode === "update" && initialData && "id" in initialData) {
      updateItemMutation.mutate(
        {
          id: (initialData as ItemFormType).id,
          data: values,
        },
        {
          onSuccess: () => {
            form.reset();
          },
        }
      );
    } else {
      createItemMutation.mutate(values, {
        onSuccess: () => {
          form.reset();
        },
      });
    }
  };

  const isPending =
    createItemMutation.isPending || updateItemMutation.isPending;

  return { form, onSubmit, isPending };
}
