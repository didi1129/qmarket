import { supabase } from "@/shared/api/supabase-client";

interface Props {
  userId: string;
  isForSale: boolean;
  isSold: boolean;
}

<<<<<<<< HEAD:src/features/item/model/client-api.ts
export const fetchFilteredItems = async ({
  userId,
  isForSale,
  isSold,
}: Props) => {
========
const getFilteredUserItems = async ({ userId, isForSale, isSold }: Props) => {
>>>>>>>> dfe84177259b61d8dbbe13b31e819fd065c79432:src/features/items/model/getFilteredUserItems.ts
  // let query = supabase.from(ITEMS_TABLE_NAME).select("*").eq("user_id", userId);
  let query = supabase.from("items_test").select("*").eq("user_id", userId);

  // 삽니다/팝니다 구분
  query = query.eq("is_for_sale", isForSale);

  // 거래 완료 여부 구분
  query = query.eq("is_sold", isSold);

  const { data, error } = await query.order("created_at", { ascending: false });

  if (error) {
    console.error("아이템 목록 로딩 오류:", error);
    throw new Error(error.message);
  }
  return data;
};
<<<<<<<< HEAD:src/features/item/model/client-api.ts
========

export default getFilteredUserItems;
>>>>>>>> dfe84177259b61d8dbbe13b31e819fd065c79432:src/features/items/model/getFilteredUserItems.ts
