"use client";

import { useSearchParams } from "next/navigation";

export default function AuthEmailContent() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const emailDomain = email.split("@")[1];

  return (
    <section className="flex flex-col gap-1 min-h-screen items-center justify-center text-base">
      <h2 className="mb-4 text-3xl font-bold">Q-Market</h2>
      <p className="text-gray-800">이메일 인증 후 회원가입이 완료됩니다!</p>
      {email ? (
        <p className="text-gray-800">
          이메일 인증 바로가기:
          <a
            href={`https://${emailDomain}`}
            target="_blank"
            className="inline-block ml-1 underline underline-offset-4 text-blue-600"
          >
            {email}
          </a>
        </p>
      ) : (
        <p className="text-gray-500">잘못된 접근입니다.</p>
      )}
    </section>
  );
}
