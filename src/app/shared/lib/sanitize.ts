let DOMPurify: ReturnType<typeof import("dompurify")["default"]> | null = null;

async function getDOMPurify() {
  if (DOMPurify || typeof window === "undefined") return DOMPurify;

  const dompurifyModule = await import("dompurify");
  const createDOMPurify = dompurifyModule.default ?? dompurifyModule;
  DOMPurify = createDOMPurify(window); // 브라우저 환경에서만 생성
  return DOMPurify;
}

export async function sanitize(html: string): Promise<string> {
  const purifier = await getDOMPurify();
  if (!purifier) return html; // 서버에서는 그대로 반환
  return purifier.sanitize(html);
}
