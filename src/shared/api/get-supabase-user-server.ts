import { cache } from "react";
import { getSupabaseServerCookie } from "@/shared/api/supabase-cookie";

// 서버 컴포넌트에서 캐싱된 유저 데이터 불러오는 함수
export const getUserServer = cache(async () => {
  const supabase = await getSupabaseServerCookie();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  // 에러 시 비로그인 상태만 전달
  if (error) return null; // throw Error 대신 null 리턴 (throw Error 적용하면 로그아웃 시 에러 화면으로 이동됨)

  return user;
});
