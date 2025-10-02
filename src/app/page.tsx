import { ItemListWidget } from "./widgets/item-list/ui/ItemListWidget";
import { fetchInitialItems } from "./entities/item/model/server-fetch";
import ClientMoreItems from "./widgets/item-list/ui/ClientMoreItems";

export default async function Home() {
  const initialItems = await fetchInitialItems(10, 0);

  return (
    <main className="flex min-h-screen">
      <section className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-6">상품 시세 대시보드</h1>

        <div className="max-w-3xl mx-auto">
          {/* 1. 서버 초기 데이터 표시 */}
          <ItemListWidget items={initialItems} isLoading={false} />

          {/* 2. 무한 스크롤 추가 데이터 표시 */}
          <ClientMoreItems initialItems={initialItems} />
        </div>
      </section>
    </main>
  );
}
