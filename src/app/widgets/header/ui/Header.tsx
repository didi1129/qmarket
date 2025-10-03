"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/shared/api/supabase-client";
import { Button } from "@/shared/ui/button";
import { useRouter } from "next/navigation";

interface UserProfile {
  email: string;
  nickname?: string;
}

export default function Header() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      // 1️⃣ 현재 로그인된 유저 가져오기
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        console.error("로그인 유저 가져오기 실패:", userError);
        setUser(null);
        return;
      }

      // 2️⃣ users 테이블에서 nickname 조회
      const { data: profile, error: profileError } = await supabase
        .from("users")
        .select("nickname")
        .eq("id", user.id)
        .maybeSingle();

      if (profileError) {
        console.error("닉네임 조회 실패:", profileError);
      }

      setUser({
        email: user.email!,
        nickname: profile?.nickname ?? undefined,
      });
    };

    fetchUser();
  }, []);

  return (
    <header className="py-8 max-w-4xl mx-auto flex items-center">
      <div className="ml-auto">
        {user ? (
          <span>{user.nickname ?? user.email}</span>
        ) : (
          <Button onClick={() => router.push("/signin")}>로그인</Button>
        )}
      </div>
    </header>
  );
}
