import { FetchError } from "@/shared/config/types";

export const getRecentMarketItems = async (limit: number) => {
  const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!SUPABASE_URL || !ANON_KEY) {
    throw new Error(
      "Supabase 환경 변수(SUPABASE_URL, SUPABASE_ANON_KEY)가 설정되지 않았습니다."
    );
  }

  const queryParams = new URLSearchParams({
    select: "*",
    order: "created_at.desc",
    limit: limit.toString(),
  });

  const url = `${SUPABASE_URL}/rest/v1/items?${queryParams.toString()}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        apikey: ANON_KEY,
        Authorization: `Bearer ${ANON_KEY}`,
      },
      cache: "force-cache",
    });

    if (!response.ok) {
      const errorText = await response.text();

      const httpError: FetchError = {
        message: `API 오류 (HTTP ${response.status}): ${errorText.substring(
          0,
          100
        )}`,
        status: response.status,
      };

      return { data: [], error: httpError };
    }

    const data = await response.json();

    return { data: data || [], error: null };
  } catch (error) {
    console.error("데이터 가져오기 중 오류 발생:", error);

    const fetchError: FetchError = {
      message:
        error instanceof Error
          ? `데이터 fetch 오류: ${error.message}`
          : "알 수 없는 오류",
      status: undefined,
    };

    return { data: [], error: fetchError };
  }
};
