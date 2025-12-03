import { getSupabaseClientCookie } from "@/shared/api/supabase-cookie";

interface Props {
  itemName: string;
  itemGender: string;
  userId: string;
}

export default async function preventCreateExistingItem({
  itemName,
  itemGender,
  userId,
}: Props) {
  const supabase = await getSupabaseClientCookie();

  const { data: existingItems, error: selectError } = await supabase
    .from("items_test")
    .select("user_id")
    .eq("item_name", itemName)
    .eq("item_gender", itemGender)
    .eq("user_id", userId);

  if (selectError) {
    throw new Error(selectError.message);
  }

  if (existingItems && existingItems.length > 0) {
    throw new Error("이미 등록하신 아이템입니다.");
  }
}
