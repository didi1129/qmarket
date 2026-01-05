import { supabase } from "@/shared/api/supabase-client";

export async function getItemPriceChanges(limit?: number) {
  let query = supabase
    .from("item_price_changes")
    .select(
      `
      *,
      items_info (
        image
      )
    `
    )
    .order("log_date", { ascending: false })
    .order("change_rate", { ascending: false });

  if (limit) {
    query = query.limit(limit);
  }

  const { data, error } = await query;

  if (error) {
    console.error("시세 변동 내역 조회 오류:", error);
    return [];
  }

  return data.map((item) => {
    const { items_info, ...rest } = item; // items_info 객체 분리
    return {
      ...rest, // items_info를 제외한 나머지 데이터
      image: items_info?.image || null,
    };
  });
}
