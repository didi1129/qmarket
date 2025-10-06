import { Suspense } from "react";
import AuthEmailContent from "./AuthEmailContent";

export default function AuthEmailPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center">로딩 중...</div>}>
      <AuthEmailContent />
    </Suspense>
  );
}
