import { ITEMS_TABLE_NAME } from "@/shared/config/constants";
import { supabase } from "@/shared/api/supabase-client";
import getMiddlePrice from "@/shared/lib/getMiddlePrice";

// 거래 희망가 조회
export default async function getDesiredPrice(
  itemName: string,
  itemGender: string
) {
  if (!itemName || !itemGender) {
    return 0;
  }

  const { data: listings, error } = await supabase
    .from(ITEMS_TABLE_NAME)
    .select("price")
    .eq("item_name", itemName)
    .eq("item_gender", itemGender)
    .eq("is_sold", false)
    .eq("is_for_sale", false) // 구매 등록 데이터만 선택
    .limit(10); // 최신 10개까지만 조회

  if (error) {
    console.error("아이템 구매 희망가 조회 중 오류:", error.message);
    throw new Error(error.message);
  }

  if (!listings || listings.length === 0) {
    return 0;
  }

  const prices = listings
    .map((item) => Number(item.price))
    .sort((a, b) => a - b);
  const uniquePrices = [...new Set(prices)];
  const price = getMiddlePrice(uniquePrices);

  return price;
}
