import { supabase } from "@/shared/api/supabase-client";
import { ITEMS_TABLE_NAME } from "@/shared/config/constants";
import { ITEM_CATEGORY_MAP } from "@/shared/config/constants";
import { ItemCategory } from "@/features/item/model/itemTypes";

interface getFilteredItemsProps {
  category?: ItemCategory;
  isForSale?: boolean;
}

// 추후 필터 로직 추가로 클라이언트에서 데이터 캐싱 필요
const getFilteredItems = async ({
  category,
  isForSale,
}: getFilteredItemsProps) => {
  let query = supabase
    .from(ITEMS_TABLE_NAME)
    .select("*")
    .not("user_id", "is", null);

  if (category) {
    query = query.eq("category", ITEM_CATEGORY_MAP[category]);
  }
  if (isForSale) {
    query = query.eq("is_for_sale", isForSale);
  }

  const { data, error } = await query.order("created_at", { ascending: false });

  if (data) {
    return data.map((item) => ({
      ...item,
      image: item.image ? item.image.trim() : null,
    }));
  }

  if (error) {
    console.error("아이템 목록 로딩 오류:", error);
    throw new Error(error.message);
  }
  return data;
};

export default getFilteredItems;
