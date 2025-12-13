import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/shared/api/supabase-server";

export async function GET(request: NextRequest) {
  const userId = request.nextUrl.searchParams.get("userId");

  if (!userId) {
    return NextResponse.json(
      { error: "Missing userId parameter" },
      { status: 400 }
    );
  }

  const { data, error } = await supabaseServer
    .from("item_reg_request")
    .select("id, item_name, item_gender, isRegistered")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("아이템 등록 요청 목록 불러오기 실패:", error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }

  return NextResponse.json(data, {
    headers: {
      "Cache-Control": "s-maxage=1, stale-while-revalidate=86399", // 1초간 max-age (즉시 캐싱), 24시간 동안 백그라운드 재검증
      "CDN-Cache-Control": "s-maxage=86400", // CDN 캐시 설정
    },
  });
}
