import EntryUploadModal from "@/features/best-dresser/ui/EntryUploadModal";
import Footer from "@/shared/ui/Footer";
import { getUserServer } from "@/shared/api/get-supabase-user-server";
import EntryList from "@/features/best-dresser/ui/EntryList";

export default async function BestDresserPage() {
  const user = await getUserServer();

  return (
    <main>
      <div className="max-w-6xl mx-auto pt-20">
        <div className="text-center mb-12">
          <div className="inline-block mb-6 px-6 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full border border-purple-300/30">
            <span className="text-sm font-semibold text-purple-600">
              🎉 2025 연말 이벤트
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl break-keep font-black mb-6 leading-tight flex items-center justify-center gap-4">
            <span className="inline-block animate-bounce text-4xl md:text-5xl">
              👗
            </span>
            <div className="bg-gradient-to-r from-purple-600 via-pink-500 to-yellow-400 bg-clip-text text-transparent">
              2025 큐플레이
              <br />
              베스트 드레서
            </div>
            <span className="inline-block animate-bounce text-4xl md:text-5xl">
              🩳
            </span>
          </h1>

          <p className="text-xl md:text-2xl font-bold text-gray-700 mb-8 max-w-2xl mx-auto">
            올해 큐플레이를 빛내준
            <br className="md:hidden" /> 최고의 패셔니스타는 누구?
          </p>

          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 mb-6 max-w-xl mx-auto border border-purple-200/50 shadow-lg">
            <div className="space-y-3 text-left">
              <div className="flex items-center gap-3">
                <span className="text-2xl">📅</span>
                <div>
                  <p className="font-bold text-gray-800">참여 및 투표 기간</p>
                  <p className="text-purple-600 font-semibold">
                    2025.12.24 ~ 2025.12.30
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-2xl">🏆</span>
                <div>
                  <p className="font-bold text-gray-800">결과·당첨자 발표</p>
                  <p className="text-pink-600 font-semibold">2025.12.31</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-4 mb-6 max-w-md mx-auto border-2 border-yellow-300/50 shadow-md">
            <p className="text-lg font-bold text-orange-600 flex items-center justify-center gap-2">
              🎁 참여만 해도 기프티콘 팡팡!
            </p>
            <p className="text-sm text-gray-700 mt-1">
              추첨을 통해 <span className="font-bold text-orange-600">3명</span>
              에게 제공됩니다.
            </p>
          </div>

          <div className="space-y-2 text-sm text-gray-600 max-w-md mx-auto">
            <p className="flex items-center justify-center gap-2">
              <span className="text-blue-500">✓</span>
              계정당 3회까지 코디 등록이 가능합니다.
            </p>
            <p className="flex items-center justify-center gap-2">
              <span className="text-yellow-500">★</span>
              베스트 드레서 1, 2, 3등은 메인에 게재됩니다.
            </p>
          </div>
        </div>

        {/* 참여하기 */}
        <div className="flex justify-center mb-40">
          <EntryUploadModal />
        </div>

        {/* 컨테스트 참가자 목록 */}
        <EntryList user={user} />

        <div className="border rounded-xl border-border p-6 text-sm mt-40">
          <p className="text-sm text-foreground/60">
            * 중복 참가 이미지, 컨테스트와 관련 없는 이미지는 별도의 공지 없이
            삭제됩니다.
          </p>
        </div>
      </div>

      <Footer className="md:pt-12" />
    </main>
  );
}
