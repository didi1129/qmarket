import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  checkDiscordMember,
  logout,
} from "@/features/sign-in-form/model/actions";

export default function AuthCallbackPage() {
  const router = useRouter();
  const [status, setStatus] = useState("Discord 멤버십 확인 중...");

  useEffect(() => {
    const verifyMembership = async () => {
      const result = await checkDiscordMember();

      if (result.isMember) {
        setStatus("✅ 디스코드 인증 완료");
        router.push("/");
      } else {
        setStatus("❌ 디스코드 서버 미가입, 로그인 취소 중...");
        console.log(result.error);

        // ❌ 미가입 유저 강제 로그아웃
        await logout();

        setTimeout(() => {
          router.push("/discord-join");
        }, 1500);
      }
    };

    verifyMembership();
  }, [router]);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">디스코드 로그인 확인</h1>
      <p className="mt-4">{status}</p>
    </div>
  );
}
