"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import ButtonToMain from "@/shared/ui/LinkButton/ButtonToMain";

export default function SignInErrorBox({
  errorMessage,
}: {
  errorMessage: string | string[];
}) {
  console.log(errorMessage);

  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", pathname);
    }
  }, [pathname]);

  return (
    <div className="min-h-screen flex flex-col gap-4 items-center justify-center px-6 text-center">
      <h2 className="text-xl font-semibold">로그인 중 문제가 발생했어요!</h2>

      <p className="text-sm text-gray-600">
        브라우저 보안 설정으로 인해 로그인에 실패했을 수 있습니다. <br /> 이는
        디스코드 공식 연동 설정과 브라우저 설정이 부딪히는 경우이므로,
        <br /> 아래 항목을 확인한 후 다시 시도해주세요.
      </p>

      <div className="mt-4 w-full max-w-md rounded-xl border border-gray-200 bg-gray-50 p-4 text-left">
        <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
          <li>
            <strong>시크릿(Incognito) 모드</strong>를 사용중일 경우, 인증 정보가
            저장되지 않아 로그인에 실패할 수 있습니다.
          </li>
          <li>
            <strong>서드파티 쿠키 차단</strong>이 설정되어 있다면 마찬가지로
            인증 정보가 저장되지 않으므로 <strong>허용</strong>으로
            변경해주세요.
          </li>
          <li>
            브라우저의 <strong>광고 차단 기능 또는 관련 확장 프로그램</strong>{" "}
            기능을 잠시 <strong>해제</strong>해주세요. 디스코드 인증이 외부 광고
            유입으로 인식되어 로그인에 실패할 수 있습니다.
          </li>
          <li>
            문제가 계속 발생한다면 현재 이용중인 브라우저 외에{" "}
            <strong>다른 브라우저</strong>에서 시도해주세요.
          </li>
        </ul>
      </div>

      <p className="mt-2 text-xs text-gray-500">
        위 설정은 로그인 과정에서 필요한 인증 정보를 정상적으로 전달하기 위해
        필요합니다.
      </p>

      <div className="mt-4">
        <ButtonToMain />
      </div>
    </div>
  );
}
