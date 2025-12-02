import Image from "next/image";
import UserItemList from "@/features/items/ui/UserItemList";
import { Suspense } from "react";

interface UserDetail {
  id: string;
  username: string;
  bio?: string;
  discord_profile_image: string | null;
  created_at: string;
}

interface UserDetailProps {
  user: UserDetail;
}

export default function UserDetailSection({ user }: UserDetailProps) {
  const UserProfileCard = () => (
    <section className="p-8 max-w-sm text-center">
      <Image
        src={user.discord_profile_image ?? "images/empty.png"}
        alt={user.username}
        width={180}
        height={180}
        className="rounded-full border-4 border-blue-500 mb-5 mx-auto object-cover block"
      />

      <h4 className="text-3xl font-extrabold text-gray-800 mb-1">
        {user.username}
      </h4>

      <p className="text-base text-gray-600 mb-5 px-3 min-h-10">{user.bio}</p>

      <span className="block text-sm text-gray-400 pt-3 mt-4 border-t border-gray-200">
        가입일: {user.created_at.slice(0, 10)}
      </span>
    </section>
  );

  const LoadingFallback = <div>로드중...</div>;

  const BuySellListSection = () => (
    <div className="pl-8">
      <h2 className="text-2xl font-bold text-gray-700 mb-6 border-b pb-2">
        🛒 판매 / 구매 목록
      </h2>

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
      <aside className="w-80 shrink-0">
        <UserProfileCard />
      </aside>

      {/* 우측 컨텐츠 (삽니다/팝니다 목록) */}
      <section className="grow">
        <BuySellListSection />
      </section>
    </div>
  );
}
