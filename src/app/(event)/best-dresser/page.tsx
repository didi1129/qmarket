import UploadModal from "@/features/best-dresser/ui/UploadModal";
import Footer from "@/shared/ui/Footer";
import { getUserServer } from "@/shared/api/get-supabase-user-server";
import EntryList from "@/features/best-dresser/ui/EntryList";

export default async function BestDresserPage() {
  const user = await getUserServer();

  return (
    <main className="md:mt-[-70px] md:pt-[200px] min-h-screen bg-gradient-to-br from-red-50 via-yellow-50 to-purple-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-16">
          <h1 className="text-5xl font-extrabold text-foreground mb-4 tracking-tight">
            👗{" "}
            <span className="bg-[linear-gradient(to_right,#ef4444,#eab308,#22c55e,#3b82f6,#a855f7)] bg-clip-text text-transparent">
              2025 큐플레이 베스트 드레서
            </span>
            🩳
          </h1>
          <p className="text-lg text-foreground mb-4">
            2025년 연말 결산! 올해 큐플레이를 빛내준 나만의 코디를 뽐내보세요!
          </p>
          <p className="text-sm text-foreground/60">
            * 계정당 3회까지 참여 가능합니다.
          </p>
          <p className="text-sm text-foreground/60">
            * 중복 참가 이미지, 아바타 코디와 관련 없는 이미지는 별도의 공지
            없이 삭제됩니다.
          </p>
        </header>

        {/* 참여하기 */}
        <div className="flex justify-center mb-24">
          <UploadModal />
        </div>

        {/* 컨테스트 참가자 목록 */}
        <EntryList user={user} />
      </div>

      <Footer className="mt-20" />
    </main>
  );
}
