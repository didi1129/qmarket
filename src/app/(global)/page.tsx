import ItemCategoryNav from "@/features/items/ui/ItemCategoryNav";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

export default async function Home() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;

  // 지난 달 계산 (연도 넘어가는 경우 포함)
  const lastMonthDate = new Date(now);
  lastMonthDate.setMonth(now.getMonth() - 1);
  const lastMonthYear = lastMonthDate.getFullYear();
  const lastMonth = lastMonthDate.getMonth() + 1;

  const formattedMonth = String(month).padStart(2, "0");
  const formattedLastMonth = String(lastMonth).padStart(2, "0");

  return (
    <main className="flex p-4 md:p-0">
      <section className="flex flex-col w-full gap-4 items-center">
        {/* 아이템 카테고리 메뉴 */}
        <div className="mt-20">
          <h3 className="font-bold text-xl text-center mb-4">
            아이템 카테고리별 검색
          </h3>
          <ItemCategoryNav />
        </div>

        {/* 이번 달 로테이션 아이템 */}
        <div className="mt-8">
          <h3 className="font-bold text-xl text-center mb-4">
            이번 달 로테이션 아이템
          </h3>
          <Link href="/rotation-items/new">
            <div className="p-6 rounded-2xl bg-card border hover:border-primary/50 transition-colors h-full">
              <h3 className="text-lg font-semibold mb-2 flex items-center gap-1">
                {year}년 {formattedMonth}월 로테이션{" "}
                <ExternalLink className="size-4" />
              </h3>
              <p className="text-muted-foreground break-keep">
                이번 달에 업데이트된 새로운 아이템들을 확인해보세요!
              </p>
            </div>
          </Link>
        </div>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl">
          <Link href="/rotation-items/last">
            <div className="p-6 rounded-2xl bg-card border hover:border-primary/50 transition-colors h-full">
              <h3 className="text-lg font-semibold mb-2 flex items-center gap-1">
                {lastMonthYear}년 {formattedLastMonth}월 로테이션{" "}
                <ExternalLink className="size-4" />
              </h3>
              <p className="text-muted-foreground break-keep">
                지난 달의 로테이션 아이템들을 확인해보세요.
              </p>
            </div>
          </Link>

          <Link href="/my-items">
            <div className="p-6 rounded-2xl bg-card border hover:border-primary/50 transition-colors">
              <h3 className="text-lg font-semibold mb-2 flex items-center gap-1">
                구매/판매 아이템 등록 <ExternalLink className="size-4" />
              </h3>
              <p className="text-muted-foreground break-keep">
                구매하거나 판매하고 싶은 아이템을 등록할 수 있습니다.
              </p>
            </div>
          </Link>

          <div className="p-6 rounded-2xl bg-card border hover:border-primary/50 transition-colors">
            <h3 className="text-lg font-semibold mb-2">아이템 정보 조회</h3>
            <p className="text-muted-foreground break-keep">
              아이템 판매/구매 현황, 출처, 시세 등 다양한 정보를 확인할 수
              있습니다.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
