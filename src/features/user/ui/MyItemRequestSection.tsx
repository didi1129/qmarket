import SectionTitle from "@/shared/ui/SectionTitle";
import { Info } from "lucide-react";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/shared/ui/tooltip";

interface ItemRequest {
  id: number;
  item_name: string;
  item_gender: string;
  isRegistered: boolean;
}

const getItemRequests = async (userId: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/item-requests?userId=${userId}`,
    {
      next: {
        revalidate: 86400, // 24시간 재검증
        tags: [`item-reg-requests-${userId}`],
      },
    }
  );

  if (!response.ok) {
    console.error(`API 호출 실패: ${response.status} ${response.statusText}`);
    return [];
  }

  return response.json();
};

export default async function MyItemRequestSection({
  userId,
}: {
  userId: string;
}) {
  const data = await getItemRequests(userId);

  return (
    <section className="md:pl-8">
      <SectionTitle className="flex items-center gap-2">
        🔔 아이템 등록 요청 목록{" "}
        <Tooltip>
          <TooltipTrigger>
            <Info className="size-4 text-foreground/50" />
          </TooltipTrigger>
          <TooltipContent className="text-sm">
            검색되지 않는 아이템을 등록 요청하신 내역입니다. 등록 완료 시
            목록에서 사라집니다.
          </TooltipContent>
        </Tooltip>
      </SectionTitle>

      {data.length === 0 ? (
        <p className="text-foreground/50 text-sm">
          등록 요청하신 아이템이 없습니다.
        </p>
      ) : (
        <ul className="flex gap-2 flex-wrap">
          {data.map((d: ItemRequest) => (
            <li
              key={d.id}
              className={`p-3 mb-2 border border-gray-300 rounded-lg w-auto ${
                d.isRegistered ? "bg-blue-50" : "bg-background"
              }`}
            >
              <strong>{d.item_name}</strong>
              <span className="text-foreground/60">({d.item_gender})</span>
              <span
                className={`ml-2 px-2 py-0.5 rounded text-xs text-white ${
                  d.isRegistered ? "bg-green-500" : "bg-amber-500"
                }`}
              >
                {d.isRegistered ? "등록완료" : "대기중"}
              </span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
