import { Suspense } from "react";
import { getSupabaseServerCookie } from "@/shared/api/supabase-cookie";
import UserItemList from "@/features/items/ui/UserItemList";
import UserProfileCard from "./UserProfileCard";
import { UserDetail } from "../model/userTypes";
import UserItemListHeader from "@/features/items/ui/UserItemListHeader";
import SectionTitle from "@/shared/ui/SectionTitle";
import MyItemRequestSection from "./MyItemRequestSection";

interface UserDetailProps {
  user: UserDetail;
}

const LoadingFallback = <div>로드중...</div>;

export default async function UserDetailSection({ user }: UserDetailProps) {
  const supabase = await getSupabaseServerCookie();
  const {
    data: { user: authUser },
  } = await supabase.auth.getUser();

  const BuySellListSection = () => (
    <div className="pl-8">
      <SectionTitle>🛒 판매 / 구매 목록</SectionTitle>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {/* 팝니다 */}
        <div className="flex flex-col gap-2">
          <h3 className="font-semibold text-lg">팝니다</h3>
          <Suspense fallback={LoadingFallback}>
            <UserItemList userId={user.id} isForSale={true} isSold={false} />
          </Suspense>
        </div>

        {/* 삽니다 */}
        <div className="flex flex-col gap-2">
          <h3 className="font-semibold text-lg">삽니다</h3>
          <Suspense fallback={LoadingFallback}>
            <UserItemList userId={user.id} isForSale={false} isSold={false} />
          </Suspense>
        </div>

        {/* 판매 완료 */}
        <div className="flex flex-col gap-2">
          <h3 className="font-semibold text-lg">판매 완료</h3>
          <Suspense fallback={LoadingFallback}>
            <UserItemList userId={user.id} isForSale={true} isSold={true} />
          </Suspense>
        </div>

        {/* 구매 완료 */}
        <div className="flex flex-col gap-2">
          <h3 className="font-semibold text-lg">구매 완료</h3>
          <Suspense fallback={LoadingFallback}>
            <UserItemList userId={user.id} isForSale={false} isSold={true} />
          </Suspense>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex lg:max-w-6xl mx-auto">
      {/* 좌측 사이드바 (유저 정보) */}
      <aside className="w-64 shrink-0 pt-20">
        <UserProfileCard user={user} />
      </aside>

      {/* 우측 컨텐츠 (삽니다/팝니다 목록) */}
      <section className="grow">
        {/* 마이페이지 전용 */}
        {authUser?.id === user.id && <UserItemListHeader userId={user.id} />}

        {/* 전체 공개: 유저 팝니다/삽니다 목록 */}
        <BuySellListSection />

        {/* 마이페이지 전용 */}
        {authUser?.id === user.id && <MyItemRequestSection />}
      </section>
    </div>
  );
}
